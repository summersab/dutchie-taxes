import React, { useMemo } from 'react';

import { GqlMenuSection, MenuSectionType } from 'types/graphql';
import { ProductCarousel } from './product-carousel';
import { OfferCarousel } from './offer-carousel';

type CarouselsProps = {
  menuSections: GqlMenuSection[];
};

type ProductCarouselProps = {
  menuSection: GqlMenuSection;
};

function OfferSection({ menuSection }: ProductCarouselProps): JSX.Element {
  return <OfferCarousel menuSection={menuSection} />;
}

function CustomSection({ menuSection }: ProductCarouselProps): JSX.Element {
  const productsFilter = useMemo(() => {
    if (!menuSection.products) {
      throw new Error('CustomSection is missing products');
    }

    return {
      sortBy: `popularSortIdx`,
      productIds: menuSection.products,
    };
  }, [menuSection.products]);

  return <ProductCarousel menuSection={menuSection} productsFilter={productsFilter} />;
}

function TopSellersSection({ menuSection }: ProductCarouselProps): JSX.Element {
  const productsFilter = { sortBy: `popular` };

  return <ProductCarousel menuSection={menuSection} productsFilter={productsFilter} />;
}

function StaffPicksSection({ menuSection }: ProductCarouselProps): JSX.Element {
  const productsFilter = {
    sortBy: `popularSortIdx`,
    staffPicks: true,
  };

  return <ProductCarousel menuSection={menuSection} productsFilter={productsFilter} />;
}

function SpecialsCarousel({ menuSection }: ProductCarouselProps): JSX.Element {
  const productsFilter = { isOnSpecial: true };
  return <ProductCarousel menuSection={menuSection} productsFilter={productsFilter} />;
}

function SubCategoryCarousel({ menuSection }: ProductCarouselProps): JSX.Element {
  const productsFilter = useMemo(() => {
    if (!menuSection.subcategory) {
      throw new Error('SubCategoryCarousel is missing subcategory');
    }

    return {
      sortBy: `popularSortIdx`,
      subcategories: [menuSection.subcategory],
    };
  }, [menuSection.subcategory]);

  return <ProductCarousel menuSection={menuSection} productsFilter={productsFilter} />;
}

function BrandCarousel({ menuSection }: ProductCarouselProps): JSX.Element {
  const productsFilter = useMemo(() => {
    if (!menuSection.brandId) {
      throw new Error('BrandCarousel is missing brand');
    }

    return {
      sortBy: `popularSortIdx`,
      brandIds: [menuSection.brandId],
    };
  }, [menuSection.brandId]);

  return <ProductCarousel menuSection={menuSection} productsFilter={productsFilter} />;
}

function CategoryCarousel({ menuSection }: ProductCarouselProps): JSX.Element {
  const productsFilter = useMemo(() => {
    if (!menuSection.category) {
      throw new Error('CategoryCarousel is missing category');
    }

    return {
      sortBy: `popularSortIdx`,
      types: [menuSection.category],
    };
  }, [menuSection.category]);

  return <ProductCarousel menuSection={menuSection} productsFilter={productsFilter} />;
}

const sectionTypeToCarousel: Record<MenuSectionType, React.FC<ProductCarouselProps>> = {
  [MenuSectionType.category]: CategoryCarousel,
  [MenuSectionType.brand]: BrandCarousel,
  [MenuSectionType.subcategory]: SubCategoryCarousel,
  [MenuSectionType.specials]: SpecialsCarousel,
  [MenuSectionType.staffPicks]: StaffPicksSection,
  [MenuSectionType.topSellers]: TopSellersSection,
  [MenuSectionType.custom]: CustomSection,
  [MenuSectionType.offers]: OfferSection,
};

export function Carousels({ menuSections }: CarouselsProps): JSX.Element | null {
  return (
    <>
      {menuSections.map((section) => {
        const CarouselComponent = sectionTypeToCarousel[section.sectionType];
        return <CarouselComponent menuSection={section} key={section.id} />;
      })}
    </>
  );
}
