import _ from 'lodash';

const IS_VISIBLE = true;
export const allMenuSectionTypes = [
  {
    key: 'CATEGORY',
    title: 'Popular Category',
    tooltip: 'Display a section of the most popular items in a top level category, for example “Popular Edibles”.',
    visible: () => IS_VISIBLE,
  },
  {
    key: 'SUBCATEGORY',
    title: 'Popular Subcategory',
    tooltip: 'Display a section of the most popular items in a subcategory, for example “Popular Gummies”.',
    visible: () => IS_VISIBLE,
  },
  {
    key: 'BRAND',
    title: 'Brand',
    tooltip: 'Display a section of the most popular items for the selected brand.',
    visible: () => IS_VISIBLE,
  },
  {
    key: 'SPECIALS',
    title: 'Items on Sale',
    tooltip: 'Display a section that shows items that are currently on special.',
    visible: (menuSections) => !_.some(menuSections, { sectionType: 'SPECIALS' }),
  },
  {
    key: 'STAFF_PICKS',
    title: 'Staff Picks',
    tooltip: 'Display a section that shows items that are currently selected as Staff Picks.',
    visible: (menuSections) => !_.some(menuSections, { sectionType: 'STAFF_PICKS' }),
  },
  {
    key: 'TOP_SELLERS',
    title: 'Top Sellers',
    tooltip: 'Display a section that shows the top selling items on your entire menu.',
    visible: (menuSections) => !_.some(menuSections, { sectionType: 'TOP_SELLERS' }),
  },
  {
    key: 'CUSTOM',
    title: 'Custom',
    tooltip: 'Display a section that shows selected products from your menu.',
    visible: () => IS_VISIBLE,
  },
  {
    key: 'OFFERS',
    title: 'Offers',
    tooltip: 'Display a section of your promotional Offers.',
    visible: (menuSections) => !_.some(menuSections, { sectionType: 'OFFERS' }),
  },
];

export const PRODUCT_LIMIT = 15;
