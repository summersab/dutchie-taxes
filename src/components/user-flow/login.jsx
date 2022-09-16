import { observable, when } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { space } from 'styled-system';
import isEmail from 'validator/lib/isEmail';
import _ from 'lodash';

import { mediaQueries } from 'shared/styles';
import { TextInput, ResetButton } from 'shared/components/';
import {
  ModalContainer,
  ModalSecondaryHeader,
  ModalClose,
  ModalButton,
  ElementContainer,
  Label,
  WhiteNotifyBlock,
} from 'shared/modals';

@inject('UI', 'User')
@observer
class Login extends React.Component {
  @observable loading = false;
  @observable email = '';
  @observable password = '';

  handleUpdateValue = (e) => (this[e.target.name] = e.target.value);

  handleLogin = async () => {
    const { UI, User } = this.props;
    if (this.handleValidate()) {
      this.loading = true;
      const response = await User.login(this.email, this.password);

      if (response.success) {
        when(() => User.exists === true, this.handleLoginSuccess);
      } else {
        const message = _.get(
          response,
          'error.graphQLErrors[0].extensions.errors[0].detail',
          "You've entered an incorrect email or password. Please try again."
        );
        UI.showErnie(message, 'danger');
        this.loading = false;
      }
    }
  };

  handleValidate = () => {
    const { UI } = this.props;
    if (!isEmail(this.email)) {
      UI.showErnie('Please enter a valid email address', 'danger');
      return false;
    }
    if (this.password.length < 1) {
      UI.showErnie('Please enter your password', 'danger');
      return false;
    }

    return true;
  };

  handleClose = () => {
    const { onClose } = this.props;

    if (onClose) {
      onClose();
    }
  };

  handleLoginSuccess = async () => {
    const { onSuccess, UI } = this.props;

    if (UI.closeLoginModal) {
      UI.closeLoginModal({ resetOpts: false });
    }

    this.loading = false;
    if (onSuccess) {
      onSuccess();
    }
  };

  handleSignup = () => {
    const { location, history, UI } = this.props;
    if (location.pathname.includes('login')) {
      history.push('/sign-up');
    } else {
      if (UI.closeLoginModal) {
        UI.closeLoginModal({ resetOpts: false });
      }

      UI.toggleModal('showSignup');
    }
  };

  handleHitEnter = (e) => {
    if (e.key === 'Enter') {
      this.handleLogin();
    }
  };

  render() {
    const { onClose, onOpenForgotPassword, showSignUp } = this.props;

    return (
      <ModalContainer
        data-cy='login-modal'
        data-test='login-modal'
        isOpen
        onRequestClose={this.handleClose}
        p='31px 47px 35px 47px'
      >
        <ModalSecondaryHeader lowercase>Log In</ModalSecondaryHeader>

        <WhiteNotifyBlock mt='-6px' mb='30px'>
          {showSignUp && (
            <React.Fragment>
              New to dutchie?
              <StyledResetButton
                data-cy='sign-up-link'
                data-test='sign-up-link'
                pl='4px'
                color='#4597e0'
                onClick={this.handleSignup}
              >
                Sign Up
              </StyledResetButton>
            </React.Fragment>
          )}
        </WhiteNotifyBlock>

        <StyledElementContainer>
          <StyledLabel>Email: </StyledLabel>
          <TextInput
            aria-label='email address input'
            data-cy='email-input'
            data-test='email-input'
            name='email'
            placeholder=''
            onChange={this.handleUpdateValue}
            value={this.email}
            onKeyPress={this.handleHitEnter}
          />
        </StyledElementContainer>

        <StyledElementContainer>
          <StyledLabel>Password: </StyledLabel>
          <TextInput
            type='password'
            name='password'
            aria-label='password input'
            data-cy='password-input'
            data-test='password-input'
            placeholder=''
            onChange={this.handleUpdateValue}
            value={this.password}
            onKeyPress={this.handleHitEnter}
          />
        </StyledElementContainer>

        <ResetPassword data-cy='forgot-password-link' data-test='forgot-password-link' onClick={onOpenForgotPassword}>
          Forgot your password?
        </ResetPassword>

        <ModalButton
          aria-label='login button'
          data-cy='login-button-submit'
          data-test='login-button-submit'
          width='100%'
          mt='18px'
          onClick={this.handleLogin}
          loading={this.loading}
        >
          Log in
        </ModalButton>

        {onClose && <ModalClose onClick={this.handleClose} />}
      </ModalContainer>
    );
  }
}

export default withRouter(Login);

const ResetPassword = styled(ResetButton)`
  color: #8f989e;
  font-size: 13px;
  justify-content: flex-start;
  line-height: 15px;
  margin-bottom: 10px;
  margin-top: -3px;
  padding-left: 105px;
  text-align: left;
  text-decoration: underline;
  width: 100%;

  @media ${mediaQueries.largePhone} {
    padding-left: 0px;
  }
`;

const StyledResetButton = styled(ResetButton)`
  line-height: 15px;
  ${space}
`;

const StyledLabel = styled(Label)`
  padding-right: 31px;
  width: 105px;
`;

const StyledElementContainer = styled(ElementContainer)`
  margin-bottom: 12px;
`;
