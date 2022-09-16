import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import _ from 'lodash';

import CategoryTile from 'shared/components/category-tile';
import Button from 'shared/components/button';
import CircleWithCheckMark from './circle-with-checkmark';

export function CustomCategoryTile({
  category,
  imgSrc,
  onEditButtonClick,
  onClick = _.noop,
  selected,
  showEditButtonOnHover,
  ...props
}) {
  return (
    <StyledCategoryTile
      selected={selected}
      showEditButtonOnHover={showEditButtonOnHover}
      imgSrc={imgSrc}
      onClick={onClick}
      category={category}
      {...props}
    >
      {showEditButtonOnHover && (
        <Fragment>
          <EditButton id='edit-button' onClick={onEditButtonClick}>
            Edit Photo
          </EditButton>
          <Overlay id='overlay' />
        </Fragment>
      )}
      <StyledCheckmark opacity={selected ? 1 : 0} />
    </StyledCategoryTile>
  );
}

const StyledCategoryTile = styled(CategoryTile)`
  position: relative;
  overflow: hidden;
  cursor: ${({ showEditButtonOnHover, selected }) => (showEditButtonOnHover || selected ? `default` : `pointer`)};
  transition: box-shadow 0.2s ease-in-out;

  :focus {
    outline: none;
  }

  ${({ showEditButtonOnHover }) =>
    showEditButtonOnHover &&
    css`
      :hover {
        #overlay,
        #edit-button {
          opacity: 1;
        }
      }
    `};

  ${({ selected }) =>
    selected &&
    css`
      transition: box-shadow 0.1s ease-in-out;
      box-shadow: 0 0 0 2px #4ca667, 0px 4px 10px rgba(0, 0, 0, 0.1) !important;
      :hover {
        box-shadow: 0 0 0 2px #4ca667, 0px 4px 10px rgba(0, 0, 0, 0.1) !important;
      }
    `};
`;

const EditButton = styled(Button)`
  align-items: center;
  background: #0b99e6;
  border-radius: 16.5px;
  display: flex;
  opacity: 0;
  transition: opacity 0.1s;
  font-size: 13px;
  height: 33px;
  justify-content: center;
  position: absolute;
  width: 104px;
  z-index: 2;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  :hover {
    background: #0b99e6;
  }
`;

const Overlay = styled.div`
  align-items: center;
  background: rgba(34, 43, 48, 0.93);
  opacity: 0;
  transition: opacity 0.1s;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
`;

const StyledCheckmark = styled(CircleWithCheckMark)`
  opacity: ${({ opacity }) => opacity};
  transition: opacity 0.1s ease-in-out;
  position: absolute;
  top: 14px;
  right: 14px;
`;
