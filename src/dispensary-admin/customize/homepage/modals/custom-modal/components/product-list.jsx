import React from 'react';
import styled, { css } from 'styled-components';

import { mediaQueries } from 'shared/styles';

import { SmallText } from './small-text';
import { DraggableListItem } from './draggable-list-item';
import concatBrandName from '../utils/concat-brand-name';

export function ProductList(props) {
  const { products, handleMove, handleRemove } = props;
  return (
    <React.Fragment>
      <DisplayHeader>
        <SmallText>SELECTED PRODUCTS ({products.length})</SmallText>
      </DisplayHeader>
      <DisplayList>
        {/* eslint-disable-next-line lodash/prefer-lodash-method */}
        {products.map(({ id, Name, brand, type }, index) => (
          <DraggableListItem
            key={id}
            index={index}
            primaryText={concatBrandName(brand, Name)}
            secondaryText={type}
            onMove={handleMove}
            onRemove={() => handleRemove(id)}
          />
        ))}
      </DisplayList>
    </React.Fragment>
  );
}

const scrollBarStyles = css`
  // firefox
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.grey[60]} transparent;

  // webkit
  /* width */
  ::-webkit-scrollbar {
    width: 4px;
  }

  /* track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 13px;
    background: ${({ theme }) => theme.colors.grey[60]};
    cursor: pointer;
  }

  /* handle hover */
  ::-webkit-scrollbar-thumb:hover {
    opacity: 1;
    transition: 0.3s ease;
  }
`;

const DisplayHeader = styled.span`
  display: block;
  padding: 34px 18px 10px 18px;
`;

const DisplayList = styled.div`
  ${scrollBarStyles}
  overflow-y: auto;

  @media ${mediaQueries.largePhone} {
    overflow: unset;
  }
`;
