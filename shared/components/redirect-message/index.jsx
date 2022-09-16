import React from 'react';
import styled from 'styled-components';

import { Button } from 'shared/components';

export default function RedirectMessage(props) {
  const { body, buttonText: buttonTextFromProps, heading, image, onClick } = props;

  const buttonText = buttonTextFromProps || 'Click here';

  return (
    <Container>
      {image && (
        <ImageContainer>
          <Image src={image} />
        </ImageContainer>
      )}

      <Heading>{heading}</Heading>

      {body && <Body>{body}</Body>}

      {onClick && (
        <ButtonContainer>
          <StyledButton onClick={onClick}>{buttonText}</StyledButton>
        </ButtonContainer>
      )}
    </Container>
  );
}
const Container = styled.div`
  background: #ffffff;
  border-radius: 28px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.139205);
  margin: 100px auto 0;
  max-width: 100%;
  padding: 43px 80px;
  text-align: center;
  width: 538px;
`;

const ImageContainer = styled.div`
  padding-bottom: 29px;
`;

const Image = styled.img``;

const Heading = styled.h2`
  color: #393d40;
  font-size: 26px;
  font-weight: bold;
  line-height: 120%;
  padding-bottom: 15px;
`;

const Body = styled.div`
  color: #393d40;
  font-size: 13px;
  line-height: 165%;
`;

const StyledButton = styled(Button)`
  display: inline-block;
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  text-align: center;
`;
