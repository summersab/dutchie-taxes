import _ from 'lodash';
import styled, { css } from 'styled-components';

const backgroundColorMapping = {
  danger: '#da5347',
  error: '#da5347',
  info: '#1b9edb',
  success: '#75ba50',
};

export const Container = styled.div`
  box-sizing: border-box;
  align-items: center;
  background-color: ${(props) => _.get(backgroundColorMapping, props.type, backgroundColorMapping.danger)};
  bottom: 0;
  display: flex;
  flex-direction: row;
  height: 61px;
  left: 0;
  justify-content: flex-start;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  padding: 15px;
  position: fixed;
  right: 0;
  top: -61px;
  transform: ${(props) => (props.visible ? 'translate3d(0, 61px, 0)' : 'translate3d(0, 0, 0)')};
  transition: 0.2s transform, 0.2s opacity;
  z-index: 9999;

  ${({ isIframe, iframeOffset, parentOffset }) =>
    isIframe &&
    css`
      position: absolute;
      top: ${parentOffset + iframeOffset - 61}px;
    `}
`;

export const IconContainer = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  display: flex;
  height: 32px;
  justify-content: center;
  margin-right: 15px;
  width: 32px;
`;

export const Message = styled.p`
  color: #fff;
  font-size: 14px;
`;

export default { Container, IconContainer, Message };
