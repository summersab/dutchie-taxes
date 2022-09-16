import React, { useEffect } from 'react';
import styled from 'styled-components';
import { mediaQueries } from 'shared/styles';
import { useRouteMatch } from 'react-router-dom';
import { useLazyQuery } from '@apollo/react-hooks';
import useApolloClient from 'shared/hooks/use-apollo-client';

import { SmallLoader } from 'shared/components';
import { Wrapper } from '../../components/wrapper';
import { Headline } from '../../components/headline';
import { Copy } from '../../components/copy';
import urlQuery from './png-url-query.gql';

export function ThankYouSection() {
  const routeMatch = useRouteMatch('/dispensaries/:dispensaryId');
  const apolloClient = useApolloClient();

  const [getUrl, { called, loading, data }] = useLazyQuery(urlQuery, {
    client: apolloClient,
    variables: { dispensaryId: routeMatch.params.dispensaryId },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (called && !loading && data) {
      const url = data?.yearInReviewQuery?.pngUrl;
      window.location.href = url;
      // const link = document.createElement('a');
      // link.target = '_blank';
      // link.href = url;
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
    }
  }, [called, loading, data]);

  return (
    <ThankYouSectionStyles>
      <Container>
        <Headline>Thank you!</Headline>
        <StyledCopy>
          We thank you for being with us this past year and look forward to more great things to come in 2022!
        </StyledCopy>
        <ShareText>share this with your friends</ShareText>
        <DownloadButton onClick={getUrl} role='button' tabindex='0'>
          {!loading && <DownloadText>download this page</DownloadText>}
          {loading && <SmallLoader height={40} color='#FFFFFF' />}
        </DownloadButton>
      </Container>
    </ThankYouSectionStyles>
  );
}

const ThankYouSectionStyles = styled(Wrapper)`
  margin-bottom: 150px;
`;

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${Headline} {
    font-size: 60px;

    @media ${mediaQueries.largeDesktop} {
      font-size: 54px;
    }

    @media ${mediaQueries.largeTablet} {
      font-size: 45px;
    }

    @media ${mediaQueries.largePhone} {
      font-size: 30px;
    }
  }
`;

const StyledCopy = styled(Copy)`
  font-size: 25px;
  line-height: 37px;
  text-align: center;

  @media ${mediaQueries.largePhone} {
    /* max-width: 280px; */
  }

  @media ${mediaQueries.largeDesktop} {
    font-size: 23px;
    line-height: 36px;
  }

  @media ${mediaQueries.largeTablet} {
    font-size: 21px;
  }

  @media ${mediaQueries.largePhone} {
    font-size: 20px;
  }
`;

const ShareText = styled.span`
  color: #454e50;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 700;
  margin-top: 50px;
`;

const DownloadButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin-top: 35px;
  background-color: #936bbe;
  cursor: pointer;
  width: 307px;
  height: 86px;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.17);

  -webkit-print-color-adjust: exact;
  -webkit-filter: opacity(1);

  @media ${mediaQueries.largePhone} {
    height: 70px;
    margin-top: 20px;
  }
`;

const DownloadText = styled.p`
  color: white;
  text-transform: uppercase;
  font-size: 17px;
  font-weight: 700;
`;
