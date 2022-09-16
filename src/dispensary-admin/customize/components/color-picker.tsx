import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';

import { Checkmark as CheckmarkIcon } from 'src/svg/checkmark';

import { Color } from '../helpers';

type ColorPickerProps = {
  colors: Color[];
  label: string;
  onSelect: (color: Color) => void;
  selectedColor: Color;
  textPreview?: boolean;
};

export function ColorPicker({
  colors,
  label,
  onSelect,
  selectedColor,
  textPreview = false,
}: ColorPickerProps): JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);

  function handleToggle(): void {
    setIsOpen((value) => !value);
  }

  function handleSelect(color: Color): void {
    handleToggle();
    onSelect(color);
  }

  return (
    <Container>
      <Summary onClick={handleToggle}>
        <Label>{label}</Label>

        {!isOpen && (
          <React.Fragment>
            {textPreview && (
              <TextPreview customColor={selectedColor}>
                <strong>A</strong>a
              </TextPreview>
            )}

            {!textPreview && <Swatch customColor={selectedColor}>&nbsp;</Swatch>}
          </React.Fragment>
        )}

        {isOpen && <Close>Close</Close>}
      </Summary>

      {isOpen && (
        <Options>
          {_.map(colors, (color) => {
            const isSelected = color === selectedColor;

            return (
              <Option key={color.key}>
                {/**
                 * the seemingly redundant "color" attribute is neccessary to allow
                 * the e2e tests to select a div based on the HTML color attribute 🙁
                 */}
                <Swatch customColor={color} color={color.color} onClick={() => handleSelect(color)}>
                  {isSelected && <CheckmarkIcon color={selectedColor.color} />}

                  {!isSelected && <span>&nbsp;</span>}
                </Swatch>
              </Option>
            );
          })}
        </Options>
      )}
    </Container>
  );
}

const Container = styled.div`
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #d3d8de;
  box-shadow: 0px 3px 5px #e9ecf1;
  width: 310px;
`;

const Summary = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 53px;
  justify-content: space-between;
  padding: 19px 20px;
`;

const Label = styled.div`
  color: #4f5d68;
  font-family: 'proxima-nova';
  font-size: 13px;
  font-weight: bold;
  line-height: 23px;
`;

const Swatch = styled.div<{ customColor: Color }>`
  align-items: center;
  background-color: ${({ customColor }) => customColor.background};
  border-radius: 50%;
  border: 1px solid ${({ customColor }) => customColor.border};
  box-shadow: 0px 3px 3px #e8edf3;
  box-sizing: border-box;
  color: ${({ customColor }) => customColor.color};
  cursor: pointer;
  display: flex;
  height: 23px;
  justify-content: center;
  width: 23px;
`;

const Close = styled.div`
  color: #0b99e6;
  cursor: pointer;
  font-family: 'proxima-nova';
  font-size: 13px;
  line-height: 23px;
`;

const Options = styled.ol`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0 20px 20px 20px;
  margin: -6px;
`;

const Option = styled.li`
  margin: 6px;
`;

const TextPreview = styled.div<{ customColor: Color }>`
  background: ${({ customColor }) => customColor.background};
  border-radius: 6px;
  border: 1px solid ${({ customColor }) => customColor.border};
  box-sizing: border-box;
  color: ${({ customColor }) => customColor.color};
  display: inline-block;
  line-height: 24px;
  padding: 0 0.5em;
`;
