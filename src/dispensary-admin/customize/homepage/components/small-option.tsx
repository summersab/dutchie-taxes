import React from 'react';
import styled from 'styled-components';

import { Tooltip } from 'shared/components';
import useHover from 'shared/hooks/use-hover';

import { PlusIcon } from './plus-icon';

type SmallOptionProps = {
  tooltipCopy: string;
  title: string;
  onAddSection: () => void;
};

export function SmallOption(props: SmallOptionProps): JSX.Element {
  const { tooltipCopy, title, onAddSection } = props;
  const [hoverRef, isHovered] = useHover();

  return (
    <SmallOptionStyles ref={hoverRef} hovered={isHovered}>
      <TitleContainer>
        {title}
        {isHovered && tooltipCopy && (
          <Tooltip
            arrowRight='103px'
            bottom='30px'
            grey
            iconOpacity={0.7}
            left='auto'
            right='-103px'
            tooltipCopy={tooltipCopy}
            width='298px'
          />
        )}
      </TitleContainer>

      <PlusIcon isHovered={isHovered} onClick={onAddSection} data-testid='svg-button' />
    </SmallOptionStyles>
  );
}

const SmallOptionStyles = styled.div<{ hovered: boolean }>`
  align-items: center;
  background: ${({ hovered }) => (hovered ? '#f3f6f8' : 'none')};
  border-radius: 5px;
  color: ${({ hovered }) => (hovered ? '#454e50' : '#677882')};
  display: flex;
  font-size: 13px;
  height: 36px;
  justify-content: space-between;
  padding: 0 12px;
  transition: background 0.15s, color 0.15s;
  width: 201px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex: 1 0 0%;
  min-width: 0;
`;
