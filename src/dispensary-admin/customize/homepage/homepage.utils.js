import _ from 'lodash';
import { SubcategoryOptions as subcategories } from 'shared/constants';
import { allMenuSectionTypes, PRODUCT_LIMIT } from './constants';

export function getAvailableMenuSectionTypes(menuSections) {
  return _.filter(allMenuSectionTypes, (menuSectionType) => menuSectionType.visible(menuSections));
}

const filterByBrand = ({ products }, menuSection) =>
  _.take(
    _.filter(products, (product) => product?.brand?.id === menuSection.brandId),
    15
  );
const filterByCategory = ({ products }, menuSection) => _.take(_.filter(products, { type: menuSection.category }), 15);

const filterByOffers = ({ offers }, _menuSection) => _.take(offers, PRODUCT_LIMIT);

const filterBySubcategory = ({ products }, menuSection) => {
  const subcategory = _.find(subcategories[menuSection.category], { value: menuSection.subcategory })?.value;
  return _.take(_.filter(products, { subcategory }), 15);
};

const filterBySpecials = ({ products }, _menuSection) => _.take(_.filter(products, `special`), PRODUCT_LIMIT);

const filterByStaffPicks = ({ products }, _menuSection) =>
  _.take(
    _.filter(products, (product) => !!product?.featured?.current),
    PRODUCT_LIMIT
  );

const filterByTopSellers = ({ products }, _menuSection) => _.take(products, 15);

const filterByCustom = ({ products }, menuSection) =>
  _.compact(_.map(menuSection?.products, (productId) => _.find(products, ({ id }) => id === productId)));

const filterMapping = {
  BRAND: filterByBrand,
  CATEGORY: filterByCategory,
  OFFERS: filterByOffers,
  SPECIALS: filterBySpecials,
  STAFF_PICKS: filterByStaffPicks,
  SUBCATEGORY: filterBySubcategory,
  TOP_SELLERS: filterByTopSellers,
  CUSTOM: filterByCustom,
};

export const getMenuSectionProductFilter = (category) => filterMapping[category];
