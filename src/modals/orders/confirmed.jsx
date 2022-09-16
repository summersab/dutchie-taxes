import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import { pluralize, randomOrderConfirmedMessages } from 'shared/helpers/utils';
import { mediaQueries } from 'shared/styles';
import { useStores } from 'src/hooks/use-stores';
import useMediaQuery from 'shared/hooks/use-media-query';

import { Checkmark } from 'src/svg/checkmark';
import { Container, FlexWrapper, Link, StyledPopper, Text, Title } from './components';

const ConfirmedNotification = () => {
  const { UI } = useStores();
  const history = useHistory();
  const isMobile = useMediaQuery(mediaQueries.phone);
  if (!UI.orderConfirmedObj.open) {
    return null;
  }
  // only single order confirmations will have routes configured.
  const singleOrderConfirmed = !!UI.orderConfirmedObj?.route;
  const pluralizeCount = singleOrderConfirmed ? 1 : 2;
  const handleClick = () => {
    history.push(UI.orderConfirmedObj.route);
    UI.orderConfirmedObj.open = false;
  };
  return (
    <StyledPopper
      open
      keepMounted
      placement='right-start'
      aria-labelledby='order-confirmation-notification'
      aria-describedby='order-confirmation'
    >
      <Title>{randomOrderConfirmedMessages()}</Title>
      <FlexWrapper>
        <Container>
          <CircleContainer>
            <CheckmarkContainer>
              <Checkmark height='16' width='12' viewBox='0 0 9 12' />
            </CheckmarkContainer>
          </CircleContainer>
          <Text>
            {!isMobile && `Success! `} {pluralize('Customer', pluralizeCount)} {pluralizeCount > 1 ? ' have' : ' has'}{' '}
            been notified.
          </Text>
        </Container>
        {!!UI.orderConfirmedObj?.route && <Link onClick={handleClick}> View order </Link>}
      </FlexWrapper>
    </StyledPopper>
  );
};

const CircleContainer = styled.div`
  background: #4ca667;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  border-radius: 24px;
  color: white;
  margin-right: 15px;
  font-weight: bold;
`;

const CheckmarkContainer = styled.div`
  margin-top: 12px;
`;

export default observer(ConfirmedNotification);
