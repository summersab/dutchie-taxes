import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

import PublicEnv from 'shared/utils/public-env';
import { BackToAdmin } from 'src/assets/back-to-admin';

export default function DispensaryMenuPreview() {
  const { id: dispensaryId } = useParams();
  const renderTarget = useRef();

  useEffect(() => {
    if (!dispensaryId || !renderTarget.current) {
      return undefined;
    }
    // we create the script tag this way so it's guarenteed to load and render
    // putting it in jsx is inconsistent because of the dom patching vs element creation
    const script = document.createElement(`script`);
    const query = '?previewMode=1'; // dispensary.chain?.length ? '?chainLocations=true' : '';
    script.src = `${PublicEnv.apiUrl}/api/v3/embedded-menu/${dispensaryId}.js${query}`;
    script.async = true;
    script.id = `dutchie--embed__script`;
    renderTarget.current.appendChild(script);
    const currentFrameHolder = renderTarget.current;

    // this basically only happens when we hot-reload but it's really nice for that
    return () => {
      const { children } = currentFrameHolder;
      while (children.length > 0) {
        currentFrameHolder.removeChild(children[0]);
      }
    };
  }, [dispensaryId, renderTarget]);

  return (
    <Container>
      <Header>
        <span>New menu preview</span>
        <Separator />
        <span>
          <StyledLink to={`/dispensaries/${dispensaryId}`}>
            <StyledBackToAdmin />
            Back to admin
          </StyledLink>
        </span>
      </Header>
      <div ref={renderTarget} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.v2PrimaryGreen};
  color: white;
  height: 73px;
  padding: 0 30px 0 40px;
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;
`;

const Separator = styled.div`
  flex-grow: 1;
`;

const StyledBackToAdmin = styled(BackToAdmin)`
  margin-right: 16px;
`;

const StyledLink = styled(Link)`
  &,
  &:hover,
  &:active {
    color: white;
  }
`;
