import styled from 'styled-components';
import { CheckboxOld, Tooltip, TextInput } from 'shared/components';
import { ThickCheckmark as CheckmarkIcon } from 'src/svg/thick-checkmark';

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`;

export const Container = styled.div`
  border-top: solid 1px #d7e4eb;
  padding-top: 45px;
`;

export const FieldTitle = styled.label`
  text-transform: uppercase;
  font-size: 11px;
  font-weight: bold;
  color: #969ea5;
  display: inline-block;
`;

export const FieldTitleContainer = styled.div`
  display: flex;
  align-items: centers;
  margin-bottom: 7px;
`;

export const StyledCheckbox = styled(CheckboxOld)`
  display: inline-flex;
  margin-right: 24px;
  margin-top: 7px;
  > span {
    font-size: 13px;
    color: #6d747b;
  }
`;

export const StyledCheckmarkIcon = styled(CheckmarkIcon)`
  margin: 0 0 4px 4px;
`;

export const OptionsCheckboxGroupContainer = styled.div`
  margin-bottom: 25px;
`;

export const StyledTextInput = styled(TextInput)`
  width: 410px;
  height: 47px;
  border-radius: 3px;
  margin: 0;
`;

export const StyledTooltip = styled(Tooltip)`
  display: inline-flex;
  margin-bottom: 2px;
`;
