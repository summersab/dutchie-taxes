import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import RedirectMessage from 'shared/components/redirect-message';
import { useStores } from 'src/hooks/use-stores';
import useErnie from 'shared/hooks/use-ernie';
import getExport from 'src/routes/export-redirect/get-export.gql';
import { GqlGetExportQuery, GqlGetExportQueryVariables } from 'types/graphql';

export default function ExportRedirect(): JSX.Element {
  const { exportId } = useParams<{ exportId?: string }>();
  const history = useHistory();
  const { apolloClient } = useStores();
  const showErnie = useErnie();

  async function handleClick(): Promise<void> {
    try {
      if (!exportId) {
        throw new Error('exportId is undefined');
      }

      const response = await apolloClient.query<GqlGetExportQuery, GqlGetExportQueryVariables>({
        query: getExport,
        variables: {
          id: exportId,
        },
      });

      const { url } = response.data.getExport;

      window.location.href = url;
      history.push('/redirect');
    } catch (error) {
      console.error(error);
      showErnie("We couldn't download your export. Please try again.", 'danger');
    }
  }

  return (
    <RedirectMessage
      buttonText='Click here to download the export'
      heading='Your export is ready to download.'
      onClick={handleClick}
    />
  );
}
