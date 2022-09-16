import React from 'react';
import _ from 'lodash';
import { useObserver } from 'mobx-react-lite';
import { useQuery } from '@apollo/react-hooks';
import { useHistory, useParams } from 'react-router-dom';

import { adminDispensaries } from 'shared/graphql/dispensary/queries';
import { useStores } from 'src/hooks/use-stores';

export default function useLoadDispensary() {
  const { apolloClient, UI, User } = useStores();
  const history = useHistory();
  const { id } = useParams();
  const dispensaryId = useObserver(() => UI.dispensary?.id);

  const { data, error, networkStatus } = useQuery(adminDispensaries, {
    client: apolloClient,
    fetchPolicy: 'network-only',
    pollInterval: 30 * 1000,
    variables: {
      dispensaryFilter: {
        cNameOrID: id,
        includePending: true,
      },
    },
  });

  React.useEffect(() => {
    if (error) {
      console.error('Could not locate dispensary');
      console.error(error);
      history.replace('/redirect');
    }
  }, [error]);

  const dispensary = _.get(data, 'filteredDispensaries[0]', null);

  async function handleDispensaryDidLoad() {
    try {
      if ((User.isDispensaryUser || User.isChainAdmin) && window.delighted) {
        window.delighted.survey({
          email: User.email,
          name: User.fullName,
          createdAt: User.user.createdAt,
          properties: {
            company: dispensary.name,
            permissions: User.user.profile.permissions,
          },
        });
      }
    } catch (e) {
      console.error('Error booting Delighted.');
      console.error(e);
    }
  }

  React.useEffect(() => {
    if (dispensary) {
      UI.setDispensary(dispensary);
      handleDispensaryDidLoad();
    }
  }, [dispensary]);

  React.useEffect(() => {
    return () => {
      UI.unsetDispensary();
    };
  }, []);

  return { networkStatus, dispensaryId };
}
