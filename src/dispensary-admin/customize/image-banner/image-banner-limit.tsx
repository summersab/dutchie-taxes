import React from 'react';
import styled from 'styled-components';

export function ImageBannerLimit(): JSX.Element {
  return (
    <Container>
      <Body>
        <b>Content limit reached</b> - The image banner can only support a maximum of 6 images. Please remove a content
        piece to add another one.
      </Body>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background: #fffdea;
  padding: 12px 24px;
  color: #75725b;
  border: 1px solid #eeecd4;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const Body = styled.p`
  font-size: 11px;
  line-height: 1.2;

  & b {
    font-weight: 700;
  }
`;
