import React, { forwardRef } from 'react';
import styled from 'styled-components';

import useHover from 'shared/hooks/use-hover';

import { DragImage } from 'src/dispensary-admin/customize/homepage/components/drag-image';
import { RemoveButton } from 'src/dispensary-admin/customize/homepage/components/remove-button';

// eslint-disable-next-line prefer-arrow-callback
export const ListItem = forwardRef((props, ref) => {
  const { className, primaryText = '', secondaryText = '', isDragging = false, onRemove } = props;
  const [hoverRef, isHovered] = useHover();

  return (
    <DraggableOptionStyles className={className} isDragging={isDragging} ref={ref}>
      <HoverContainer ref={hoverRef}>
        <TextContainer>
          <PrimaryText>{primaryText}</PrimaryText>
          <SecondaryText>{secondaryText}</SecondaryText>
        </TextContainer>
        <RemoveButton visible={isHovered && !isDragging} onClick={onRemove} />
        <DragImage />
      </HoverContainer>
    </DraggableOptionStyles>
  );
});

const DraggableOptionStyles = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 64px;
  padding: 16px 18px 16px 18px;
  opacity: ${(props) => (props.isDragging ? 0 : 1)};
`;

const HoverContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
  width: 100%;
`;

const TextContainer = styled.div`
  flex: 1 1 auto;
  margin-right: 12px;
`;

const PrimaryText = styled.span`
  display: block;
  margin-bottom: 4px;
  font-size: 13px;
  font-weight: bold;
  line-height: 15px;
  color: ${({ theme }) => theme.colors.v2TextColor2};
`;

const SecondaryText = styled.span`
  display: block;
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.v2TextColor1};
`;
