import React from 'react';
import styled from 'styled-components';
import { ModalSecondaryHeader, ModalCopy } from 'shared/modals';

import { BrowserIcon } from './browser-icon';

export function Instructions() {
  return (
    <InstructionsStyles>
      <IconContainer>
        <BrowserIcon />
      </IconContainer>
      <Headline lowercase mt='10px' mb='10px'>
        You have no products selected
      </Headline>
      <ModalCopy mb='24px'>
        Use the search on the left to add
        <br />
        products to this section
      </ModalCopy>
    </InstructionsStyles>
  );
}

const InstructionsStyles = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 50px 0;
`;

const IconContainer = styled.div`
  margin-bottom: 20px;
`;

const Headline = styled(ModalSecondaryHeader)`
  color: #5e6d79;
`;
