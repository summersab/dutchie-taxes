import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { space, textAlign, width, color, alignItems, justifyContent, flexDirection, top, border } from 'styled-system';

import { mediaQueries } from 'shared/styles';

@observer
class ReactModalAdapter extends React.Component {
  targetRef = React.createRef();

  onModalOpen = () => {
    disableBodyScroll(this.targetRef);
  };

  onModalClose = (...args) => {
    const { onRequestClose } = this.props;
    enableBodyScroll(this.targetRef);
    if (onRequestClose) {
      onRequestClose(...args);
    }
  };

  componentWillUnmount() {
    try {
      enableBodyScroll(this.targetRef);
    } catch (e) {
      // console.error(e); // swallow error that occurs when
      // navigating between pages and a modal is open.
    }
  }

  render() {
    const { isOpen, className, modifierClassName, variant, ...rest } = this.props;
    let contentClassName = `${className}__content ${modifierClassName}`;
    let overlayClassName = `${className}__overlay`;
    if (variant === 'embedded') {
      contentClassName += ' --variant-embedded';
      overlayClassName += ' --variant-embedded';
    }

    if (variant === 'admin-scrollable') {
      contentClassName += ' --variant-admin-scrollable';
      overlayClassName += ' --variant-admin-scrollable';
    }

    if (variant === 'admin-scrollable-dynamic') {
      contentClassName += ' --variant-admin-scrollable --dynamic';
      overlayClassName += ' --variant-admin-scrollable --dynamic';
    }

    if (variant === 'mobile-vertical-scroll') {
      contentClassName += ' --mobile-vertical-scroll';
    }

    return (
      <Modal
        isOpen={isOpen}
        className={contentClassName}
        contentLabel='Dutchie Modal'
        contentRef={(node) => (this.targetRef = node)}
        onAfterOpen={this.onModalOpen}
        onRequestClose={this.onModalClose}
        overlayClassName={`${overlayClassName} ios-hack`}
        portalClassName={className}
        {...rest}
        data={{
          cy: rest['data-cy'],
          test: rest['data-test'],
        }}
      />
    );
  }
}

const StyledModal = styled(ReactModalAdapter)`
  &__overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(62, 68, 73, 0.93);
    z-index: ${({ important }) => (important ? 500 : 100)};
    pointer-events: auto;
    &.--variant-embedded {
      background-color: rgba(255, 255, 255, 0.95);
    }
    body.--ios-hack--repaint & {
      // position: static;
      transform: translateZ(0);
      -moz-transform: translatez(0);
      -ms-transform: translatez(0);
      -o-transform: translatez(0);
      -webkit-transform: translateZ(0);
      -webkit-overflow-scrolling: touch;
      touch-action: auto;
      -webkit-user-select: none;
      -webkit-touch-callout: none;
      -webkit-user-drag: none;
    }
    ${(props) =>
      props.scrollable &&
      `
      align-items: center;
      display: flex;
      justify-content: center;
    `}
  }

  &__content {
    padding: ${(props) => {
      if (props.fancy) {
        return '101px 47px 45px 47px';
      }
      if (props.noPadding) {
        return '0px';
      }
      if (props.sidePadding) {
        return '31px 5px 45px 5px';
      }
      return props.padding || '31px 47px 45px 47px';
    }};
    border-radius: 8px;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.11);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: absolute;
    box-sizing: border-box;
    outline: none;

    ${(props) =>
      !props.popUp &&
      `
      max-height: 100vh;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `}
    ${(props) =>
      props.popUp &&
      `
      max-height: calc(100vh - 20px);
      bottom: 0px;
      left: 50%;
      transform: translate(-50%, 0);
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    `}
    ${space}
    ${textAlign}
    ${width}
    ${color}
    ${alignItems}
    ${justifyContent}
    ${flexDirection}
    ${border}

    ${(props) =>
      props.scrollable &&
      `
      position: relative;
      display: inline-flex;
      transform: none;
      left: auto;
      top: auto;
    `}

    &.--variant-embedded {
      box-shadow: none;
      border: 1px solid #c9cdd4;
      top: 40px;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0%);
    }

    &.--variant-admin-scrollable {
      max-height: none;
      height: 100%;

      &.--dynamic {
        max-height: 100%;
        height: unset;
        ${top}
      }
    }

    &.--product-modal {
      background: transparent;
      box-shadow: none;
      border: none;
      height: 100vh;
      width: 1140px;
      max-width: 80vw;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      max-height: unset;
      position: unset;
      transform: unset;
      border-radius: 0;

      @media ${mediaQueries.tablet} {
        background-color: white;
        max-width: 100vw;
      }

      @media ${mediaQueries.largePhone} {
        max-height: 100%;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        transform: none;
        border-radius: 0px;
        justify-content: flex-start;
        position: static;
      }
    }

    &.--dutchie-video-modal {
      @media ${mediaQueries.largePhone} {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
      }
    }

    &.--mobile-vertical-scroll {
      overflow-y: scroll;
      display: block;
    }
  }

  ${(props) =>
    props.mobileFullscreen &&
    `
    @media ${mediaQueries.largePhone} {
      &__content, &__content.--variant-embedded {
        max-height: 100%;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        transform: none;
        border-radius: 0px;
        justify-content: flex-start;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
      }
    }
  `}

  ${(props) =>
    props.mobileCentered &&
    `
    @media ${mediaQueries.largePhone} {
      &__content, &__content.--variant-embedded {
        max-height: 100%;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        transform: none;
        border-radius: 0px;
        justify-content: center;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
      }
    }
  `}
`;

export default (props) => {
  const {
    children,
    isOpen = false,
    className: modifierClassName,
    fancy = false,
    mobileFullscreen = true,
    noPadding = false,
    scrollable = false,
    variant = 'default',
    ...rest
  } = props;

  useEffect(() => {
    // react-modal adds a pesky overflow: hidden to the body, so we unset
    // it when the modal is closed to ensure the user can still scroll
    if (!isOpen) {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <StyledModal
      {...rest}
      fancy={fancy}
      mobileFullscreen={mobileFullscreen}
      modifierClassName={modifierClassName}
      noPadding={noPadding}
      scrollable={scrollable}
      variant={variant}
      isOpen={isOpen}
    >
      {children}
    </StyledModal>
  );
};
