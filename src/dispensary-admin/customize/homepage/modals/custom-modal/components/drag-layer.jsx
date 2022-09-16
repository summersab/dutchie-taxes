import React from 'react';
import { useDragLayer } from 'react-dnd';
import { DraggableListItemPreview } from './draggable-list-item-preview';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 1000,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};
function getItemStyles(initialOffset, currentOffset) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }
  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}
export const DragLayer = (props) => {
  // eslint-disable-next-line arrow-body-style
  const { itemType, isDragging, item, initialOffset, currentOffset } = useDragLayer((monitor) => {
    return {
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    };
  });

  function renderItem() {
    switch (itemType) {
      case 'option':
        return (
          <DraggableListItemPreview
            primaryText={item.primaryText}
            secondaryText={item.secondaryText}
            draggableRef={item.draggableRef}
          />
        );
      default:
        return null;
    }
  }
  if (!isDragging) {
    return null;
  }
  return (
    <div style={layerStyles}>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      <div style={getItemStyles(initialOffset, currentOffset, props.snapToGrid)}>{renderItem()}</div>
    </div>
  );
};
