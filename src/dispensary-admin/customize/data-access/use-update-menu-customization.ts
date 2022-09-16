import { useParams } from 'react-router-dom';

import {
  GetMenuCustomizationDocument,
  useUpdateMenuCustomizationMutation,
  UpdateMenuCustomizationMutationHookResult,
} from 'types/graphql';

import { useStores } from 'src/hooks/use-stores';

export function useUpdateMenuCustomization(): UpdateMenuCustomizationMutationHookResult[0] {
  const { id: dispensaryId } = useParams<{ id: string }>();
  const { apolloClient } = useStores();

  const [handleUpdate] = useUpdateMenuCustomizationMutation({
    client: apolloClient,
    refetchQueries: [
      {
        query: GetMenuCustomizationDocument,
        variables: {
          dispensaryId,
        },
      },
    ],
  });

  return handleUpdate;
}
