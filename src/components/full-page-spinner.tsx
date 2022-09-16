import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { Flex } from 'rebass';

import { AppContainer } from 'src/components/app-container';

export function FullPageSpinner(): JSX.Element {
  return (
    <AppContainer>
      <Flex justifyContent='center' alignItems='center' style={{ height: '100vh' }}>
        <ClipLoader color='#61a58b' size={100} />
      </Flex>
    </AppContainer>
  );
}
