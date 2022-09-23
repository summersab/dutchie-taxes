import _ from 'lodash';
import Big from 'big.js';
import { calcTaxes, flattenTaxes, layerOrder, relevantTaxRules, sumTaxesAtLayer } from '../../shared/helpers/taxes.js';
import { getProductWeight, productSatisfiesSaleWeight, getSalesType } from '../../shared//helpers/products.js';

const findStageIndex = (stage) => _.findIndex(layerOrder, (s) => s === stage);

export function sumProductTaxes(detail, products, cannabisTaxTotal, salesTaxTotal) {
  const basePrice = detail.mixAndMatch?.adjustedBasePrice || detail.basePrice;
  const price = basePrice.times(detail.quantity);
  const qtyWholesalePrice = detail.wholesalePrice.times(detail.quantity);
  const whPrice = qtyWholesalePrice.round(2, 1);
  const cannabisTax = detail.cannabisTax(
    price,
    whPrice,
    products[`${detail.id}_${detail.option}`].product.nonArmsLength
  );
  const salesTax = detail.salesTax(price, whPrice, products[`${detail.id}_${detail.option}`].product.nonArmsLength);
  cannabisTaxTotal = cannabisTaxTotal.plus(cannabisTax);
  salesTaxTotal = salesTaxTotal.plus(salesTax);
  return { cannabisTaxTotal, salesTaxTotal };
}

export const gatherProductTaxes = (detailsSorted, products) => {
  // we need to gather the total taxes for the products so we can include that in the price that we amortize the
  // discount across in the applyTaxPreDiscount case
  let salesTaxTotal = Big(0);
  let cannabisTaxTotal = Big(0);
  _.forEach(detailsSorted, (productDetail) => {
    const productTaxes = sumProductTaxes(productDetail, products, cannabisTaxTotal, salesTaxTotal);
    cannabisTaxTotal = productTaxes.cannabisTaxTotal;
    salesTaxTotal = productTaxes.salesTaxTotal;
  });
  return cannabisTaxTotal.plus(salesTaxTotal);
};

export const taxes = (cart, dispensary, medicalOrder, isDelivery, toMenu = false) => {
  const taxData = _.get(dispensary, `taxConfig`, []);
  const taxRules = flattenTaxes(taxData);
  let appliedTaxRules;
  const details = [];
  const taxExistence = {
    med: { sales: {}, cannabis: {}, bottleDeposit: {} },
    rec: { sales: {}, cannabis: {}, bottleDeposit: {} },
  };

  let cannabisTax = Big(0),
    salesTax = Big(0),
    bottleDepositTaxCents = Big(0),
    subtotal = Big(0);

  _.forEach(cart, (item) => {
    const thcRange = _.get(item, 'product.THCContent.range', []);
    const thcContent = _.max(thcRange) || 0; // Default to 0 if range is empty
    const isVapeTaxed = dispensary.location?.state === 'SK' && item.product.vapeTaxApplicable;

    _.forEach(['med', 'rec'], (type) => {
      const rules = relevantTaxRules(item.product.type, false, type, taxRules);
      _.forEach(['sales', 'cannabis', 'bottleDeposit'], (taxType) => {
        const taxTypeRules = _.filter(rules, (r) => r.type === taxType);
        _.forEach(['pos', 'menu', 'checkout'], (stage) => {
          const stageIndex = findStageIndex(stage);
          const tax = sumTaxesAtLayer(
            _.filter(taxTypeRules, (r) => findStageIndex(r.stage?.type) <= stageIndex),
            item
          );
          if (taxTypeRules.length) {
            taxExistence[type][taxType][stage] = tax.gt(0);
          }
        });
      });
    });

    // In the Saskatchwan there are some products which are determined by the government
    // to have a different PST.  These are nominally specific vape products.  We setup the
    // those tax rules to be applied later.
    const vapeTaxRules = [...taxRules];
    _.forEach(vapeTaxRules, (rule, index) => {
      if (rule.name === 'PST') {
        vapeTaxRules[index] = {
          ...rule,
          name: 'Vape',
          rate: 0.2,
        };
      }
    });

    // In the Saskatchwan there are some products which are determined by the government
    // to have a different PST.  These are nominally specific vape products.  We determine
    // when this is true based on a an attribute on the product.  Someday we might be able
    // to do this by less invasive techniques but for now we're going to hard code this mess.
    appliedTaxRules = isVapeTaxed ? vapeTaxRules : taxRules;

    const menuTaxValues = calcTaxes({
      category: item.product.type,
      hemp: item.product.hemp,
      thcContent,
      type: medicalOrder ? `med` : `rec`,
      taxRules: appliedTaxRules,
      taxMethod: taxData.calculationMethod,
      stage: toMenu ? `menu` : `checkout`,
      isDelivery,
      product: item.product,
    });

    // Given a raw value how do we get to checkout.
    const checkoutTaxValues = calcTaxes({
      category: item.product.type,
      hemp: item.product.hemp,
      thcContent,
      type: medicalOrder ? `med` : `rec`,
      taxRules: appliedTaxRules,
      taxMethod: taxData.calculationMethod,
      stage: toMenu ? `menu` : `checkout`,
      initialStage: `base`,
      isDelivery,
      product: item.product,
    });

    // Given a menu value how do we get back to base.
    const posTaxValues = calcTaxes({
      category: item.product.type,
      hemp: item.product.hemp,
      thcContent,
      type: medicalOrder ? `med` : `rec`,
      taxRules: appliedTaxRules,
      taxMethod: taxData.calculationMethod,
      stage: toMenu ? `pos` : `menu`,
      initialStage: `base`,
      isDelivery,
      product: item.product,
    });

    const index = _.findIndex(item.product.Options, (option) => option === item.option);

    const price = Big(item.price, `Item Price ${item?.product?._id}`);
    const wholesalePrice = Big(item.product?.wholesalePrices?.[index] || 0);
    bottleDepositTaxCents = bottleDepositTaxCents.add(menuTaxValues.bottleDepositTaxCents);
    cannabisTax = cannabisTax.add(menuTaxValues.cannabisTax(item.price, wholesalePrice, item.product.nonArmsLength));
    salesTax = salesTax.add(menuTaxValues.salesTax(item.price, wholesalePrice, item.product.nonArmsLength));
    subtotal = subtotal.add(price);

    let basePrice;
    if (item.product.id === `Adhoc`) {
      basePrice = Big(item.product.Prices[index], `Adhoc Base Price`);
    } else {
      basePrice = Big(
        // TODO WEHRMAN COME BACK TO THIS something is borking our index...
        medicalOrder
          ? item.product.medicalPrices[index < 0 ? 0 : index]
          : item.product.recPrices[index < 0 ? 0 : index],
        `Base Price`
      )
        .minus(posTaxValues.bottleDepositTaxCents.div(100))
        .div(posTaxValues.taxMult);
    }

    const weightInGrams = getProductWeight(item.option);

    const salesType = getSalesType(item.product);

    const isOnSale = productSatisfiesSaleWeight(
      salesType,
      item.product?.specialData?.saleSpecials || [],
      item.option,
      false
    );

    details.push({
      type: `product`,
      id: item.product._id,
      posId: (_.find(_.get(item, `product.POSMetaData.children`, []), [`option`, item.option]) || {}).canonicalID,
      option: item.option,
      quantity: Number(item.quantity),
      basePrice,
      isOnSale,
      key: `${item.product._id}_${item.option || 'N/A'}`,
      weightInGrams,
      weightInMg: Number(weightInGrams * 1000),
      wholesalePrice,
      pricingTierData: item.product?.pricingTierData,
      productBrandId: item.product?.brandId ?? item?.product?.brand?.id,
      productBrand: item.product?.brand?.name || item.product?.brandName,
      productCategory: item.product.type,
      productSubcategory: item.product.subcategory,
      basePriceMult: posTaxValues.taxMult,
      cannabisTax: checkoutTaxValues.cannabisTax,
      salesTax: checkoutTaxValues.salesTax,
      bottleDepositTaxCents: checkoutTaxValues.bottleDepositTaxCents,
      specialData: item.product.specialData,
      menuBasePrice: item.basePrice || 0,
      menuIndividualPrice: !_.isNil(item.discountedBasePrice) ? item.discountedBasePrice : item.basePrice || 0,
      menuPrice: item.price,
      menuCannabisTax: posTaxValues.cannabisTax(item.price, wholesalePrice),
      menuSalesTax: posTaxValues.salesTax(item.price, wholesalePrice),
      isVapeTaxed,
    });
  });

  const salesTaxExistence = {
    med: taxExistence?.med?.sales,
    rec: taxExistence?.rec?.sales,
  };
  const cannabisTaxExistence = {
    med: taxExistence?.med?.cannabis,
    rec: taxExistence?.rec?.cannabis,
  };
  const bottleDepositTaxExistence = {
    med: taxExistence?.med?.bottleDeposit,
    rec: taxExistence?.rec?.bottleDeposit,
  };
  bottleDepositTaxCents = Big(bottleDepositTaxCents, 'Bottle Deposit Tax');
  cannabisTax = Big(cannabisTax.toFixed(2), 'Cannabis Tax');
  salesTax = Big(salesTax.toFixed(2), 'Sales Tax');
  subtotal = Big(subtotal.toFixed(2), 'Subtotal');
  return {
    bottleDepositTaxCents,
    cannabisTax,
    salesTax,
    subtotal,
    details,
    salesTaxExistence,
    cannabisTaxExistence,
    bottleDepositTaxExistence,
  };
};
