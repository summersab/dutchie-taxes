import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { DragHandle } from 'src/svg/drag-handle';
import { Remove } from 'src/svg/remove';

import { Container, ImageContainer, Image, LinkContainer, Controls } from './image-banner-list-item.styles';

type ImageBannerListItemProps = {
  _id: string;
  mobileImage: string;
  alt?: string | null;
  link?: string | null;
  index: number;
  onRemove: (index: number) => void;
};

export const TEST_ID_IMAGE_BANNER_ITEM = 'image-banner-item';
export const TEST_ID_IMAGE_BANNER_ITEM_REMOVE = 'image-banner-item-remove';

export function ImageBannerListItem({
  _id,
  mobileImage,
  alt,
  link,
  index,
  onRemove,
}: ImageBannerListItemProps): JSX.Element {
  return (
    <Draggable draggableId={_id} index={index}>
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef} data-testid={TEST_ID_IMAGE_BANNER_ITEM}>
          <ImageContainer>
            <Image src={`${mobileImage}?w=140&h=63`} htmlAttributes={{ alt }} />
          </ImageContainer>
          <LinkContainer>
            {link ? (
              <a href={link} target='_blank' rel='noreferrer'>
                View link
              </a>
            ) : (
              <span>No link included</span>
            )}
          </LinkContainer>
          <Controls>
            <div>
              <Remove onClick={() => onRemove(index)} data-testid={TEST_ID_IMAGE_BANNER_ITEM_REMOVE} data-remove />
            </div>
            <div {...provided.dragHandleProps}>
              <DragHandle />
            </div>
          </Controls>
        </Container>
      )}
    </Draggable>
  );
}
