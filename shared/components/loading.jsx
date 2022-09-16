import React from 'react';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';
import { Flex } from 'rebass/styled-components';

export function FullPageLoader({ color = '#61a58b' }) {
  return (
    <Flex justifyContent='center' alignItems='center' style={{ height: '50vh', minHeight: '700px' }}>
      <ClipLoader color={color} size={100} />
    </Flex>
  );
}

/**
 * @type {JSX.Element}
 *
 */
export function SmallLoader({ spinnerSize = null, height = 60, width = null, color = '#61a58b', ...props }) {
  return (
    <Container height={height} width={width} {...props}>
      <ClipLoader color={color} size={spinnerSize || height} />
    </Container>
  );
}

const Container = styled(Flex)`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => `${height - 10}px`};
  display: flex;
  justify-content: center;
  align-items: center;
`;
