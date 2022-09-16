import React from 'react';
import styled from 'styled-components';
import { ChevronIcon } from 'src/svg/chevron-icon';
import { FontsCheckmark } from './svgs/fonts-checkmark';
import { FontOption, fontsOptions } from './fonts-selector.constants';

type FontSelectorProps = {
  label: string;
  selectedOption: FontOption;
  onChange: (option: FontOption) => void;
};

export function FontSelector({ label, selectedOption, onChange }: FontSelectorProps): JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = (): void => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: FontOption): void => {
    onChange(option);
  };

  return (
    <Container>
      <Summary onClick={handleToggle}>
        <SummaryLabel>{label}</SummaryLabel>

        <SummaryEndContent>
          {isOpen ? (
            <Close>Close</Close>
          ) : (
            <SelectedFont fontFamily={selectedOption.fontFamily}>{selectedOption.label}</SelectedFont>
          )}
          <EndContentMargin>
            <StyledChevron isOpen={isOpen} />
          </EndContentMargin>
        </SummaryEndContent>
      </Summary>

      {isOpen && (
        <Options>
          {fontsOptions.map((option) => (
            <Option key={option.value} onClick={() => handleSelect(option)}>
              <option.Component />
              {option.value === selectedOption.value && <StyledCheckmark />}
            </Option>
          ))}
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

const SummaryLabel = styled.div`
  color: #4f5d68;
  font-size: 13px;
  font-weight: bold;
  line-height: 23px;
`;

const SummaryEndContent = styled.div`
  display: flex;
  align-items: center;
`;

const EndContentMargin = styled.div`
  margin-left: 8px;
`;

const Close = styled.div`
  color: #0b99e6;
  cursor: pointer;
  font-size: 13px;
  line-height: 23px;
`;

const Options = styled.div`
  height: 325px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
`;

const Option = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 45px;
  padding: 20px;

  :hover {
    background-color: #f6f6f6;
    cursor: pointer;
  }
`;

const SelectedFont = styled.div<{ fontFamily: string }>`
  color: #0b99e6;
  font-family: ${({ fontFamily }) => fontFamily};
`;

const StyledChevron = styled(ChevronIcon)<{ isOpen: boolean }>`
  height: 8px;
  width: 11px;
  fill: #969ea5;
  transform: ${({ isOpen }) => isOpen && 'rotate(180deg)'};
`;

const StyledCheckmark = styled(FontsCheckmark)`
  height: 8px;
  width: 10px;
  fill: #969ea5;
`;
