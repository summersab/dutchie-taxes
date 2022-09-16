import { useForm, Control, UseFormMethods, SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { LinkColor, NavBarColor } from 'types/graphql';

import useErnie from 'shared/hooks/use-ernie';

import { useUpdateWebCustomizationSettings, MenuCustomizationData } from '../data-access';
import { navigationBarColors, linkColors, Color } from '../helpers';
import { PreviewData } from '../components/preview';

import { fonts, FontOption } from './fonts-selector';
import { ColorsAndFontsFormProps } from './colors-and-fonts.types';

type FormValues = {
  navBarColor: Color<NavBarColor>;
  linkColor: Color<LinkColor>;
  font: FontOption;
};

type HandlePublish = ReturnType<UseFormMethods<FormValues>['handleSubmit']>;

type UseColorsAndFontsFormReturn = {
  isDirty: boolean;
  control: Control<FormValues>;
  handlePublish: HandlePublish;
  handleReset: () => void;
  previewData: PreviewData;
};

function useMergeDataWithFormValues(data: MenuCustomizationData, formValues: FormValues): PreviewData {
  return {
    ...data,
    colorSettings: {
      navBarColor: formValues.navBarColor.value,
      linkColor: formValues.linkColor.value,
    },
    fontSettings: {
      family: formValues.font.value,
    },
  };
}

export function useColorsAndFontsForm({ data }: ColorsAndFontsFormProps): UseColorsAndFontsFormReturn {
  const {
    colorSettings: { navBarColor, linkColor },
    fontSettings: { family },
  } = data;

  const defaultValues = {
    navBarColor: navigationBarColors[navBarColor],
    linkColor: linkColors[linkColor],
    font: fonts[family],
  };

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    control,
    formState: { isDirty },
    handleSubmit,
    reset,
    watch,
  } = useForm<FormValues>({ defaultValues });

  const { id: dispensaryId } = useParams<{ id: string }>();

  const showErnie = useErnie();

  const updateData = useUpdateWebCustomizationSettings();

  const onSubmit: SubmitHandler<FormValues> = async (submittedValues) => {
    const { navBarColor: nav, linkColor: link, font: fontOption } = submittedValues;

    try {
      await updateData({
        variables: {
          dispensaryId,
          input: {
            colorSettings: {
              navBarColor: nav.value,
              linkColor: link.value,
            },
            fontSettings: {
              family: fontOption.value,
            },
          },
        },
      });

      showErnie('Your font and colors have been updated', 'success');
      reset({ ...submittedValues });
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
