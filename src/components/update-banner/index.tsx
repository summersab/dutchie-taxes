import React from 'react';
import styled from 'styled-components';
import { Button } from 'shared/components';

type Props = {
  buttonText: string;
  children: React.ReactNode;
  heading: string;
  onClick: () => void;
};

export function UpdateBanner(props: Props): JSX.Element {
  const { buttonText, children, heading, onClick } = props;

  return (
    <Wrapper>
      <Container>
        <Body>
          <h4>{heading}</h4>

          <Copy>{children}</Copy>
        </Body>

        <Button height='33px' onClick={onClick}>
          {buttonText}
        </Button>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  bottom: 3em;
  display: flex;
  justify-content: center;
  left: 0;
  padding-left: 200px;
  position: fixed;
  right: 0;
  z-index: 10;

  @media ${({ theme }) => theme.mediaQueries.desktop} {
    padding-left: 0;
  }
`;

const Container = styled.div`
  align-items: center;
  background: #fffdea;
  border-radius: 14px;
  border: 1px solid #eeecd4;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  max-width: 1138px;
  padding: 27px;
  width: 80%;
`;

const Body = styled.div`
  flex: 1 0 0%;
  min-width: auto;
  padding-right: 24px;
`;

const Copy = styled.p`
  color: #677882;
  font-size: 12px;
  line-height: 165%;
  margin-top: 5px;
`;
