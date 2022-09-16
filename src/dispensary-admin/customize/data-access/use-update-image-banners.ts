import { useParams } from 'react-router-dom';

import {
  GetMenuCustomizationDocument,
  useUpdateImageBannersMutation,
  UpdateImageBannersMutationHookResult,
} from 'types/graphql';

import { useStores } from 'src/hooks/use-stores';

export function useUpdateImageBanners(): UpdateImageBannersMutationHookResult[0] {
  const { id: dispensaryId } = useParams<{ id: string }>();
  const { apolloClient } = useStores();

  const [handleUpdate] = useUpdateImageBannersMutation({
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
