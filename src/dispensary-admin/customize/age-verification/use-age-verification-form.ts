import { useForm, Control, UseFormMethods, SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import useErnie from 'shared/hooks/use-ernie';

import { useUpdateMenuCustomization, MenuCustomizationData } from '../data-access';
import { menuBannerColors, MenuBannerColor, Color } from '../helpers';

import { AgeVerificationFormProps } from './age-verification.types';

type FormValues = {
  ageVerificationBannerColor: Color<MenuBannerColor> | undefined;
  ageVerificationBannerHtml: string | null | undefined;
};

type HandlePublish = ReturnType<UseFormMethods<FormValues>['handleSubmit']>;

type UseMenuBannerFormReturn = {
  isDirty: boolean;
  control: Control<FormValues>;
  handlePublish: HandlePublish;
  handleReset: () => void;
};

function getDefaultValues(data: MenuCustomizationData): FormValues {
  const { ageVerificationBannerColor, ageVerificationBannerHtml } = data;

  return {
    ageVerificationBannerColor: menuBannerColors[ageVerificationBannerColor],
    ageVerificationBannerHtml,
  };
}

export function useAgeVerificationForm({ data }: AgeVerificationFormProps): UseMenuBannerFormReturn {
  const { id: dispensaryId } = useParams<{ id: string }>();

  const defaultValues = getDefaultValues(data);

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    control,
    formState: { isDirty },
    handleSubmit,
    reset,
  } = useForm<FormValues>({ defaultValues });

  const updateData = useUpdateMenuCustomization();

  const showErnie = useErnie();

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      await updateData({
        variables: {
          dispensaryId,
          ageVerificationBannerColor: values.ageVerificationBannerColor?.value,
          ageVerificationBannerHtml: values.ageVerificationBannerHtml,
        },
      });

      showErnie('Your age verification settings have been updated', 'success');
      reset({ ...values });
    } catch (err) {
      showErnie('Something went wrong, please try again.', 'danger');
      console.error(err);
    }
  };

  const handlePublish = handleSubmit(onSubmit);
  const handleReset = (): void => reset();

  return {
    control,
    handlePublish,
    handleReset,
    isDirty,
  };
}
