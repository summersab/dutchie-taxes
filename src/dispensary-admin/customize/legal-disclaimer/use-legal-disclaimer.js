import _ from 'lodash';
import useErnie from 'shared/hooks/use-ernie';
import { useStores } from 'src/hooks/use-stores';

export function useLegalDisclaimer() {
  const { UI } = useStores();
  const showErnie = useErnie();

  const disclaimerTextHtml = _.get(UI.dispensary, 'embedSettings.disclaimerTextHtml', '');

  const handleUpdateDispensary = (fieldName, value) => {
    UI.updateDispensaryProperty(fieldName, value);
    UI.unpublishedDispoChanges = true;
  };

  const handleChange = (html) => {
    handleUpdateDispensary('embedSettings.disclaimerTextHtml', html);
  };

  const handlePublishChanges = async () => {
    try {
      const success = await UI.saveDispensaryInfo();
      if (success) {
        showErnie('Your legal disclaimer has been updated', 'success');
      } else {
        showErnie('Something went wrong, please try again.', 'danger');
      }
    } catch (error) {
      showErnie('Something went wrong, please try again.', 'danger');
    }
  };

  const handleClickNo = async () => {
    await UI.fetchDispensary();
    UI.unpublishedDispoChanges = false;
  };

  return {
    disclaimerTextHtml,
    handleChange,
    handleClickNo,
    handlePublishChanges,
    unpublishedDispoChanges: UI.unpublishedDispoChanges,
  };
}
