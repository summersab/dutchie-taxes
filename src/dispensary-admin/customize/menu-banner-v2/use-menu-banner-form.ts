import { useForm, Control, UseFormMethods, SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import useErnie from 'shared/hooks/use-ernie';

import { PreviewData } from '../components/preview';
import { useUpdateMenuCustomization, MenuCustomizationData } from '../data-access';
import { menuBannerColors, MenuBannerColor, Color } from '../helpers';

import { MenuBannerFormProps } from './menu-banner.types';

type FormValues = {
  menuBannerColor: Color<MenuBannerColor>;
  menuBannerHtml: string | null;
};

type HandlePublish = ReturnType<UseFormMethods<FormValues>['handleSubmit']>;

type UseMenuBannerFormReturn = {
  isDirty: boolean;
  control: Control<FormValues>;
  handlePublish: HandlePublish;
  handleReset: () => void;
  previewData: PreviewData;
};

function getDefaultValues(data: MenuCustomizationData): FormValues {
  const { menuBannerColor, menuBannerHtml } = data;

  return {
    menuBannerColor: menuBannerColors[menuBannerColor],
    menuBannerHtml,
  };
}

function useMergeDataWithFormValues(data: MenuCustomizationData, formValues: FormValues): PreviewData {
  return {
    ...data,
    menuBannerColor: formValues.menuBannerColor.value,
    menuBannerHtml: formValues.menuBannerHtml,
  };
}

export function useMenuBannerForm({ data }: MenuBannerFormProps): UseMenuBannerFormReturn {
  const { id: dispensaryId } = useParams<{ id: string }>();

  const defaultValues = getDefaultValues(data);

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    control,
    formState: { isDirty },
    handleSubmit,
    reset,
    watch,
  } = useForm<FormValues>({ defaultValues });

  const updateData = useUpdateMenuCustomization();

  const showErnie = useErnie();

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      await updateData({
        variables: {
          dispensaryId,
          menuBannerColor: values.menuBannerColor.value,
          menuBannerHtml: values.menuBannerHtml,
        },
      });

      showErnie('Your text banner settings have been updated', 'success');
      reset({ ...values });
    } catch (err) {
      showErnie('Something went wrong, please try again.', 'danger');
      console.error(err);
    }
  };

  const handlePublish = handleSubmit(onSubmit);
  const handleReset = (): void => reset();
  const formValues = watch();

  const previewData = useMergeDataWithFormValues(data, formValues);

  return {
    control,
    handlePublish,
    handleReset,
    isDirty,
    previewData,
  };
}
