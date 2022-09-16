import React from 'react';
import styled from 'styled-components';

import { Button } from 'shared/components';
import { useWhoops } from './use-whoops';
import { WhoopsProps } from './whoops.types';

export function WhoopsContent({ reason }: WhoopsProps): JSX.Element {
  const { topText, bottomText, buttonText, onButtonClick } = useWhoops(reason);
  return (
    <Container>
      <Image alt='' src='/icons/404-face.svg' />

      <TopText>{topText}</TopText>

      {bottomText && <BottomText>{bottomText}</BottomText>}

      <StyledButton onClick={onButtonClick}>{buttonText}</StyledButton>
    </Container>
  );
}

const Container = styled.div`
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 160px;
`;

const TopText = styled.p`
  margin-top: 35px;
  font-size: 18px;
  color: rgb(99, 118, 132);
  font-weight: bold;
  text-align: center;
`;

const BottomText = styled.p`
  margin-top: 10px;
  font-size: 13px;
  color: rgb(99, 118, 132);
  text-align: center;
  line-height: 20px;
`;

const StyledButton = styled(Button)`
  margin-top: 30px;
`;
