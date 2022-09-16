import React from 'react';

import { Container, Title, CategoryContainer, ViewAllButton } from './categories.styles';
import { Category } from './categories.types';
import { CategoryCard } from './category-card';

type CategoriesProps = {
  categories: Array<Category>;
};

export const TEST_ID_CATEGORIES = 'categories';

export function Categories({ categories }: CategoriesProps): JSX.Element {
  return (
    <Container data-testid={TEST_ID_CATEGORIES}>
      <Title>Categories</Title>
      <CategoryContainer>
        {categories.map((category) => (
          <CategoryCard key={category.label} {...category} />
        ))}
      </CategoryContainer>
      <ViewAllButton>View All</ViewAllButton>
    </Container>
  );
}
