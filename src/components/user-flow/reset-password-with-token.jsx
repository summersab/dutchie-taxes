import { withLDConsumer } from 'launchdarkly-react-client-sdk';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { TextInput } from 'shared/components/';
import { mediaQueries } from 'shared/styles';
import { ModalContainer, ModalPrimaryHeader, ModalButton, ElementContainer, Label } from 'shared/modals';

@inject('UI', 'User')
@observer
class ResetPasswordWithToken extends React.Component {
  @observable loading = false;
  @observable newPass = '';
  @observable confirmPass = '';

  updateVal = (e) => (this[e.target.name] = e.target.value);

  handleClose = () => {
    const { onClose } = this.props;

    if (onClose) {
      onClose();
    }
  };

  savePassword = async () => {
    const { history, User, UI } = this.props;
    const { params } = this.props.match;

    const { token } = params;
    const validToken = await User.validateResetToken(token);
    if (!validToken) {
      UI.showErnie('Your email link has expired. Please request a new password reset.', 'danger');
      this.loading = false;
      console.error('invalid token');
    } else if (!this.validate()) {
      this.loading = false;
    } else {
      const result = await User.resetPassword(token, this.newPass);
      if (result.success) {
        UI.showErnie('Your password has been successfully reset!', 'success');
        this.loading = false;
        UI.showResetPasswordWithToken = false;
        history.push('/login');
      } else {
        UI.showErnie('Something went wrong. Please contact support.', 'danger');
        console.error(result.err);
        this.loading = false;
      }
    }
  };

  validate = () => {
    const { UI } = this.props;
    if (this.newPass !== this.confirmPass) {
      UI.showErnie('Passwords do not match.', 'danger');
      return false;
    }
    if (this.newPass.length < 8) {
      UI.showErnie('Passwords must be at least 8 characters', 'danger');
      return false;
    }
    return true;
  };

  render() {
    return (
      <ModalContainer fancy isOpen onRequestClose={this.handleClose} p='95px 47px 45px 47px'>
        <ModalPrimaryHeader copy='Change Password' close={this.handleClose} />
        <StyledElementContainer>
          <StyledLabel>New Password:</StyledLabel>
          <TextInput name='newPass' onChange={this.updateVal} value={this.newPass} type='password' />
        </StyledElementContainer>
        <StyledElementContainer>
          <StyledLabel>Confirm Password:</StyledLabel>
          <TextInput name='confirmPass' onChange={this.updateVal} value={this.confirmPass} type='password' />
        </StyledElementContainer>
        <ModalButton
          alignItems='flex-start'
          onClick={this.savePassword}
          loading={this.loading}
          width={['100%', '100%', '100%', '151px']}
          mt='37px'
        >
          Save Password
        </ModalButton>
      </ModalContainer>
    );
  }
}

export default withRouter(withLDConsumer()(ResetPasswordWithToken));

const StyledLabel = styled(Label)`
  width: 122px;
  padding-right: 31px;
`;

const StyledElementContainer = styled(ElementContainer)`
  width: 448px;
  @media ${mediaQueries.largePhone} {
    width: 100%;
  }
`;
