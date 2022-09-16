import React from 'react';
import styled from 'styled-components';
import DialogContent from '@material-ui/core/DialogContent';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';

import { mediaQueries } from 'shared/styles';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

const PopperWithTransition = (props) => (
  <Popper open transition {...props}>
    {({ TransitionProps }) => (
      <Fade timeout={250} {...TransitionProps}>
        <PopperContent>{props.children}</PopperContent>
      </Fade>
    )}
  </Popper>
);

export const StyledPopper = styled(PopperWithTransition)`
  top: 83px !important;
  right: 13px;
  left: unset !important;
  z-index: 10;
  height: 91px;
  @media ${mediaQueries.largePhone} {
    top: 113px !important;
    right: 11px;
  }
`;

const PopperContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 448px;
  box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.14);
  border-radius: 12px;
  background: #fff;
  height: 100%;
  @media ${mediaQueries.phone} {
    max-width: 351px;
  }
`;

export const FlexWrapper = styled(DialogContent)`
  display: flex;
  padding: 5px 24px 18px !important;
  justify-content: space-between;
`;

export const OrderCount = styled.div`
  display: flex;
  justify-content: center;
  width: fit-content;
  padding: 2px 6px;
  background: #ed5b5b;
  border-radius: 24px;
  color: white;
  margin-right: 15px;
  font-weight: bold;
  font-size: 14px;
  min-width: 12px;
`;

export const Text = styled.p`
  font-weight: bold;
  font-size: 14px;
  line-height: 24px;
  color: #242526;
`;

export const Title = styled.div`
  padding: 14px 24px 0;
  font-weight: bold;
  font-size: 11px;
  line-height: 16px;
  color: #969ea5;
  text-transform: uppercase;
`;

export const Link = styled.div`
  line-height: 21px;
  font-size: 13px;
  color: #0b99e6;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
