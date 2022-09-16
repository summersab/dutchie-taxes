import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

import useErnie from 'shared/hooks/use-ernie';
import { CopyIcon } from 'src/svg/copy-icon';

type ScriptBoxProps = {
  script: string;
  placeholderText: ReactNode;
  displayScript?: boolean;
};

export function ScriptBox({ script, placeholderText, displayScript = true }: ScriptBoxProps): JSX.Element {
  const showErnie = useErnie();

  // The element.select() method only exists on inputs
  // So we create an input element, give that the text, select & copy
  const copyToClipboard = (): void => {
    const elem = document.createElement('textarea');
    document.body.appendChild(elem);
    elem.value = script;
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
    showErnie('This script has been successfully copied to your clipboard!', 'success');
  };

  return (
    <Container showPlaceholderText={!displayScript}>
      {displayScript && (
        <React.Fragment>
          <ScriptText>{script}</ScriptText>
          <CopyScriptLink onClick={copyToClipboard}>
            <CopyIcon /> Copy Script
          </CopyScriptLink>
        </React.Fragment>
      )}
      {!displayScript && <PlaceholderText>{placeholderText}</PlaceholderText>}
    </Container>
  );
}

const Container = styled.div<{ showPlaceholderText: boolean }>`
  padding: 15px 23px 17px;
  background-color: #f3f6f8;
  max-width: 503px;
  border-radius: 3px;
  font-size: 13px;
  ${({ showPlaceholderText }) =>
    showPlaceholderText &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 123px;
    `}
`;

const PlaceholderText = styled.p`
  font-size: 13px;
  color: #969ea5;
`;

const ScriptText = styled.p`
  color: #7c7f83;
  line-height: 18px;
  overflow-wrap: break-word;
`;

const CopyScriptLink = styled.a`
  color: #677882;
  font-weight: bold;
  margin-top: 14px;
  display: inline-flex;
  align-items: center;
  svg {
    margin: 2px 6px 0 0;
  }
  :hover {
    cursor: pointer;
    color: #454e50;
    svg path {
      fill: #454e50;
    }
  }
`;
