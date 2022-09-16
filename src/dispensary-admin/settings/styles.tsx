import React from 'react';
import { Box, Flex, FlexProps, Text } from 'rebass';
import styled from 'styled-components';
import { textInputStyles } from 'shared/components/text-input';
import { mediaQueries } from 'shared/styles';
import Cleave from 'cleave.js/react';
import { space, SpaceProps } from 'styled-system';

type SettingsFieldContainerProps = FlexProps &
  React.PropsWithChildren<{
    noBottom?: boolean;
    centered?: boolean;
  }> &
  SpaceProps;

export const SettingsFieldContainer = styled(({ children, ...props }: SettingsFieldContainerProps) => (
  <Flex {...props}>{children}</Flex>
))`
  flex-wrap: wrap;
  border-bottom: 1px solid #e5ebef;
  color: #6d747b;
  justify-content: flex-start;
  align-items: ${({ centered }) => (centered ? 'center' : 'flex-start')};
  padding: 0 0 25px 0;
  margin: 0 0 25px 0;

  ${({ noBottom = false }) =>
    noBottom &&
    `
    border-bottom: none;
    padding-bottom: 0px;
    margin-bottom: 15px;
  `};

  ${space}
`;

export const SettingsFieldInputContainer = styled(Flex)`
  flex-wrap: wrap;
  width: calc(100% - 115px);
  align-items: flex-start;

  &.--textarea-container {
    textarea {
      padding: 14px 21px 13px;
      box-shadow: none;
      color: #707478;
      font-size: 13px;
      min-height: 196px;
      z-index: 1;
    }
  }

  .checkbox-old {
    box-sizing: content-box;
    height: 19px;
    &:first-of-type {
      padding-top: 0px;
    }
  }

  @media ${mediaQueries.largePhone} {
    width: 100%;
    flex-direction: column;
  }
`;

export const SettingsFieldInputColumn = styled(SettingsFieldInputContainer)`
  flex-direction: column;
`;

type SettingsFieldLabelProps = SpaceProps & {
  color?: string;
  width?: string;
};

export const SettingsFieldLabel = styled(Text)<SettingsFieldLabelProps>`
  width: ${(props) => (props.width ? props.width : '115px')};
  padding-right: 6px;
  font-size: 13px;
  font-weight: bold;
  color: ${(props) => (props.color ? props.color : '#707478')};
  ${space}

  @media ${mediaQueries.largePhone} {
    width: 100%;
    padding-bottom: 6px;
  }
`;

export const SettingsTextInput = styled.input`
  ${textInputStyles}
  max-width: 300px;
  margin: 0;
  height: 45px;
`;

export const StyledCleave = SettingsTextInput.withComponent(Cleave);

const InputWithUnitContainer = styled(Box)<SpaceProps>`
  position: relative;
  width: 120px;
  ${space}

  span {
    text-align: center;
    color: #6d747b;
    font-size: 14px;
    height: 45px;
    line-height: 45px;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 2.25em;
    z-index: 4;

    &.left {
      left: 2px;
    }
    &.right {
      right: 20px;
    }
  }

  input {
    &.left {
      padding-left: 41px;
    }
    &.right {
      padding-right: 50px;
    }
  }
`;

type TextInputWithUnitProps = Pick<SpaceProps, 'ml' | 'mr'> & {
  unit: string;
  side?: 'left' | 'right';
  name?: string;
  placeholder?: string;
  value?: number | string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register?: () => void;
};

export const TextInputWithUnit = ({
  unit,
  side = 'left',
  ml,
  mr,
  register,
  ...props
}: TextInputWithUnitProps): JSX.Element => (
  <InputWithUnitContainer ml={ml} mr={mr}>
    <span className={side}>{unit}</span>
    <SettingsTextInput className={side} ref={register} {...props} />
  </InputWithUnitContainer>
);

export const SwitchContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const SelectFieldWrapper = styled.div`
  @media ${mediaQueries.largePhone} {
    padding-bottom: 6px;
  }
`;

export const FormContainer = styled.form`
  width: 100%;
  max-width: 733px;
  background-color: #ffffff;
  border: 1px solid #d3d8de;
  border-radius: 4px;
  box-shadow: -2px 3px 2px 0 rgba(37, 37, 37, 0.05);
  overflow: unset;
  width: 75%;
`;

export const InnerContainer = styled.div`
  padding: 36px 40px;
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  > div {
    margin-right: 23px;
  }
`;

export const SelectLabel = styled.p`
  color: #969ea5;
  font-size: 11px;
  font-weight: bold;
  line-height: 150%;
  margin-bottom: 3px;
  text-transform: uppercase;
`;
