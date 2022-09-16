import React from 'react';
import styled, { css } from 'styled-components';
import { Box, Flex } from 'rebass/styled-components';
import { top, left, right, bottom, height, width, margin, padding } from 'styled-system';
import _ from 'lodash';

import TooltipIcon from './tooltip-icon';
import Clickable from './clickable';

const iconContainerStyles = css`
  height: 15px;
  opacity: ${(props) => props.iconOpacity};
`;

const IconContainer = styled.div`
  ${iconContainerStyles}
`;

const ClickableIconContainer = styled(Clickable)`
  ${iconContainerStyles}
`;

const TooltipContainer = styled(Flex)`
  display: flex;
  align-items: center;
  position: relative;
  width: ${(props) => props.containerWidth || 'fit-content'};
  ${margin}
  ${padding}
`;

const StyledTooltip = styled(({ _top, _left, _right, _bottom, _height, _width, _centerArrow, _margin, ...props }) => (
  <Box {...props} />
))`
  ${({ mobilePosition }) =>
    mobilePosition?.right &&
    `
    @media screen and (max-width: 410px) {
      right: ${mobilePosition.right};
    }
  `}

  opacity: 0;
  visibility: hidden;
  display: none;
  transition: all 0.3s;
  &.visible {
    opacity: 1;
    visibility: visible;
    display: block;
  }
  font-size: 12px;
  line-height: 16px;
  position: ${({ position }) => position};
  bottom: 30px;
  background-color: rgba(44, 47, 50, 0.92);
  color: #f5f7fa;
  padding: ${(props) => props.bubblePadding || '15px 18px 16px 21px'};
  ${margin}
  white-space: normal;
  font-weight: normal;
  text-align: left;
  border-radius: 10px;
  z-index: 100;
  ${top}
  ${left}
  ${right}
  ${bottom}
  ${height}
  ${width}
  &:after {
    content: '';
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 8px solid rgba(44, 47, 50, 0.92);
    position: absolute;
    transform: ${(props) => (props.leftArrow ? 'rotate(90deg) translateX(25%)' : 'none')};
    transform-origin: ${(props) => (props.leftArrow ? 'center' : 'top left')};
    bottom: ${(props) => (props.leftArrow ? '50%' : '-7px')};
    left: ${(props) => (props.leftArrow ? '-11px' : 'auto')};
    right: ${(props) => {
      if (props.centerArrow) {
        return 'calc(50% - 8px)';
      }
      if (props.arrowRight) {
        return props.arrowRight;
      }

      return '61px';
    }};
  }
`;

export default class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: props.show,
    };
  }

  render() {
    const {
      mainCopy,
      tooltipCopy,
      hoverMain,
      centerArrow,
      tooltipLink,
      hideIcon,
      icon,
      iconOpacity = 1,
      allowHoverAction = true,
      top: topProp,
      left: leftProp,
      right: rightProp,
      bottom: bottomProp,
      height: heightProp,
      width: widthProp,
      visible,
      position,
      margin: marginProp,
      mobilePosition,
      ...props
    } = this.props;
    const { hover } = this.state;
    return (
      <TooltipContainer {...props}>
        {hoverMain &&
          React.cloneElement(mainCopy, {
            onMouseEnter: () => (allowHoverAction ? this.setState({ hover: true }) : _.noop()),
            onMouseLeave: () => (allowHoverAction ? this.setState({ hover: false }) : _.noop()),
            onFocus: () => (allowHoverAction ? this.setState({ hover: true }) : _.noop()),
            onBlur: () => (allowHoverAction ? this.setState({ hover: false }) : _.noop()),
          })}
        {!hoverMain && mainCopy}
        {!hoverMain && !tooltipLink && !hideIcon && (
          <IconContainer
            onMouseEnter={() => this.setState({ hover: true })}
            onMouseLeave={() => this.setState({ hover: false })}
            iconOpacity={iconOpacity}
          >
            <TooltipIcon color={props.grey && 'grey'} {...icon} />
          </IconContainer>
        )}
        {!hoverMain && tooltipLink && (
          <ClickableIconContainer onClick={() => window.open(tooltipLink, `_blank`)} iconOpacity={iconOpacity}>
            <TooltipIcon color={props.grey && 'grey'} {...icon} />
          </ClickableIconContainer>
        )}
        {tooltipCopy && (
          <StyledTooltip
            className={(hover || visible) && 'visible'}
            top={topProp || 'auto'}
            left={leftProp || 'auto'}
            right={rightProp || '-61px'}
            bottom={bottomProp}
            height={heightProp || 'auto'}
            width={widthProp || '239px'}
            centerArrow={centerArrow}
            arrowRight={props.arrowRight}
            bubblePadding={props.bubblePadding}
            leftArrow={props.leftArrow}
            position={position || 'absolute'}
            margin={marginProp || 'unset'}
            mobilePosition={mobilePosition}
          >
            <p className='tooltip-copy'>{tooltipCopy}</p>
          </StyledTooltip>
        )}
      </TooltipContainer>
    );
  }
}
