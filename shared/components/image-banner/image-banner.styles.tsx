import styled from 'styled-components';
import { ChevronIconLeft } from 'shared/assets/chevron-icon-left';
import { ChevronIconRight } from 'shared/assets/chevron-icon-right';

export const Main = styled.div<{ isPreview: boolean }>`
  width: ${({ isPreview }) => (isPreview ? '100%' : '100vw')};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: ${({ isPreview }) => (isPreview ? '0' : '-25px')};
`;

export const Viewport = styled.div`
  overflow: hidden;
  width: 100%;
  &.is-draggable {
    cursor: move;
    cursor: grab;
  }
`;

export const ButtonsContainer = styled.div`
  padding-top: 0px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const CircleContainer = styled.button`
  border-radius: 50%;
  height: 32px;
  width: 32px;
  justify-content: center;
  align-items: center;
  border: 1px solid #eaeff2;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const sharedButtonStyles = styled(CircleContainer)`
  background-color: #fff;
  outline: 0;
  border: 0;
  cursor: pointer;
  display: none;

  @media (min-width: 901px) {
    :hover {
      background-color: #bccad2;
    }
    display: block;
  }
`;

export const ButtonPrev = styled(sharedButtonStyles)``;

export const ButtonNext = styled(sharedButtonStyles)``;

export const ForwardArrow = styled(ChevronIconRight)``;

export const BackArrow = styled(ChevronIconLeft)``;

export const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 2px;
  width: auto;
  margin: 0 12px;
`;

export const DotButton = styled.span<{ selected: boolean }>`
  text-decoration: none;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#454e50' : '#e5e8ea')};
  :hover {
    background-color: ${({ selected }) => (selected ? '#454e50' : '#caced4')};
  }
  margin: 0 3px;
`;
