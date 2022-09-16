const Big = require('big.js');
const _ = require('lodash');

/*
 * Tax configuration is stored in a list of objects which look like
 * - name         string
 * - taxType      sales|cannabis
 * - rate         float percentage
 * - potency      string
 * - potencyRate  float percentage
 * - medical      boolean
 * - recreational boolean
 * - applyTo: {
 * -  types: [Flower|Edibles|....]
 * -  hemp: boolean (currently not supported in admin/integrations)
 * - }
 * - stages [
 * -  {type: pos|menu|checkout, op: add/subtract/noop}
 * -  ...
 * - ]
 * - deliveryPolicy originBased|destinationBased (sales tax only)
 */

const operandMap = {
  lessThan: (a, b) => a < b,
  lessThanEqualTo: (a, b) => a <= b,
  equalTo: (a, b) => a === b,
  greaterThan: (a, b) => a > b,
  greaterThanEqualTo: (a, b) => a >= b,
  notApplicable: () => true,
};

const roundTo = (value, digits) => Math.round(value * 10 ** digits) / 10 ** digits;

// Takes rules which have sub-structure and flattes them out.
const flattenTaxes = (taxData) => {
  const rv = [];
  _.forEach(taxData.taxes, (tax) => {
    _.forEach(tax.stages, (stage) => {
      const f = { ...tax, taxType: tax.type, taxBasis: tax.taxBasis, stage };
      delete f.stages;
      rv.push(f);
    });
  });
  return rv;
};

// Filter for a set of taxes.
const relevantTaxRules = (category, hemp, type, taxRules, stage) => {
  return _.filter(taxRules, (rule) => {
    const catValue = hemp ? rule.hemp : !rule.applyTo || (rule.applyTo.types && rule.applyTo.types.includes(category));
    return (type === 'med' ? rule.medical : rule.recreational) && catValue && (!stage || rule.stage.type === stage);
  });
};

const sumTaxesAtLayer = (flattenedRules, item) => {
  return _.reduce(
    flattenedRules,
    (accum, rule) => {
      let value = rule.rate;

      if (rule.type === 'bottleDeposit') {
        value = item.product.bottleDepositTaxCents || 0;
      }

      switch (rule.stage?.op) {
        case 'add':
          accum = accum.plus(value);
          break;
        case 'subtract':
          accum = accum.minus(value);
          break;
        default:
          break;
      }
      return accum;
    },
    Big(0)
  );
};

const calcTaxesAtLayer = ({ category, hemp, type, taxRules, stage, thcContent, isDelivery, product }) => {
  const taxes = {
    sales: Big(0),
    cannabis: Big(0),
    bottleDeposit: Big(0),
  };

  const rules = relevantTaxRules(category, hemp, type, taxRules, stage);
  _.forEach(Object.keys(taxes), (taxType) => {
    let value = Big(0);
    _.forEach(
      _.filter(rules, (rule) => rule.taxType === taxType),
      (rule) => {
        const { potency, potencyRate, rate, destinationRate } = rule;

        // apply destination-based sales tax, if applicable
        let baseValue = isDelivery && _.isFinite(destinationRate) ? destinationRate : rate;

        if (taxType === 'bottleDeposit') {
          baseValue = Big(product.bottleDepositTaxCents || 0);
        }

        // if we have potency & thcContent, but the operand formed is false, do not include
        // that rule's rate in the total tax rate.
        const thcValueDoesntMatchRule = potency && thcContent && !operandMap[potency](thcContent, potencyRate * 100);
        // if we have potency but no thcContent, then exclude all but rules with 'greater', 'less', or 'notApplicable'
        const noThc = potency && !thcContent;
        const largestPotencyRule = _.includes(potency, 'greater');
        const lesserPotencyRule = _.includes(potency, 'less');
        const ignorePotency = _.includes(potency, 'notApplicable');

        switch (rule.stage.op) {
          case 'noop':
            break;
          case 'add': // even if the THC content is nothing we should still apply the tax if applicable
            if (thcValueDoesntMatchRule || (noThc && largestPotencyRule && !lesserPotencyRule && !ignorePotency)) {
              baseValue = Big(0);
            }
            // if we do not have potency or thcContent, or we do and the operand perfomed is true,
            // include that rule's rate in the total tax rate.
            value = value.plus(baseValue);
            break;
          case 'subtract':
            if (thcValueDoesntMatchRule || (noThc && largestPotencyRule && !lesserPotencyRule && !ignorePotency)) {
              baseValue = Big(0);
            }
            // if we do not have potency or thcContent, or we do and the operand perfomed is true,
            // subtract that rule's rate from the total tax rate.
            value = value.minus(baseValue);
            break;
          default:
            throw new Error(`improper tax configuration op ${rule.stage.op}`);
        }
      }
    );
    taxes[taxType] = taxes[taxType].add(value);
  });

  return taxes;
};

const layerOrder = ['base', 'pos', 'menu', 'checkout'];
/*
 * When calculating to layer we assume you start with the taxes at layer n - 1.
 *
 * We call the n-1 layer the Previous (pre) layer.
 * Nominally in order to do taxes at layer N we need to undo what was done at
 * the previous layer and redo them at this layer.  With a positive tax you undo
 * by dividing and do by multiplying.  Reverse that for a negative tax.
 *
 * initialStage lets you go back more then one stage.  If not null it defines the
 * stage to start at by name.
 *
 * We allow for taxes to be based off of a number that comes from the POS (that might include
 * taxes) or for cannabis taxes to be based off the wholesale price.  We wrap this logic and
 * configuration up in the closures we return to the caller.
 */
const calcTaxes = ({
  category,
  hemp,
  thcContent,
  type,
  taxRules,
  taxMethod,
  stage,
  initialStage = null,
  isDelivery = false,
  product = {},
}) => {
  if (stage === 'base') {
    throw new Error('stage should be pos or higher');
  }

  const returnZero = () => 0;
  if (stage === initialStage) {
    return {
      cannabisTax: returnZero,
      salesTax: returnZero,
      taxMult: 1.0,
    };
  }

  const retailTaxRules = _.filter(taxRules, (rule) => rule.taxBasis !== 'wholesale');
  const wholesaleTaxRules = _.filter(taxRules, (rule) => rule.taxBasis === 'wholesale');

  const stageIndex = _.findIndex(layerOrder, (s) => s === stage);
  let startStageIndex;
  if (!initialStage) {
    startStageIndex = stageIndex - 1;
  } else {
    startStageIndex = _.findIndex(layerOrder, (s) => s === initialStage);
  }

  const stageTaxes = [];
  _.forEach(layerOrder.slice(1, stageIndex + 1), (stageName) => {
    stageTaxes.push(
      calcTaxesAtLayer({
        category,
        hemp,
        type,
        taxRules: retailTaxRules,
        stage: stageName,
        thcContent,
        isDelivery,
        product,
      })
    );
  });
  const wholesaleStageTaxes = [];
  _.forEach(layerOrder.slice(1, stageIndex + 1), (stageName) => {
    wholesaleStageTaxes.push(
      calcTaxesAtLayer({
        category,
        hemp,
        type,
        taxRules: wholesaleTaxRules,
        stage: stageName,
        thcContent,
        isDelivery,
        product,
      })
    );
  });

  const upTo = stageTaxes.slice(0, startStageIndex);

  let salesPreRate = Big(0),
    cannabisPreRate = Big(0),
    bottleDepositPreSum = Big(0);

  cannabisPreRate = _.reduce(upTo, (accum, tax) => accum.add(tax.cannabis), cannabisPreRate);
  salesPreRate = _.reduce(upTo, (accum, tax) => accum.add(tax.sales), salesPreRate);
  bottleDepositPreSum = _.reduce(upTo, (accum, tax) => accum.add(tax.bottleDeposit), bottleDepositPreSum);
  const cannabisRate = _.reduce(stageTaxes, (accum, tax) => accum.add(tax.cannabis), Big(0));
  const salesRate = _.reduce(stageTaxes, (accum, tax) => accum.add(tax.sales), Big(0));
  const bottleDepositRate = _.reduce(stageTaxes, (accum, tax) => accum.add(tax.bottleDeposit), Big(0));
  const wholesaleCannabisTaxRate = _.reduce(wholesaleStageTaxes, (accum, tax) => accum.add(tax.cannabis), Big(0));

  let undo, apply;
  if (taxMethod === 'compound') {
    undo = Big(1);
    if (salesPreRate.lt(0)) {
      undo = undo.div(salesPreRate.times(-1).plus(1));
    } else if (salesPreRate.gt(0)) {
      undo = undo.times(salesPreRate.plus(1));
    }
    if (cannabisPreRate.lt(0)) {
      undo = undo.div(cannabisPreRate.times(-1).plus(1));
    } else if (cannabisPreRate.gt(0)) {
      undo = undo.times(cannabisPreRate.plus(1));
    }

    apply = Big(1);
    if (salesRate.lt(0)) {
      apply = apply.div(salesRate.times(-1).plus(1));
    } else if (salesRate.gt(0)) {
      apply = apply.times(salesRate.plus(1));
    }
    if (cannabisRate.lt(0)) {
      apply = apply.div(cannabisRate.times(-1).plus(1));
    } else if (cannabisRate.gt(0)) {
      apply = apply.times(cannabisRate.plus(1));
    }
  } else {
    undo = Big(1);
    undo = undo.plus(salesPreRate);
    undo = undo.plus(cannabisPreRate);

    apply = Big(1);
    apply = apply.plus(salesRate);
    apply = apply.plus(cannabisRate);
  }

  // bottle deposit tax is non-componding, therefore tax method is irrelevant
  const bottleDepositTaxCents = bottleDepositRate.minus(bottleDepositPreSum);

  let taxMult = apply.div(undo);
  const isOrdered =
    taxMethod !== 'cumulative' &&
    retailTaxRules.filter((rule) => rule.stage.op !== 'noop' && !_.isNil(rule.order)).length > 0;
  let orderedRules;
  if (isOrdered) {
    orderedRules = relevantTaxRules(category, hemp, type, retailTaxRules, null)
      .filter((rule) => rule.stage.op !== 'noop')
      .sort((ruleA, ruleB) => ruleA.order - ruleB.order);
  }

  const orderedTaxesMult = (rules, taxType, lastTotalInit) => {
    let taxValue = Big(lastTotalInit || 1);
    const layers = layerOrder.slice(startStageIndex + 1, stageIndex + 1);
    _.forEach(rules, (rule) => {
      if ((!taxType || rule.type === taxType) && layers.includes(rule.stage.type)) {
        taxValue =
          rule.stage.op === 'add' ? taxValue.times(Big(1).plus(rule.rate)) : taxValue.div(Big(1).plus(rule.rate));
      }
    });
    return taxValue;
  };

  const makeTaxOp = (taxMeth) => (taxMeth === 'compound' ? (a, b) => (1 + a) * (1 + b) : (a, b) => 1 + a + b);
  const taxOp = makeTaxOp(taxMethod);
  const basePriceCalc = (salesPreRate, cannabisPreRate, bottleDepositPreSum) => (price) =>
    (price - bottleDepositPreSum / 100) / taxOp(Number(salesPreRate), Number(cannabisPreRate));
  const makeCalcTax = (otherTax, tax, taxType) => (price, wPrice, nonArmsLength) => {
    const base = price / taxOp(Number(salesPreRate), Number(cannabisPreRate));
    wPrice = _.isNil(wPrice) ? Big(0) : Big(wPrice);
    if (taxMethod === 'cumulative') {
      if (!isOrdered) {
        if (taxType === 'cannabis') {
          return tax.times(base).add(wPrice.times(wholesaleCannabisTaxRate));
        }
        // eslint-disable-line
        return base * taxOp(Number(otherTax), Number(tax)) - base * (1 + Number(otherTax));
      }
    } else {
      let currentTaxBasis = Big(base);
      const totalTax = {
        sales: Big(0),
        cannabis: Big(0),
        bottleDeposit: Big(0),
      };

      let filteredRules = relevantTaxRules(category, hemp, type, taxRules, null);
      filteredRules = _.filter(filteredRules, (rule) => rule.stage.op !== 'noop');
      const groupedRules = _.groupBy(filteredRules, 'id');
      const filteredGroupedRules = _.reduce(
        groupedRules,
        (accum, value, key) => {
          const minuses = _.filter(value, (val) => val.stage.op === 'subtract').length;
          if (minuses !== 0) {
            const adds = _.filter(value, (val) => val.stage.op === 'add').length;
            // We can fix up this situation.  It there are more subtacts we're bailing.
            if (adds > minuses) {
              value = _.filter(value, (val) => val.stage.op !== 'subtract');
              value = value.slice(0, adds - minuses);
            }
          }
          accum[key] = value;
          return accum;
        },
        {}
      );
      const flattenedRules = _.flatMap(_.values(filteredGroupedRules), (val) => val);

      // If there isn't an order enforce one where the cannabis taxes are before the sales taxes.
      // This should be a fairly uncommon configuration these days.
      const orderedTaxRules = _.map(flattenedRules, (rule) => ({
        ...rule,
        order: rule.order || (rule.taxType === 'cannabis' ? 0 : 1),
      }));

      const maxOrder = _.maxBy(orderedTaxRules, 'order')?.order || 0;

      for (let order = 0; order <= maxOrder; order++) {
        const rules = _.filter(orderedTaxRules, (rule) => rule.order === order && rule.stage.op === 'add');
        let orderTax = Big(0);
        // eslint-disable-next-line no-restricted-syntax
        for (const rule of rules) {
          let thisTax;
          if (rule.taxBasis === 'wholesale') {
            if (!nonArmsLength && wPrice !== undefined) {
              thisTax = wPrice.times(rule.rate);
            } else {
              thisTax = currentTaxBasis.times(rule.rate);
            }
          } else {
            /* eslint-disable */
            const { potency, potencyRate, destinationRate } = rule;
            let effectiveRate = isDelivery && _.isFinite(destinationRate) ? destinationRate : rule.rate;

            // if we have potency & thcContent, but the operand formed is false, do not include
            // that rule's rate in the total tax rate.
            const thcValueDoesntMatchRule =
              potency && thcContent && !operandMap[potency](thcContent, potencyRate * 100);
            // if we have potency but no thcContent, then exclude all but rules with 'greater'
            const noThc = potency && !thcContent;
            const largestPotencyRule = _.includes(potency, 'greater');
            if (thcValueDoesntMatchRule || (noThc && !largestPotencyRule)) {
              effectiveRate = Big(0);
            }

            thisTax = currentTaxBasis.times(effectiveRate);
          }

          orderTax = orderTax.plus(thisTax);
          totalTax[rule.taxType] = totalTax[rule.taxType].plus(thisTax);
        }
        currentTaxBasis = currentTaxBasis.plus(orderTax);
      }

      /* eslint-enable */
      return totalTax[taxType];
    }
  };

  const isCannabisTax = cannabisRate.gt(cannabisPreRate) || wholesaleCannabisTaxRate.gt(0);
  const isSalesTax = salesRate.gt(salesPreRate);

  if (isOrdered) {
    taxMult = orderedTaxesMult(orderedRules);
  }

  return {
    bottleDepositTaxCents,
    cannabisTax: isCannabisTax ? makeCalcTax(salesRate, cannabisRate, 'cannabis') : returnZero,
    salesTax: isSalesTax ? makeCalcTax(cannabisRate, salesRate, 'sales') : returnZero,
    basePrice: basePriceCalc(salesPreRate, cannabisPreRate, bottleDepositPreSum),
    taxMult,
  };
};

/*
 * This returns true if the dispensary has discounts before taxes but any tax
 * data in their data by the menu.
 */
const oddDiscountTreatment = (dispensary) => {
  if (dispensary.taxConfig.discountTaxOrder !== 'discountsFirst' && dispensary.taxConfig.discountTaxOrder !== 'both') {
    return false;
  }
  const rules = flattenTaxes(dispensary.taxConfig).filter(
    (rule) => rule.stage.type !== 'checkout' && rule.stage.op !== 'noop'
  );
  const numAdds = rules.filter((rule) => rule.stage.op === 'add').length;
  const numSubs = rules.filter((rule) => rule.stage.op === 'subtract').length;
  return numAdds - numSubs > 0;
};

const originBasedTaxStates = ['AZ', 'CA', 'IL', 'MS', 'MO', 'NM', 'OH', 'PA', 'TN', 'TX', 'UT', 'VA'];
const getDefaultSalesTaxDeliveryPolicy = (state) =>
  originBasedTaxStates.includes(state) ? 'originBased' : 'destinationBased';

export {
  calcTaxes,
  getDefaultSalesTaxDeliveryPolicy,
  flattenTaxes,
  layerOrder,
  oddDiscountTreatment,
  relevantTaxRules,
  roundTo,
  sumTaxesAtLayer,
};
