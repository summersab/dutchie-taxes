import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { mediaQueries } from 'shared/styles';
import { useUser } from 'src/hooks/use-user';

type SidebarHeaderProps = {
  imageSrc?: string;
  title: ReactNode;
};

export function SidebarHeader(props: SidebarHeaderProps): JSX.Element {
  const user = useUser();
  const { imageSrc, title } = props;

  return (
    <Container>
      <Image src={imageSrc ?? '/images/superadmin-icon.svg'} />
      <TitleText>{title}</TitleText>
      <EmailText>{user.email}</EmailText>
      <Divider />
    </Container>
  );
}

const Container = styled.div`
  flex: 0 0 auto;
  margin-top: 37px;
`;

const Image = styled.img`
  display: block;
  margin: 0 auto;
  width: 111px;
  max-width: 111px;

  @media ${mediaQueries.desktop} {
    width: 90%;
  }
`;

const TitleText = styled.div`
  display: block;
  font-weight: bold;
  margin-top: 18px;
  padding: 0 5px;
  text-align: center;
`;

const EmailText = styled.div`
  color: #d4efe5;
  font-size: 12px;
  margin: 2px 0 24px 0;
  overflow: hidden;
  padding: 0 5px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media ${mediaQueries.desktop} {
    display: none;
  }
`;

const Divider = styled.hr`
  background-color: #4e957a;
  border: none;
  display: block;
  height: 1px;
  margin: 16px auto 24px;
  width: 77%;
`;
