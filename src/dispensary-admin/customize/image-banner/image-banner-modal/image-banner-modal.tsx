import React from 'react';

import { ModalContainer, ModalPrimaryHeader } from 'shared/modals';
import { SmallLoader } from 'shared/components/loading';
import { validateURL, validateAlt } from './image-banner-modal.helper';
import { useImageBannerModal } from './use-image-banner-modal';
import {
  Content,
  LeftColumn,
  RightColumn,
  Block,
  ImageBlock,
  Title,
  Body,
  HiddenInput,
  FileSelect,
  InputContainer,
  Input,
  ValidateCheckIcon,
  PlaceHolderBanner,
  MobilePlaceHolderBanner,
  StyledButton,
  DesktopBannerImage,
  MobileBannerImage,
} from './image-banner-modal.styles';
import { ImageBanner } from '../image-banner.types';

type ImageBannerModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  addBanner: (banner: ImageBanner) => void;
};

export const TEST_ID_IMAGE_BANNER_MODAL = 'image-banner-modal';

export function ImageBannerModal({ onClose, isOpen, addBanner }: ImageBannerModalProps): JSX.Element {
  const {
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
  } = useImageBannerModal({ onClose, addBanner });

  return (
    <ModalContainer
      isOpen={isOpen}
      onRequestClose={handleClose}
      width='930px'
      fancy
      alignItems='flex-start'
      pt='90px'
      ariaHideApp={false}
    >
      <ModalPrimaryHeader copy='Add an Image Banner' close={handleClose} />
      <Content data-testid={TEST_ID_IMAGE_BANNER_MODAL}>
        <LeftColumn>
          <ImageBlock>
            <Title>Desktop Image</Title>
            <Body>Uploaded images should be 2400px (width) 800px (height), and in JPEG or PNG formats.</Body>
            <HiddenInput
              id='image-banner-file-input'
              type='file'
              name='image-banner'
              accept='image/png, image/jpeg'
              onChange={(e) => {
                handleFile(e);
                e.target.value = '';
              }}
              disabled={isUploadingImage || isUploadingMobileImage}
            />
            <FileSelect htmlFor='image-banner-file-input'>
              {isUploadingImage ? <SmallLoader height={20} color='#0b99e6' /> : 'SELECT FILE'}
            </FileSelect>
          </ImageBlock>

          <ImageBlock>
            <Title>Mobile image</Title>
            <Body>Uploaded images should be 800px (width) 360px (height), and in JPEG or PNG formats.</Body>
            <HiddenInput
              id='mobile-image-banner-file-input'
              type='file'
              name='mobile-image-banner'
              accept='image/png, image/jpeg'
              onChange={(e) => {
                handleFile(e);
                e.target.value = '';
              }}
              disabled={isUploadingImage || isUploadingMobileImage}
            />
            <FileSelect htmlFor='mobile-image-banner-file-input'>
              {isUploadingMobileImage ? <SmallLoader height={20} color='#0b99e6' /> : 'SELECT FILE'}
            </FileSelect>
          </ImageBlock>

          <Block>
            <Title>Link</Title>
            <Body>Add a link to your image. When your image is clicked, a customer will be directed to this link.</Body>
            <InputContainer>
              <Input type='url' value={link} onChange={handleSetLink} />
              <ValidateCheckIcon valid={validateURL(link) ? 1 : 0} />
            </InputContainer>
          </Block>

          <Block>
            <Title>Image Alt Text</Title>
            <Body>Describe your image to improve accessibility and SEO.</Body>
            <InputContainer>
              <Input type='text' value={alt} onChange={handleSetAlt} />
              <ValidateCheckIcon valid={validateAlt(alt) ? 1 : 0} />
            </InputContainer>
          </Block>
        </LeftColumn>
        <RightColumn>
          {image ? (
            <DesktopBannerImage src={`${image}?w=600&h=200`} htmlAttributes={{ alt }} />
          ) : (
            <PlaceHolderBanner>Desktop image preview will show here.</PlaceHolderBanner>
          )}
          {mobileImage ? (
            <MobileBannerImage src={`${mobileImage}?w=400&h=180`} htmlAttributes={{ alt }} />
          ) : (
            <MobilePlaceHolderBanner>Mobile image preview will show here.</MobilePlaceHolderBanner>
          )}
        </RightColumn>
      </Content>
      <StyledButton
        onClick={handleSave}
        disabled={
          isUploadingImage || isUploadingMobileImage || !image || !mobileImage || !(validateURL(link) || link === '')
        }
      >
        SAVE
      </StyledButton>
    </ModalContainer>
  );
}
