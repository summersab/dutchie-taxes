import { useState, ChangeEvent } from 'react';
import uuid from 'uuid';
import { uploadImage } from 'shared/graphql/misc/mutations';
import { useStores } from 'src/hooks/use-stores';
import { readFile, imageFileSize } from './image-banner-modal.helper';
import { ImageBanner } from '../image-banner.types';

type UseImageBannerModalProps = {
  onClose: () => void;
  addBanner: (banner: ImageBanner) => void;
};

type UseImageBannerModalReturn = {
  alt: string;
  link: string;
  isUploadingImage: boolean;
  isUploadingMobileImage: boolean;
  image: string;
  mobileImage: string;
  handleSetAlt: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSetLink: (event: ChangeEvent<HTMLInputElement>) => void;
  handleFile: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
  handleClose: () => void;
};

export function useImageBannerModal({ onClose, addBanner }: UseImageBannerModalProps): UseImageBannerModalReturn {
  const { apolloClient, UI } = useStores();

  const [alt, setAlt] = useState('');
  const [link, setLink] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingMobileImage, setIsUploadingMobileImage] = useState(false);
  const [image, setImage] = useState('');
  const [mobileImage, setMobileImage] = useState('');

  function handleSetAlt(e: ChangeEvent<HTMLInputElement>): void {
    setAlt(e.target.value);
  }

  function handleSetLink(e: ChangeEvent<HTMLInputElement>): void {
    setLink(e.target.value);
  }

  function setImageUploading(inputName: string, value: boolean | string): void {
    if (inputName === 'mobile-image-banner' && typeof value === 'boolean') {
      setIsUploadingMobileImage(value);
    } else if (inputName === 'mobile-image-banner' && typeof value === 'string') {
      setMobileImage(value);
    } else if (inputName === 'image-banner' && typeof value === 'boolean') {
      setIsUploadingImage(value);
    } else if (inputName === 'image-banner' && typeof value === 'string') {
      setImage(value);
    }
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>): void {
    const bannerIamge = e.currentTarget.files;
    const inputName = e.currentTarget.name;
    const regex = /.(jpg|jpeg|png)$/i;
    if (!bannerIamge || !regex.test(bannerIamge[0].name)) {
      return;
    }

    setImageUploading(inputName, true);
    readFile(bannerIamge[0], async (readFileEvent) => {
      const approxFileSizeInMbs = imageFileSize(readFileEvent);
      if (approxFileSizeInMbs >= 20) {
        UI.showErnie(
          'The image you are uploading is too large. Please try again with a photo size less than 20MB.',
          'danger'
        );

        setImageUploading(inputName, false);
        return;
      }

      let newUrl;
      try {
        if (!readFileEvent.target) {
          return;
        }

        const response = await apolloClient.mutate({
          mutation: uploadImage,
          variables: { input: { image: readFileEvent.target.result } },
        });

        if (response.data.uploadImage.url) {
          newUrl = response.data.uploadImage.url;
        }
      } catch (error) {
        UI.showErnie('Error uploading photo. Please try again.', 'danger');
        console.error(error);
        setImageUploading(inputName, false);
        return;
      }

      setImageUploading(inputName, newUrl);
      setImageUploading(inputName, false);
    });
  }

  function handleSave(): void {
    const newImageBanner = {
      _id: uuid.v4(),
      image,
      mobileImage,
      alt,
      link,
      position: 0,
    };

    addBanner(newImageBanner);
    handleClose();
  }

  function handleClose(): void {
    setAlt('');
    setLink('');
    setIsUploadingImage(false);
    setIsUploadingMobileImage(false);
    setImage('');
    setMobileImage('');
    onClose();
  }

  return {
    alt,
    link,
    isUploadingImage,
    isUploadingMobileImage,
    image,
    mobileImage,
    handleSetAlt,
    handleSetLink,
    handleFile,
    handleSave,
    handleClose,
  };
}
