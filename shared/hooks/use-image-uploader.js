import useStores from 'shared/hooks/use-stores';
import useErnie from 'shared/hooks/use-ernie';
import { readFile } from 'shared/helpers/utils';
import { uploadImage as uploadImageMutation } from 'shared/graphql/misc/mutations';

export default function useImageUploader() {
  const showErnie = useErnie();
  const { apolloClient } = useStores();

  async function uploadImage(file) {
    const readFileEvent = await readFile(file);
    try {
      const response = await apolloClient.mutate({
        mutation: uploadImageMutation,
        variables: { input: { image: readFileEvent.target.result } },
      });

      if (response.data.uploadImage.url) {
        return response.data.uploadImage.url;
      }
    } catch (e) {
      showErnie('Error uploading photo. Please try again.', 'danger');
      console.error(e);
    }
    return null;
  }

  return uploadImage;
}
