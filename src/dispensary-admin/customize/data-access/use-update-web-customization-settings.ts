import { useParams } from 'react-router-dom';

import {
  GetMenuCustomizationDocument,
  useUpdateWebCustomizationSettingsMutation,
  UpdateWebCustomizationSettingsMutationHookResult,
} from 'types/graphql';

import { useStores } from 'src/hooks/use-stores';

export function useUpdateWebCustomizationSettings(): UpdateWebCustomizationSettingsMutationHookResult[0] {
  const { id: dispensaryId } = useParams<{ id: string }>();
  const { apolloClient } = useStores();

  const [handleUpdate] = useUpdateWebCustomizationSettingsMutation({
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
