import React, { useRef, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { ListItem } from './list-item';

export function DraggableListItem(props) {
  const { primaryText = '', secondaryText = '', index, onMove, onRemove } = props;

  const ref = useRef(null);

  function handleWhenToMoveOptions(item, monitor) {
    if (!ref.current) {
      return;
    }
    const dragIndex = item.index;
    const hoverIndex = index;
    if (dragIndex === hoverIndex) {
      return;
    }
    const hoverBoundingRect = ref.current?.getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    onMove(dragIndex, hoverIndex);
    item.index = hoverIndex;
  }

  const [, drop] = useDrop({
    accept: 'option',
    hover: (item, monitor) => handleWhenToMoveOptions(item, monitor),
  });

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: 'option', id: primaryText, index, primaryText, secondaryText, draggableRef: ref },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  drag(drop(ref));

  return (
    <ListItem
      ref={ref}
      isDragging={isDragging}
      primaryText={primaryText}
      secondaryText={secondaryText}
      onRemove={onRemove}
    />
  );
}
