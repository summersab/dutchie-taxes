import styled from 'styled-components';
import { Flex } from 'rebass';
import { mediaQueries } from 'shared/styles';
import { position } from 'styled-system';

import ModalContainer from './container';
import ModalSecondaryHeader from './header';
import ModalClose from './close';
import ModalButton from './button';
import ModalCopy from './copy';
import FloatingModalCloseButton from './floating-close-button';
import { NotifyBlock, WhiteNotifyBlock, YellowNotifyBlock, RedNotifyBlock } from './notify-block';

import ModalPrimaryHeader from './fancy-header';

const ElementContainer = styled(Flex)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 10px;
  ${position}
  @media ${mediaQueries.largePhone} {
    flex-direction: column;
    align-items: flex-start;
    min-height: 80px;
  }
`;

const Label = styled.p`
  font-weight: bold;
  color: #707478;
  font-size: 13px;
  width: 125px;
  flex-shrink: 0;
  text-align: right;
  padding-right: 35px;
  @media ${mediaQueries.largePhone} {
    text-align: left;
    margin: 10px 0px 3px 0px;
  }
`;

export {
  ModalContainer,
  ModalSecondaryHeader,
  ModalPrimaryHeader,
  ModalClose,
  ModalButton,
  ModalCopy,
  FloatingModalCloseButton,
  ElementContainer,
  Label,
  NotifyBlock,
  WhiteNotifyBlock,
  YellowNotifyBlock,
  RedNotifyBlock,
};
