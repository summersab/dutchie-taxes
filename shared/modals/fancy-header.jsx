import React from 'react';
import styled from 'styled-components';
import { Flex, Image } from 'rebass';
import { ModalClose } from './index';
import { ResetButton } from '../components';
import { colors } from '../styles';

const Container = styled((props) => <Flex {...props} />)`
  z-index: 5;
  background-color: #ecf0f3;
  border-color: #d1d5da;
  height: ${(props) => (props.height ? props.height : '60px')};
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  justify-content: ${(props) => {
    if (props.centered) {
      return 'center';
    }
    if (props.textButton) {
      return 'space-between';
    }
    return 'flex-start';
  }};
  padding: ${(props) => {
    if (props.textButton) {
      return '4px 60px 0 33px';
    }
    return '1px 33px 0 33px';
  }};
`;

const Header = styled(({ children, ...props }) => <h2 {...props}>{children}</h2>)`
  color: #6d747b;
  font-weight: bold;
  font-size: 16px;
  ${(props) =>
    props.icon &&
    `
    margin-left: 12px;
  `}

  ${(props) =>
    props.centered &&
    `
    font-size: 20px;
  `}
`;

const Close = styled(ModalClose)`
  top: 12px;
  right: 15px;
`;

const TextButton = styled((props) => <ResetButton color={colors.blue} {...props} />)`
  &:hover {
    text-decoration: underline;
  }
`;

export default (
  /** @type {textButton: string | boolean | undefined} */ {
    icon = false,
    copy,
    textButton = false,
    textButtonFunc = false,
    close,
    centered = false,
    disabled = false,
    ...props
  }
) => (
  <Container textButton={textButton} centered={centered} {...props}>
    {icon && <Image width='24px' src={icon} />}
    <Header centered={centered || undefined} icon={icon || undefined}>
      {copy}
    </Header>
    {textButton && <TextButton onClick={textButtonFunc}>{textButton}</TextButton>}
    {!disabled && <Close onClick={close} />}
  </Container>
);
