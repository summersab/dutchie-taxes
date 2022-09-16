import { useQuery } from '@apollo/react-hooks';
import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';

import { useStores } from 'src/hooks/use-stores';
import ScoreText from 'src/dispensary-admin/menu/score-text';
import contentStatisticsQuery from '../queries/content-statistics.gql';

export default function ContentStatistics() {
  const { apolloClient } = useStores();

  const { data, loading } = useQuery(contentStatisticsQuery, {
    client: apolloClient,
  });

  const connectedPercentage = data?.contentStatistics?.connectedPercentage;
  const menuScore = data?.contentStatistics?.menuScore;

  if (loading) {
    return null;
  }

  return (
    <Container>
      Overall Score:&nbsp;
      <ScoreText score={menuScore} />
      &nbsp;&nbsp;|&nbsp;&nbsp;Overall Connected:&nbsp;<b>{connectedPercentage}%</b>
    </Container>
  );
}

const Container = styled.div`
  color: #6d747b;
  display: flex;
  font-size: 13px;
  padding: 0 25px;
`;
