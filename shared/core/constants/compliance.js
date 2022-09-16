export const canadaDefaults = {
  medMinAge: 18,
  recMinAge: 19,
  limits: {
    Flower: { medical: Infinity, rec: 30.0 },
    Concentrate: { medical: Infinity, rec: 7.5 },
    TinctureTHC: { medical: Infinity, rec: 7.5 },
    SolidEdibleNetWeight: { medical: Infinity, rec: 450 },
    LiquidEdibleVolumeInOunces: { medical: Infinity, rec: 74 },
    solidNetWeightMultiplier: 30 / 450,
    liquidNetWeightMultiplier: 30 / 2100, // Although liquid limits are in ounces this is set in terms of grams
    concentrateMultiplier: 4,
    tinctureMultiplier: 4,
    usesEquivalencyCalculator: true,
    usesLiquidTypes: true,
    usesSolidEdibleTypes: true,
    typeMap: {
      Concentrate: {
        categories: ['Concentrate', 'Vaporizers'],
      },
    },
    ignoreTypeMap: {
      Concentrate: {
        subcategories: ['concentrates-oil'],
      },
    },
    liquidEdibleTypes: {
      categories: ['Topicals'],
      subcategories: ['drinks', 'concentrates-oil'],
    },
  },
  defaults: {
    Flower: 0,
    Edible: 0,
    Concentrate: 0,
    Vaporizers: 0,
    'Pre-Rolls': 0,
    Tincture: 0,
    Topicals: 0,
    Seeds: 0,
    CBD: 0,
  },
  restrictions: {
    effects: ['Pain-Relief'],
  },
};

export const jamaicanDefaults = {
  medMinAge: 18,
  recMinAge: 18,
  medSubjectToExciseTax: false,
  deliveryAvailable: false,
  oneDeliveryPerDispoPerDay: false,
  residentialDeliveryOnly: false,
  isolatedMenus: false,
  medCardReciprocity: true,
  limits: {
    Flower: { medical: 56, rec: 56 },
    message: "Sorry! You've reached the 2oz purchase limit for cannabis due to regulations.",
  },
  defaults: {
    Flower: 0,
    Edible: 0,
    Concentrate: 0,
    Vaporizers: 0,
    'Pre-Rolls': 0,
    Tincture: 0,
    Topicals: 0,
    Seeds: 0,
    CBD: 0,
  },
  restrictions: {
    effects: [],
  },
};

export const saintVincentAndTheGrenadinesDefaults = {
  medMinAge: 18,
  recMinAge: 18,
  medSubjectToExciseTax: false,
  deliveryAvailable: false,
  oneDeliveryPerDispoPerDay: false,
  residentialDeliveryOnly: false,
  isolatedMenus: false,
  medCardReciprocity: true,
  limits: {
    Flower: { medical: 56, rec: 56 },
    message: "Sorry! You've reached the 2oz purchase limit for cannabis due to regulations.",
  },
  defaults: {
    Flower: 0,
    Edible: 0,
    Concentrate: 0,
    Vaporizers: 0,
    'Pre-Rolls': 0,
    Tincture: 0,
    Topicals: 0,
    Seeds: 0,
    CBD: 0,
  },
  restrictions: {
    effects: [],
  },
};

// All limits are in grams.
// This should NEVER be accessed directly.
// Use: getComplianceConfig insetad.
export const stateComplianceRules = {
  DEFAULT: {
    medMinAge: 18,
    recMinAge: 21,
    medSubjectToExciseTax: false,
    deliveryAvailable: false,
    oneDeliveryPerDispoPerDay: false,
    residentialDeliveryOnly: false,
    isolatedMenus: false, // Enforce that a cart only has medical or rec items.
    medCardReciprocity: false,
    limits: {
      usesEquivalencyCalculator: false,
      Flower: { medical: Infinity, rec: Infinity },
      Concentrate: { medical: Infinity, rec: Infinity },
    },
    // these defaults are manually applied to all the other states by the validating code
    defaults: {
      Concentrate: 0,
      Flower: 0,
      Vaporizers: 0,
      Edible: 100,
      'Pre-Rolls': 1,
      Tincture: 25,
      Topicals: 0,
      Seeds: 0,
      CBD: 0,
    },
    restrictions: {
      effects: [],
    },
  },
  AK: {
    medMinAge: 18,
    recMinAge: 21,
    limits: {
      usesEquivalencyCalculator: true,
      Flower: { medical: 28.35, rec: 28.35 },
      Concentrate: { medical: 7, rec: 7 },
      EdibleTHC: { medical: 5.6, rec: 5.6 },
      TopicalTHC: { medical: 5.6, rec: 5.6 },
      TinctureTHC: { medical: 5.6, rec: 5.6 },
      concentrateMultiplier: 4.05,
      typeMap: {
        Concentrate: {
          categories: ['Concentrate', 'Vaporizers'],
        },
      },
    },
  },
  AZ: {
    medMinAge: 18,
    recMinAge: 21,
    medSubjectToExciseTax: false,
    limits: {
      usesEquivalencyCalculator: true,
      medUsesEquivalencyCalculator: true,
      concentrateMultiplier: 1,
      Flower: { medical: 70.0, rec: 28.0 },
      Concentrate: { medical: 70.0, rec: 5.0 },
    },
  },
  CA: {
    medMinAge: 18,
    recMinAge: 21,
    medSubjectToExciseTax: true,
    deliveryAvailable: true,
    limits: {
      Flower: { medical: 224.0, rec: 28.5 },
      Concentrate: { medical: 224.0, rec: 8.0 },
      typeMap: {
        Concentrate: {
          categories: ['Edible', 'Concentrate', 'Vaporizers', 'Tincture'],
          subcategories: ['infused'],
        },
      },
    },
  },
  CO: {
    medMinAge: 18,
    recMinAge: 21,
    medSubjectToExciseTax: false,
    isolatedMenus: true,
    limits: {
      Flower: { medical: 56.7, rec: 28.35 },
      Concentrate: { medical: 8, rec: 8 },
      EdibleTHC: { medical: 20, rec: 0.8 },
      TinctureTHC: { medical: 20, rec: 0.8 },
      usesEquivalencyCalculator: true,
      medUsesEquivalencyCalculator: true,
      edibleMultiplier: {
        med: 56.7 / 20,
        rec: 28.35 / 0.8,
      },
      tinctureMultiplier: {
        med: 56.7 / 20,
        rec: 3.54,
      },
      concentrateMultiplier: {
        med: 56.7 / 8,
        rec: 3.54,
      },
      typeMap: {
        Concentrate: {
          categories: ['Concentrate'],
          subcategories: ['infused'],
        },
      },
      message: 'Sorry! You have reached the cannabis purchasing limit due to state regulations.',
    },
  },
  DC: {
    limits: {
      Flower: { medical: 224, rec: 112 },
    },
  },
  DE: {
    medMinAge: 18,
    recMinAge: 21,
    medSubjectToExciseTax: false,
    deliveryAvailable: true,
    limits: {
      Flower: { medical: 168.0, rec: Infinity },
      Concentrate: { medical: 168.0, rec: Infinity },
      EdibleTHC: { medical: 168.0, rec: Infinity },
      medUsesEquivalencyCalculator: true,
      edibleMultiplier: 1,
      concentrateMultiplier: 1,
      message: "Sorry! You've reached the 6oz purchase limit for cannabis due to state regulations.",
    },
  },
  HI: {
    limits: {
      Flower: { medical: 113, rec: Infinity },
      concentrateMultiplier: 1,
      edibleMultiplier: 1,
      topicalMultiplier: 1,
      tinctureMultiplier: 1,
      medUsesEquivalencyCalculator: true,
      message: "Sorry! You've reached the 4oz purchase limit for cannabis due to state regulations.",
    },
  },
  IL: {
    medMinAge: 18,
    recMinAge: 21,
    limits: {
      Flower: { medical: 70, rec: 30 },
      Concentrate: { medical: 70, rec: 5 },
      EdibleTHC: { medical: Infinity, rec: 0.5 },
      usesEquivalencyCalculator: false,
      medUsesEquivalencyCalculator: true,
      concentrateMultiplier: 1,
      edibleMultiplier: 1,
      ignoreStandardEquivalentField: true,
    },
    outOfStateLimits: {
      Flower: { medical: 70, rec: 15 },
      Concentrate: { medical: 70, rec: 2.5 },
      EdibleTHC: { medical: Infinity, rec: 0.25 },
      usesEquivalencyCalculator: false,
      medUsesEquivalencyCalculator: true,
      concentrateMultiplier: 1,
      edibleMultiplier: 1,
      ignoreStandardEquivalentField: true,
    },
  },
  MA: {
    medMinAge: 18,
    recMinAge: 21,
    medSubjectToExciseTax: false,
    limits: {
      Flower: { medical: Infinity, rec: 28.35 },
      Concentrate: { medical: Infinity, rec: 5.0 },
      EdibleTHC: { medical: Infinity, rec: 0.5 },
      TinctureTHC: { medical: Infinity, rec: 5.0 },
      usesEquivalencyCalculator: true,
      edibleMultiplier: 56.7,
      tinctureMultiplier: 5.67,
      concentrateMultiplier: 5.67,
    },
    defaults: {
      Flower: 0,
      'Pre-Rolls': 1.0,
      Edible: 100,
      Concentrate: 1,
      Tincture: 100,
      Topicals: 0,
      Vaporizers: 0,
      Seeds: 0,
      CBD: 0,
    },
  },
  ME: {
    medMinAge: 18,
    recMinAge: 21,
    medCardReciprocity: true,
    limitedStateReciprocity: true,
    medCardLimitedReciprocity: [
      'AK',
      'AZ',
      'AR',
      'CA',
      'CT',
      'FL',
      'HI',
      'IA',
      'IL',
      'MA',
      'MD',
      'ME',
      'MI',
      'MN',
      'MT',
      'NV',
      'NH',
      'NJ',
      'NM',
      'NY',
      'ND',
      'OK',
      'OR',
      'RI',
      'VT',
      'WA',
      'DC',
    ],
    limits: {
      usesEquivalencyCalculator: true,
      medUsesEquivalencyCalculator: true,
      concentrateMultiplier: 1,
      Flower: { medical: 70, rec: 70 },
      Concentrate: { medical: 70, rec: 5 },
    },
  },
  MI: {
    medMinAge: 18,
    recMinAge: 21,
    medSubjectToExciseTax: false,
    deliveryAvailable: true,
    residentialDeliveryOnly: true,
    medCardReciprocity: true,
    limits: {
      Flower: { medical: 70.0, rec: 70.0 },
      Concentrate: { medical: 70.0, rec: 15.0 },
      SolidEdibleNetWeight: { medical: 1133.98, rec: 1133.98 },
      LiquidEdibleVolumeInOunces: { medical: 90, rec: 90 },
      concentrateMultiplier: { med: 1, rec: 70.0 / 15.0 },
      usesEquivalencyCalculator: true,
      medUsesEquivalencyCalculator: true,
      usesSolidEdibleTypes: true,
      usesLiquidTypes: true,
      solidNetWeightMultiplier: { med: 70.0 / 1133.98, rec: 70.0 / 1133.98 },
      liquidNetWeightMultiplier: { med: 70.0 / 2551.0, rec: 70.0 / 2551.0 },
      typeMap: {
        Concentrate: {
          categories: ['Concentrate', 'Vaporizers'],
        },
      },
      liquidEdibleTypes: {
        categories: ['Topicals', 'Tincture'],
        subcategories: ['drinks'],
      },
    },
  },
  MO: {
    // Note: Missouri is med ONLY and rec limits only exist as potential fall back
    limits: {
      Flower: { medical: 113, rec: 113 },
      Concentrate: { medical: 32, rec: 32 },
      EdibleTHC: { medical: 3.2, rec: 3.2 },
      TinctureTHC: { medical: 3.2, rec: 3.2 },
      TopicalTHC: { medical: 3.2, rec: 3.2 },
      concentrateMultiplier: 3.5,
      edibleMultiplier: 35,
      tinctureMultiplier: 35,
      topicalMultiplier: 35,
      medUsesEquivalencyCalculator: true,
    },
  },
  MT: {
    medMinAge: 18,
    recMinAge: 21,
    medSubjectToExciseTax: true,
    deliveryAvailable: true,
    limits: {
      Flower: { medical: 28, rec: 28 },
      Concentrate: { medical: 8, rec: 8 },
      EdibleTHC: { medical: 0.8, rec: 0.8 },
      TopicalTHC: { medical: 0.8, rec: 0.8 },
      TinctureTHC: { medical: 0.8, rec: 0.8 },
      medUsesEquivalencyCalculator: true,
      concentrateMultiplier: 3.5,
      tinctureMultiplier: 35,
      edibleMultiplier: 35,
      topicalMultiplier: 35,
      typeMap: {
        Edible: {
          categories: ['Edible', 'Topicals'],
        },
      },
    },
  },
  NJ: {
    medMinAge: 18,
    recMinAge: 21,
    medSubjectToExciseTax: false,
    limits: {
      Flower: { medical: 84.0, rec: 28.35 },
      Concentrate: { medical: 84.0, rec: 5.0 },
      EdibleTHC: { medical: Infinity, rec: 0.5 },
      TinctureTHC: { medical: Infinity, rec: 0.5 },
      concentrateMultiplier: 5.67,
      edibleMultiplier: 56.7,
      tinctureMultiplier: 56.7,
      usesEquivalencyCalculator: true,
      typeMap: {
        Concentrate: {
          categories: ['Concentrate', 'Vaporizers'],
        },
      },
      message: "Sorry! You've reached the 1oz purchase limit for cannabis due to state regulations.",
    },
  },
  NM: {
    limits: {
      Flower: { medical: Infinity, rec: 56.7 },
      Concentrate: { medical: Infinity, rec: 16 },
      EdibleTHC: { medical: Infinity, rec: 0.8 },
      ignoreStandardEquivalentField: true,
    },
  },
  NV: {
    medMinAge: 18,
    recMinAge: 21,
    medSubjectToExciseTax: false,
    deliveryAvailable: true,
    residentialDeliveryOnly: true,
    medCardReciprocity: true,
    limits: {
      Flower: { medical: 28.35, rec: 28.35 },
      Concentrate: { medical: 4, rec: 3.5 },
      TopicalTHC: { medical: 4, rec: 3.5 },
      EdibleTHC: { medical: 4, rec: 3.5 },
      typeMap: {
        Concentrate: {
          categories: ['Concentrate', 'Edible', 'Topicals', 'Tincture', 'Vaporizers'],
          subcategories: ['infused'],
        },
      },
      ignoreTypeMap: {
        Flower: {
          subcategories: ['infused'],
        },
      },
      concentrateMultiplier: { med: 7.087, rec: 8.1 },
      edibleMultiplier: { med: 7.087, rec: 8.1 },
      tinctureMultiplier: { med: 7.087, rec: 8.1 },
      topicalMultiplier: { med: 7.087, rec: 8.1 },
      usesEquivalencyCalculator: true,
      medUsesEquivalencyCalculator: true,
    },
  },
  OR: {
    medMinAge: 18,
    recMinAge: 21,
    medSubjectToExciseTax: false,
    deliveryAvailable: true,
    oneDeliveryPerDispoPerDay: true,
    residentialDeliveryOnly: true,
    limits: {
      SolidEdibleNetWeight: { medical: 448, rec: 448 },
      // Liquid volume limits are all defined in OUNCES
      LiquidEdibleVolumeInOunces: { medical: 72, rec: 72 },
      Flower: { medical: 224.0, rec: 56.0 },
      Concentrate: { medical: 5.0, rec: 5.0 },
      typeMap: {
        Concentrate: {
          subcategories: ['infused'],
        },
      },
      liquidEdibleTypes: {
        categories: ['Tincture', 'Topicals'],
        subcategories: ['drinks'],
      },
    },
  },
  WA: {
    medMinAge: 18,
    recMinAge: 21,
    medSubjectToExciseTax: true,
    limits: {
      SolidEdibleNetWeight: { medical: 1344, rec: 448 },
      // Liquid volume limits are all defined in OUNCES
      LiquidEdibleVolumeInOunces: { medical: 216, rec: 72 },
      Flower: { medical: 84.0, rec: 28.0 },
      Concentrate: { medical: 21.0, rec: 7.0 },
      typeMap: {
        Concentrate: {
          subcategories: ['infused'],
        },
      },
      ignoreTypeMap: {
        Flower: {
          subcategories: ['infused'],
        },
      },
      liquidEdibleTypes: {
        subcategories: ['drinks'],
      },
    },
  },
  AB: { ...canadaDefaults, recMinAge: 18 },
  BC: {
    ...canadaDefaults,
    limits: {
      ...canadaDefaults.limits,
      Concentrate: { medical: Infinity, rec: 30 },
      SolidEdibleNetWeight: { medical: Infinity, rec: 30 },
      LiquidEdibleVolumeInOunces: { medical: Infinity, rec: 30 },
      message: "Sorry! You've reached the 30g purchase limit for cannabis due to federal regulations.",
    },
  },
  ON: {
    // This config specific to Ontario may be redundant
    medMinAge: 18,
    recMinAge: 19,
    limits: {
      Flower: { medical: Infinity, rec: 30.0 },
      Concentrate: { medical: Infinity, rec: 7.5 },
      TinctureTHC: { medical: Infinity, rec: 7.5 },
      SolidEdibleNetWeight: { medical: Infinity, rec: 450 },
      LiquidEdibleVolumeInOunces: { medical: Infinity, rec: 74 },
      concentrateMultiplier: 4,
      tinctureMultiplier: 4,
      solidNetWeightMultiplier: 30 / 450,
      liquidNetWeightMultiplier: 30 / 2100, // Although liquid limits are in ounces this is set in terms of grams
      topicalMultiplier: 0.0143,
      usesEquivalencyCalculator: true,
      usesLiquidTypes: true,
      usesSolidEdibleTypes: true,
      typeMap: {
        Concentrate: {
          categories: ['Concentrate', 'Vaporizers'],
        },
      },
      ignoreTypeMap: {
        Concentrate: {
          subcategories: ['concentrates-oil'],
        },
      },
      liquidEdibleTypes: {
        categories: ['Topicals'],
        subcategories: ['drinks', 'concentrates-oil'],
      },
    },
  },
  Humacao: {
    medCardReciprocity: true,
    limitedStateReciprocity: true,
    medCardLimitedReciprocity: ['PR', 'Humacao'],
  },
  Naguabo: {
    medCardReciprocity: true,
    limitedStateReciprocity: true,
    medCardLimitedReciprocity: ['PR', 'Naguabo'],
  },
  'San Juan': {
    medCardReciprocity: true,
    limitedStateReciprocity: true,
    medCardLimitedReciprocity: ['PR', 'San Juan'],
  },
};
