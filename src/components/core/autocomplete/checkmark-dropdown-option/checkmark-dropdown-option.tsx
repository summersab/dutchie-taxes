import React, { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

import { Add as AddIcon } from 'src/svg/add';
import { Checkmark as CheckmarkIcon } from 'src/svg/checkmark';

export type CheckmarkDropdownOptionProps = HTMLAttributes<HTMLDivElement> & {
  primaryText?: string;
  secondaryText?: string;
  selected?: boolean;
};

export function CheckmarkDropdownOption(props: CheckmarkDropdownOptionProps): JSX.Element {
  const { primaryText = '', secondaryText = '', selected = false, ...otherProps } = props;

  return (
    <CheckmarkDropdownOptionStyles {...otherProps}>
      <TextContainer>
        <PrimaryText>{primaryText}</PrimaryText>
        <SecondaryText>{secondaryText}</SecondaryText>
      </TextContainer>
      <StatusIcon selected={selected}>
        {selected ? <CheckmarkIcon color='#fff' height='10' width='14' viewBox='0 0 9 7' /> : <AddIcon />}
      </StatusIcon>
    </CheckmarkDropdownOptionStyles>
  );
}

const PrimaryText = styled.span`
  display: block;
  margin-bottom: 4px;
  font-size: 13px;
  font-weight: bold;
  line-height: 13px;
  color: ${({ theme }) => theme.colors.v2TextColor2};
`;

const SecondaryText = styled.span`
  display: block;
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.v2TextColor1};
`;

const StatusIcon = styled.div<{ selected: boolean }>`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  height: 28px;
  width: 28px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.grey[70]};
  cursor: pointer;

  > svg,
  > svg * {
    pointer-events: none;
  }

  ${({ selected }) =>
    selected &&
    css`
      background: ${({ theme }) => theme.colors.lime[45]} !important;
      border-color: ${({ theme }) => theme.colors.lime[45]} !important;
    `}
`;

const TextContainer = styled.div`
  flex: 1 1 auto;
  margin-right: 12px;
`;

const CheckmarkDropdownOptionStyles = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 64px;
  padding: 16px 20px 16px 27px;
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryGrey};

    ${StatusIcon} {
      background: rgba(163, 175, 186, 0.63);
      border: 2px solid ${({ theme }) => theme.colors.grey[70]};

      svg path {
        fill: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;
