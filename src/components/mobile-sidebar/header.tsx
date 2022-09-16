import React from 'react';
import styled from 'styled-components';
import { useObserver } from 'mobx-react-lite';
import { Flex } from 'rebass';

import { useUser } from 'src/hooks/use-user';
import { useDispensary } from 'src/hooks/use-dispensary';

export function MobileSidebarHeader(): JSX.Element {
  const User = useUser();
  const dispensary = useDispensary();

  return useObserver(() => (
    <Container>
      <Flex alignItems='flex-start' justifyContent='flex-start'>
        <Image src={dispensary.logoImage ?? '/images/superadmin-icon.svg'} />
        <Flex flexDirection='column' justifyContent='flex-start' ml='19px'>
          <TitleText>{dispensary.name}</TitleText>
          <EmailText>{User.email}</EmailText>
        </Flex>
      </Flex>
      <Divider />
    </Container>
  ));
}

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #5f937b;
  margin-top: 26px;
`;

const Container = styled.div`
  width: 100%;
  padding: 32px 30px 0px 30px;
  margin-bottom: 28px;
  box-sizing: border-box;
`;

const Image = styled.img`
  max-height: 70px;
  max-width: 86px;
`;

const TitleText = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
`;

const EmailText = styled.div`
  font-size: 12px;
  color: #d9eee6;
`;
