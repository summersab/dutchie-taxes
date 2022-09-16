import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import { ImageBannerListItem } from './image-banner-list-item';
import type { ImageBanners } from '../image-banner.types';

type ImageBannerListProps = {
  imageBanners: ImageBanners;
  removeBanner: (index: number) => void;
  onDragEnd: (result: DropResult) => void;
};

export function ImageBannerList({ imageBanners, removeBanner, onDragEnd }: ImageBannerListProps): JSX.Element {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='slider-banners' type='slider-banner'>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} style={{ width: '100%' }}>
            {imageBanners.map((banner, index) => (
              <ImageBannerListItem {...banner} key={banner._id} index={index} onRemove={removeBanner} />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
