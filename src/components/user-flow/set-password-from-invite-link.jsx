import { withLDConsumer } from 'launchdarkly-react-client-sdk';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex, Image } from 'rebass/styled-components';
import { Link, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import { ModalContainer, ModalButton } from 'shared/modals';
import { openZendeskWidget } from 'shared/helpers/tools';
import BasicCheckbox from 'shared/components/formik/basic-checkbox';

@inject('UI', 'User')
@observer
class SetPasswordFromInviteLink extends Component {
  @observable token = null;
  @observable validToken = true;
  @observable password = '';
  @observable loading = false;

  constructor() {
    super();
    this.state = {
      agree: false,
    };
  }

  componentDidMount() {
    const { User } = this.props;
    const { params } = this.props.match;
    User.logout(null);
    this.token = params.token;
    this.validateToken();
  }

  async validateToken() {
    const { User } = this.props;
    this.loading = true;
    this.validToken = await User.validatePasswordToken(this.token);
    this.loading = false;
  }

  handleChange = (e) => (this[e.target.name] = e.target.value);

  onClickSupport = (event) => {
    event.preventDefault();
    openZendeskWidget();
  };

  validate = () => {
    const { UI } = this.props;
    if (this.password.length < 8) {
      UI.showErnie('Passwords must be at least 8 characters', 'danger');
      return false;
    }
    return true;
  };

  savePassword = async () => {
    if (this.loading) {
      return;
    }
    const { history, UI, User } = this.props;

    this.loading = true;
    await this.validateToken();
    if (!this.validate()) {
      this.loading = false;
    } else if (this.validToken) {
      User.setPassword(this.token, this.password)
        .then(() => {
          UI.showErnie('Your password has been successfully set!', 'success');
          this.close();
          history.push('/login');
        })
        .catch((err) => {
          UI.showErnie('Something went wrong. Please contact support.', 'danger');
          console.error(err);
          this.loading = false;
        });
    } else {
      UI.showErnie('Something went wrong. Please contact support.', 'danger');
      console.error('invalid token');
      this.loading = false;
    }
  };

  close = () => {
    const { UI, admin } = this.props;
    if (!admin) {
      UI.showSetPasswordFromInviteLink = false;
    }
  };

  checkLegalCheckbox = () => {
    this.setState((prevState) => ({ agree: !prevState.agree }));
  };

  render() {
    const { agree } = this.state;

    if (this.loading) {
      return null;
    }

    return (
      <ModalContainer isOpen onRequestClose={this.close} noPadding>
        {this.validToken && (
          <InnerModalContainer>
            <HeaderBackground src='/images/password-modal-background.jpg' />
            <HeaderLogo src='/icons/dutchie-wordmark-white.svg' alt='Dutchie Logo' />
            <CtaText>
              To get started, <span>create a password</span> for your account.
            </CtaText>
            <Input
              disabled={this.loading}
              onChange={this.handleChange}
              value={this.password}
              type='password'
              name='password'
            />

            <LegalCheckbox>
              <BasicCheckbox checked={agree} id='agree' name='agree' onChange={this.checkLegalCheckbox} value={agree} />
              <LegalText>
                <label htmlFor='agree'>I agree to dutchie's </label>
                <a href='https://dutchie.com/dispensary-terms' target='_blank' rel='noreferrer'>
                  terms and conditions
                </a>
                .
              </LegalText>
            </LegalCheckbox>

            <ModalButton
              disabled={this.loading || !agree}
              loading={this.loading}
              onClick={this.savePassword}
              width='111px'
              mt='0px'
            >
              Continue
            </ModalButton>
          </InnerModalContainer>
        )}
        {!this.validToken && (
          <ExpiredLinkContainer p={16}>
            <SadFace mb='34px' src='/icons/404-face.svg' m='0 auto' width='70px' />
            <ExpiredTitle>We're sorry, this link has expired!</ExpiredTitle>
            <ExpiredText>
              For security purposes, invite links expire after they've been used once. To resolve this issue, please
              have the user who originally sent your invite delete your user account and add you again. For any further
              questions{' '}
              <a href='#' onClick={this.onClickSupport}>
                contact dutchie support
              </a>
              .
            </ExpiredText>
          </ExpiredLinkContainer>
        )}
      </ModalContainer>
    );
  }
}

export default withRouter(withLDConsumer()(SetPasswordFromInviteLink));

const InnerModalContainer = styled(Flex)`
  width: 513px;
  height: 379px;
  padding-top: 109px;
  background-color: white;
  border-radius: 7px;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.11);
  position: relative;
  overflow: hidden;
  flex-direction: column;
`;

const HeaderBackground = styled(Image)`
  position: absolute;
  width: 515px;
  max-width: 515px;
  top: -35px;
  left: -1px;
`;

const HeaderLogo = styled(Image)`
  width: 138px;
  position: absolute;
  top: 43px;
  left: 50%;
  transform: translateX(-50%);
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.28));
`;

const CtaText = styled.p`
  width: 100%;
  text-align: center;
  margin-top: 45px;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  color: #59646e;
  span {
    font-weight: bold;
  }
`;

const Input = styled.input`
  appearance: none;
  padding: 0 30px;
  margin: 20px auto;
  font-size: 14px;
  color: #575e64;
  width: 295px;
  height: 45px;
  border-radius: 3px;
  background-color: #fcfdfe;
  border: solid 1px #d2d5da;

  &:focus {
    border: 1px solid #5bb0fc;
    outline: none;
    box-shadow: none;
  }
`;

const LegalCheckbox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 26px;
`;

const LegalText = styled.span`
  font-size: 11px;
  line-height: 1.64;
  text-align: center;
  color: #788490;
  margin-left: -6px;
  label {
    cursor: pointer;
  }
  a {
    color: #4597e0;
  }
`;

const ExpiredLinkContainer = styled(InnerModalContainer)`
  justify-content: flex-start;
  padding: 46px 60px 0 60px;
  height: 420px;
  box-shadow: none;
`;

const SadFace = styled(Image)`
  width: 170px;
`;

const ExpiredTitle = styled.h2`
  text-align: center;
  color: #677682;
  font-size: 20px;
  font-weight: bolder;
  line-height: 1.5;
  margin-bottom: 26px;
`;

const ExpiredText = styled.p`
  text-align: center;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  color: #59646e;
  line-height: 1.8;
  a {
    cursor: pointer;
  }
`;
