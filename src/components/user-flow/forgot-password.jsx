import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Flex } from 'rebass/styled-components';
import isEmail from 'validator/lib/isEmail';
import styled from 'styled-components';

import { TextInput } from 'shared/components/';
import { ModalContainer, ModalButton, ModalCopy, ModalSecondaryHeader, ModalClose } from 'shared/modals';

@inject('UI', 'User')
@observer
class RequestResetPasswordEmail extends React.Component {
  @observable loading = false;
  @observable email = '';
  @observable displayWarning = false;

  updateVal = (e) => (this[e.target.name] = e.target.value);

  handleClose = () => {
    const { onClose } = this.props;

    if (onClose) {
      onClose();
    }
  };

  openSignupModal = () => {
    const { UI } = this.props;
    UI.closeNewPasswordEmail();
    UI.toggleModal('showSignup');
  };

  handleSendResetEmail = async () => {
    const { onSuccess, UI, User } = this.props;

    if (this.validate()) {
      this.displayWarning = false;
      this.loading = true;

      if (UI.variant === 'embedded') {
        const accountExists = await User.checkIfUserExists(this.email);
        if (!accountExists) {
          this.displayWarning = true;
          this.email = '';
          this.loading = false;
          return;
        }
      }

      const result = await User.sendPasswordResetEmail(this.email);

      if (result.success) {
        this.loading = false;
        UI.showErnie('An email has been sent with instructions on how to reset your password.', 'success');
        UI.showRequestPasswordResetEmail = false;

        if (onSuccess) {
          onSuccess();
        }
      } else {
        UI.showErnie('Something went wrong. Please contact support.', 'danger');
        console.error(result.err);
        this.loading = false;
      }
    }
  };

  validate = () => {
    const { UI } = this.props;

    if (!isEmail(this.email)) {
      UI.showErnie('Please enter a valid email.', 'danger');
      return false;
    }
    return true;
  };

  render() {
    const { onClose } = this.props;
    return (
      <ModalContainer
        isOpen
        onRequestClose={this.handleClose}
        data-cy='reset-password-modal'
        data-test='reset-password-modal'
        width={['100%', '100%', '100%', '453px']}
      >
        <ModalSecondaryHeader>Reset Your Password</ModalSecondaryHeader>
        {!this.displayWarning && (
          <ModalCopy maxWidth='354px'>
            Enter the email address associated with your account, and we'll email you a link to reset your password.
          </ModalCopy>
        )}
        {this.displayWarning && (
          <ModalWarning>
            We couldn't find an account associated with that email. If your account was created on a previous ordering
            system, you'll need to <ModalWarningLink onClick={this.openSignupModal}>create a new one</ModalWarningLink>.
            It only takes a few seconds!
          </ModalWarning>
        )}
        <Flex flexDirection={['column', 'column', 'column', 'row']} mt='32px'>
          <StyledInput
            data-cy='reset-email-input'
            data-test='reset-email-input'
            name='email'
            onChange={this.updateVal}
            value={this.email}
            placeholder='Email address'
            m={['5px auto', '5px auto', '5px auto', '0 18px 0 0']}
          />
          <ModalButton
            onClick={this.handleSendResetEmail}
            loading={this.loading}
            mt={[20, 20, 20, 0]}
            width={['100%', '100%', '100%', '100px']}
            buttonContainerWidth='auto'
            data-cy='reset-submit-button'
            data-test='reset-submit-button'
          >
            Submit
          </ModalButton>
        </Flex>
        {onClose && <ModalClose onClick={this.handleClose} />}
      </ModalContainer>
    );
  }
}

export default withRouter(RequestResetPasswordEmail);

const StyledInput = styled(TextInput)`
  text-align: center;
  width: 230px;
`;

const ModalWarning = styled(ModalCopy)`
  background-color: #fff0f0;
  border: solid 1px #d8c1c1;
  border-radius: 5px;
  color: #986c6c;
  line-height: normal;
  padding: 16px;
  text-align: left;
`;

const ModalWarningLink = styled.span`
  color: #4597e0;
  cursor: pointer;
`;
