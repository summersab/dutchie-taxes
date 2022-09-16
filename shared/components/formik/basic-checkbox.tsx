import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

type BasicCheckboxProps = {
  name: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  text: string;
  value: string;
  checked: boolean;
  disabled?: boolean;
};

export default function BasicCheckbox(props: BasicCheckboxProps): JSX.Element {
  const { name, onBlur, onChange, text, value, checked, disabled } = props;

  return (
    <Container>
      <Input
        id={name}
        name={name}
        checked={checked}
        onBlur={onBlur}
        onChange={onChange}
        type='checkbox'
        value={value}
        disabled={disabled}
      />

      <Label htmlFor={name} checked={checked}>
        {text}
      </Label>
    </Container>
  );
}

const Container = styled.div`
  cursor: pointer;
  display: inline-block;
  font-size: 13px;
  height: 17px;
  position: relative;
`;

const Input = styled.input`
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;
  cursor: pointer;
`;

const Label = styled.label<{ checked?: boolean }>`
  background-repeat: no-repeat;
  color: #6d747b;
  display: inline-block;
  font-size: 13px;
  height: 17px;
  padding: 0 0 0 36px;
  position: relative;
  white-space: nowrap;
  z-index: 1;
  cursor: pointer;

  ${(props): FlattenSimpleInterpolation => {
    if (props.checked) {
      return css`
        background-image: url('/icons/checked-icon.svg');
      `;
    }

    return css`
      background-image: url('/icons/unchecked-icon.svg');
    `;
  }}
`;
