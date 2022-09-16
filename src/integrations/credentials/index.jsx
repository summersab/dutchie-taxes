import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import { Flex, Image, Text } from 'rebass';
import { TextInput } from 'shared/components';
import { ModalContainer, ModalButton, ModalCopy, ElementContainer, Label } from 'shared/modals';
import { mediaQueries } from 'shared/styles';
import styled from 'styled-components';
import _ from 'lodash';
import { emailIntegrationCredentials } from 'shared/graphql/dispensary/mutations';

const StyledLabel = styled(Label)`
  width: 125px;
  padding-right: 31px;
`;

const StyledElementContainer = styled(ElementContainer)`
  width: 362px;
  @media ${mediaQueries.largePhone} {
    width: 100%;
  }
`;

const INTEGRATION_KEYS = {
  cova: 'cova',
  flowhub: 'flowhub',
  greenbits: 'greenbits',
  leaflogix: 'leaflogix',
  mjfreeway: 'mjfreeway',
  mmjmenu: 'mmjmenu',
  adilas: 'adilas',
  dauntless: 'dauntless',
  onfleet: 'onfleet',
  blaze: 'blaze',
  d365: 'd365',
  proteus: 'proteus',
  meadow: 'meadow',
  growflow: 'growflow',
  greenline: 'greenline',
  posabit: 'posabit',
  techpos: 'techpos',
  anthea: 'anthea',
  vend: 'vend',
  alcanna: 'alcanna',
  merrco: 'merrco',
  hypur: 'hypur',
};

const defaultFieldNames = {
  userName: 'Email',
  password: 'Password',
  storeName: 'Store name',
};

const INTEGRATIONS = {
  [INTEGRATION_KEYS.cova]: {
    displayName: 'Cova',
    fieldNames: defaultFieldNames,
    image: '/images/cova-logo.png',
  },
  [INTEGRATION_KEYS.flowhub]: {
    displayName: 'Flowhub',
    fieldNames: {
      ...defaultFieldNames,
      userName: 'Badge ID',
    },
    image: '/images/flowhub-logo.png',
  },
  [INTEGRATION_KEYS.greenbits]: {
    displayName: 'Greenbits',
    fieldNames: {
      ...defaultFieldNames,
      userName: 'Username',
    },
    image: '/images/greenbitsV2-logo.png',
  },
  [INTEGRATION_KEYS.leaflogix]: {
    displayName: 'LeafLogix',
    fieldNames: {
      ...defaultFieldNames,
      userName: 'Username',
    },
    image: '/images/leaflogix-logo.png',
  },
  [INTEGRATION_KEYS.mjfreeway]: {
    displayName: 'MJ Freeway',
    fieldNames: defaultFieldNames,
    image: '/images/mjfreeway-logo.png',
  },
  [INTEGRATION_KEYS.adilas]: {
    displayName: 'Adilas',
    fieldNames: {
      ...defaultFieldNames,
      userName: 'Username',
      adHoc1: 'Corporation Key',
    },
    image: '/images/adilas-logo.png',
  },
  [INTEGRATION_KEYS.dauntless]: {
    displayName: 'Dauntless Retail',
    fieldNames: defaultFieldNames,
    image: '/images/dauntless-logo.png',
  },
  [INTEGRATION_KEYS.onfleet]: {
    displayName: 'Onfleet',
    fieldNames: { apiKey: 'API Key' },
    image: '/images/onfleet-logo.png',
  },
  [INTEGRATION_KEYS.blaze]: {
    displayName: 'Blaze',
    fieldNames: defaultFieldNames,
    image: '/images/blaze-logo.png',
  },
  [INTEGRATION_KEYS.d365]: {
    displayName: 'D365',
    fieldNames: defaultFieldNames,
    image: '/images/d365-logo.png',
  },
  [INTEGRATION_KEYS.proteus]: {
    displayName: 'Proteus',
    fieldNames: defaultFieldNames,
    image: '/images/proteus-logo.png',
  },
  [INTEGRATION_KEYS.meadow]: {
    displayName: 'Meadow',
    fieldNames: defaultFieldNames,
    image: '/images/meadow-logo.png',
  },
  [INTEGRATION_KEYS.growflow]: {
    displayName: 'GrowFlow',
    fieldNames: defaultFieldNames,
    image: '/images/growflow-logo.png',
  },
  [INTEGRATION_KEYS.greenline]: {
    displayName: 'Greenline',
    fieldNames: defaultFieldNames,
    image: '/images/greenline-logo.png',
  },
  [INTEGRATION_KEYS.techpos]: {
    displayName: 'TechPOS',
    fieldNames: defaultFieldNames,
    image: '/images/techpos-logo.png',
  },
  [INTEGRATION_KEYS.vend]: {
    displayName: 'Vend',
    fieldNames: defaultFieldNames,
    image: '/images/vend-logo.png',
  },
  [INTEGRATION_KEYS.globaltill]: {
    displayName: 'Global Till',
    fieldNames: defaultFieldNames,
    image: '/images/globaltill-logo.png',
  },
  [INTEGRATION_KEYS.shopify]: {
    displayName: 'Shopify',
    fieldNames: defaultFieldNames,
    image: '/images/shopify-logo.svg',
  },
  [INTEGRATION_KEYS.posabit]: {
    displayName: 'POSaBIT',
    fieldNames: defaultFieldNames,
    image: '/images/posabit-logo.svg',
  },
  [INTEGRATION_KEYS.anthea]: {
    displayName: 'Anthea',
    fieldNames: defaultFieldNames,
    image: '/images/anthea-logo.png',
  },
  [INTEGRATION_KEYS.alcanna]: {
    displayName: 'Alcanna',
    fieldNames: defaultFieldNames,
    image: 'https://pixabay.com/illustrations/traffic-signs-right-of-way-test-361514/',
  },
  [INTEGRATION_KEYS.merrco]: {
    displayName: 'Merrco',
    image: '/images/merrco-logo.svg',
  },
  [INTEGRATION_KEYS.hypur]: {
    displayName: 'Hypur',
    image: '/images/hypur-logo.svg',
  },
};

@inject('UI', 'apolloClient')
@observer
class IntegrationCredentials extends React.Component {
  @observable integrationName = null;
  @observable success = false;
  @observable loading = false;
  @observable username = '';
  @observable password = '';
  @observable adHoc1 = '';
  @observable dispensary = '';

  componentDidMount() {
    const integrationName = this.props.match.params.adapter;
    this.integrationName = INTEGRATION_KEYS[integrationName.toLowerCase()];
    if (!this.integrationName) {
      this.props.history.push('/');
    }
  }

  updateVal = (e) => (this[e.target.name] = e.target.value);

  submitCredentials = async () => {
    if (this.validate()) {
      this.loading = true;
      const { integrationName, username, password, dispensary, adHoc1 } = this;
      const { data } = await this.props.apolloClient.mutate({
        mutation: emailIntegrationCredentials,
        variables: {
          input: {
            integrationName: INTEGRATIONS[integrationName].displayName,
            username,
            password,
            dispensary,
            adHoc1,
          },
        },
      });
      this.loading = false;
      this.success = data.emailIntegrationCredentials.success;
      if (!data.emailIntegrationCredentials.success) {
        this.props.UI.showErnie('Something went wrong. Please contact support.', 'danger');
      }
    }
  };

  validate = () => {
    const { fieldNames = defaultFieldNames } = _.get(INTEGRATIONS, this.integrationName);
    if (this.username.length === 0) {
      this.props.UI.showErnie(`Please enter a valid ${fieldNames.userName}.`, 'danger');
      return false;
    }
    if (this.password.length === 0) {
      this.props.UI.showErnie('Please enter a valid password.', 'danger');
      return false;
    }
    if (this.dispensary.length === 0) {
      this.props.UI.showErnie(`Please enter a valid ${fieldNames.storeName.toLowerCase()}.`, 'danger');
      return false;
    }
    return true;
  };

  get credentialsForm() {
    const integration = INTEGRATIONS[this.integrationName];
    if (!integration) {
      return null;
    }
    const { displayName, fieldNames, image } = integration;
    return (
      <ModalContainer isOpen={!this.success} width={['100%', '100%', '100%', '495px']}>
        <Image alt='' src={image} width='223px' mb='15px' />
        <ModalCopy maxWidth='332px' fontSize='12px' lineHeight='1.5'>
          {`To get started, enter your ${displayName} login information below. We’ll use
          this to begin building your menu on dutchie!`}
        </ModalCopy>
        <Flex alignItems='flex-start' flexDirection='column' mt='25px'>
          <StyledElementContainer>
            <StyledLabel>{`${fieldNames.userName}:`}</StyledLabel>
            <TextInput name='username' onChange={this.updateVal} value={this.username} autoComplete='new-password' />
          </StyledElementContainer>
          <StyledElementContainer>
            <StyledLabel>{`${fieldNames.password}:`}</StyledLabel>
            <TextInput
              name='password'
              onChange={this.updateVal}
              value={this.password}
              type='password'
              autoComplete='new-password'
            />
          </StyledElementContainer>
          {fieldNames.adHoc1 && (
            <StyledElementContainer>
              <StyledLabel>{`${fieldNames.adHoc1}:`}</StyledLabel>
              <TextInput name='adHoc1' onChange={this.updateVal} value={this.adHoc1} autoComplete='new-password' />
            </StyledElementContainer>
          )}
          <StyledElementContainer>
            <StyledLabel>{`${fieldNames.storeName}:`}</StyledLabel>
            <TextInput
              name='dispensary'
              onChange={this.updateVal}
              value={this.dispensary}
              placeholder='Enter the name of your store'
            />
          </StyledElementContainer>
          <ModalButton
            onClick={this.submitCredentials}
            loading={this.loading}
            mt={[20, 20, 20, 15]}
            width={['100%', '100%', '100%', '110px']}
            buttonContainerWidth='auto'
          >
            Connect
          </ModalButton>
        </Flex>
      </ModalContainer>
    );
  }

  get successModal() {
    return (
      <ModalContainer isOpen={this.success} width={['100%', '100%', '100%', '495px']}>
        <Image src='/icons/connected-icon.svg' width='68px' mt='20px' mb='29px' />
        <Text fontSize='15px' fontWeight='bold' mb='13px' color='#47494c'>
          Success!
        </Text>
        <ModalCopy maxWidth='330px' color='#6d747b' fontSize='12px' lineHeight='1.5'>
          We’ve begun to import your menu into dutchie. No further action is required at this time.
        </ModalCopy>
      </ModalContainer>
    );
  }

  render() {
    return (
      <Fragment>
        {this.credentialsForm}
        {this.successModal}
      </Fragment>
    );
  }
}

export default withRouter(IntegrationCredentials);
