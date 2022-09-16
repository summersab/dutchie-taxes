import styled from 'styled-components';
import React from 'react';

import { Button } from 'shared/components';

export function PublishBanner(props) {
  const { onPublish } = props;
  const [loading, setLoading] = React.useState(false);

  async function handlePublish() {
    setLoading(true);
    await onPublish();
    setLoading(false);
  }

  return (
    <Container>
      <Description>
        <Heading>We've noticed you've made some changes!</Heading>
        <Subheading>To publish these changes and display them to customers on dutchie, click "publish".</Subheading>
      </Description>

      <ButtonContainer>
        <Button loading={loading} onClick={handlePublish}>
          Publish
        </Button>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  align-items: center;
  background: #fffbd6;
  border-radius: 0 0 9px 0;
  border-width: 1px 1px 0 0;
  border: 1px solid #d4cc99;
  display: flex;
  flex: 0 0 95px;
  justify-content: space-between;
  margin: -1px;
  min-width: 100%;
  padding: 25px 30px;
  position: sticky;
  bottom: 0;
`;

const Description = styled.div`
  flex: 1 0 0%;
  min-width: 0;
`;

const ButtonContainer = styled.div`
  flex: 0 0 auto;
  min-width: 0;
`;

const Heading = styled.div`
  color: #767359;
  font-size: 16px;
  font-weight: bold;
  line-height: 19px;
  margin-bottom: 4px;
`;

const Subheading = styled.div`
  color: #4f5d68;
  font-size: 12px;
  line-height: 20px;
`;
