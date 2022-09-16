import React from 'react';
import { ButtonNext, ButtonPrev, BackArrow, ForwardArrow } from './image-banner.styles';

type NavigationButtonProps = {
  enabled: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const PrevButton = ({ enabled, onClick }: NavigationButtonProps): JSX.Element => (
  <ButtonPrev className='--left' disabled={!enabled} onClick={onClick}>
    <BackArrow onClick={onClick} />
  </ButtonPrev>
);

export const NextButton = ({ enabled, onClick }: NavigationButtonProps): JSX.Element => (
  <ButtonNext className='--right' disabled={!enabled} onClick={onClick}>
    <ForwardArrow onClick={onClick} />
  </ButtonNext>
);
