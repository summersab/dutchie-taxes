import _ from 'lodash';
import { reaction, observable, transaction } from 'mobx';
import { inject, observer, disposeOnUnmount } from 'mobx-react';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import ErrorIcon from 'shared/components/ernie/error-icon';
import SuccessIcon from 'shared/components/ernie/success-icon';
import InfoIcon from 'shared/components/ernie/info-icon';
import { Container, IconContainer, Message } from 'shared/components/ernie/styled-components';
import { ERNIE_TIMEOUTS } from 'shared/constants';

const iconMapping = {
  danger: ErrorIcon,
  error: ErrorIcon,
  info: InfoIcon,
  success: SuccessIcon,
};

@inject('UI')
@observer
export default class Ernie extends React.Component {
  @observable visible = false;
  @observable msg = '';
  @observable type = '';

  /* eslint-disable */
  @disposeOnUnmount ernieQueueDisposer = reaction(
    () => this.props.UI.ernieQueue.length,
    () => this.show()
  );
  /* eslint-enable */

  show = () => {
    const { UI } = this.props;

    if (!_.isEmpty(UI.ernieQueue) && !this.visible) {
      const currentAlert = UI.ernieQueue.shift();

      transaction(() => {
        this.msg = currentAlert.msg;
        this.type = currentAlert.type;
        this.visible = true;
      });

      _.delay(() => {
        this.visible = false;
        // clear message to ensure next alert is read by screen readers
        this.msg = '';
        if (!_.isEmpty(UI.ernieQueue)) {
          _.delay(() => this.show(), 250);
        }
      }, currentAlert.timeout || ERNIE_TIMEOUTS.SHORT);
    }
  };

  render() {
    const { isIframe, iframeOffset, parentOffset } = this.props;
    const { msg, type, visible } = this;
    const IconComponent = _.get(iconMapping, type, iconMapping.danger);

    return (
      <Container
        data-cy='ernie-container'
        data-test='ernie-container'
        type={type}
        visible={visible}
        isIframe={isIframe}
        iframeOffset={iframeOffset}
        parentOffset={parentOffset}
        role='region'
        aria-live='assertive'
      >
        <IconContainer>
          <IconComponent />
        </IconContainer>

        <Message data-cy='ernie-message' data-test='ernie-message'>
          <ReactMarkdown children={msg} />
        </Message>
      </Container>
    );
  }
}
