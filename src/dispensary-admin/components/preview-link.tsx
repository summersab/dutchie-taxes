import React from 'react';
import styled from 'styled-components';

import { useDispensary } from 'src/hooks/use-dispensary';

export default function PreviewLink(): JSX.Element | null {
  const { id: dispensaryId } = useDispensary();

  if (!dispensaryId) {
    return null;
  }

  const previewLink = `/dispensaries/${dispensaryId}/preview`;

  return (
    <Container href={previewLink} target='_BLANK'>
      <Image src='/icons/expand.svg' />

      <Text>Preview Store</Text>
    </Container>
  );
}

const Container = styled.a`
  align-items: center;
  display: flex;
  margin-right: 25px;
`;

const Image = styled.img`
  display: inline-block;
  height: 30px;
  margin-right: 8px;
  width: 15px;
`;

const Text = styled.span`
  color: #9fa6ad;
  font-size: 13px;
`;
