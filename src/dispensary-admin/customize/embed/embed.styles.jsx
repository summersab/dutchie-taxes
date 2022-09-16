import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { space } from 'styled-system';
import { Link } from 'react-router-dom';

import { Select } from 'shared/components';

import {
  SettingsFieldContainer,
  SettingsFieldInputContainer,
  SettingsFieldLabel,
  SelectFieldWrapper,
} from 'src/dispensary-admin/settings/styles';

export function SelectField({ title, options, ...props }) {
  return (
    <StyledSettingsFieldContainer noBottom mb='25px'>
      <StyledSettingsFieldLabel>{title}</StyledSettingsFieldLabel>
      <SettingsFieldInputContainer>
        <SelectFieldWrapper>
          <StyledSelect {...props}>
            {_.map(options, (option) => (
              <option key={option.key} value={option.value}>
                {option.value}
              </option>
            ))}
          </StyledSelect>
        </SelectFieldWrapper>
      </SettingsFieldInputContainer>
    </StyledSettingsFieldContainer>
  );
}

const StyledSettingsFieldContainer = styled(SettingsFieldContainer)`
  flex-direction: column;
`;

const StyledSettingsFieldLabel = styled(SettingsFieldLabel)`
  text-transform: uppercase;
  font-size: 11px;
  color: #969ea5;
  margin-bottom: 7px !important;
`;

const StyledSelect = styled(Select)`
  width: 228px;
  height: 47px;
  select {
    font-size: 13px !important;
  }
`;

export const StyledLink = styled(Link)`
  color: #0b99e6;
  font-size: 12px;
  display: inline-block;
  :hover {
    cursor: pointer;
  }
  ${space}
`;
