import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import { Button } from 'shared/components';
import { pluralize, randomOrderConfirmationMessages } from 'shared/helpers/utils';
import useMediaQuery from 'shared/hooks/use-media-query';
import { mediaQueries } from 'shared/styles';

import { Container, FlexWrapper, OrderCount, StyledPopper, Text, Title } from './components';

const ConfirmationNotification = (props) => {
  const { loading, orders, onClick } = props;
  const isMobile = useMediaQuery(mediaQueries.phone);
  const orderCount = orders?.length;
  return (
    <StyledPopper
      open
      keepMounted
      placement='right-start'
      aria-labelledby='order-confirmation-notification'
      aria-describedby='order-confirmation'
    >
      <Title>{randomOrderConfirmationMessages()}</Title>
      <FlexWrapper>
        <Container>
          <OrderCount>{orderCount}</OrderCount>
          <Text>
            You have {orderCount} new {pluralize('order', orderCount)}!
          </Text>
        </Container>
        <StyledButton onClick={onClick} loading={loading}>
          Confirm {!isMobile && pluralize('order', orderCount)}
        </StyledButton>
      </FlexWrapper>
    </StyledPopper>
  );
};

const StyledButton = styled(Button)`
  font-size: 12px;
  line-height: 13px;
  padding: 8px 15px;
  height: 37px;
`;
export default observer(ConfirmationNotification);
