import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styled from 'styled-components';

import useHover from 'shared/hooks/use-hover';

import { DragImage } from './drag-image';
import { RemoveButton } from './remove-button';

export function DraggableOption(props) {
  const { dragging, index, menuSection, onDrop, onMove, onRemove, onEdit, title } = props;
  const { count, id, sectionType } = menuSection;
  const [hoverRef, isHovered] = useHover();
  const ref = useRef(null);
  const disabled = count <= 0;

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
    drop: (_item, _monitor) => onDrop(),
    hover: (item, monitor) => handleWhenToMoveOptions(item, monitor),
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'option', id, index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });
  drag(drop(ref));

  function handleClickRemove() {
    onRemove(id);
  }

  function handleEditClick() {
    onEdit(id, sectionType);
  }

  return (
    <DraggableOptionStyles disabled={disabled} isDragging={isDragging} ref={ref}>
      <HoverContainer ref={hoverRef}>
        <Text>
          <Title disabled={disabled}>
            <b>{title}</b>
          </Title>

          <Separator>|</Separator>

          <Subtitle disabled={disabled}>
            {count} {sectionType === `OFFERS` ? `offers` : `products`}
            {count === 15 && ` (max)`}
          </Subtitle>

          {sectionType === 'CUSTOM' && <EditButton onClick={handleEditClick}>Edit</EditButton>}
        </Text>

        <ButtonContainer>
          <RemoveButton
            data-cy={`remove-${sectionType}`}
            data-test={`remove-${sectionType}`}
            onClick={handleClickRemove}
            visible={isHovered && !dragging}
          />
        </ButtonContainer>
      </HoverContainer>

      <DragImage disabled={disabled} />
    </DraggableOptionStyles>
  );
}

const DraggableOptionStyles = styled.div`
  align-items: center;
  background: ${({ disabled }) => (disabled ? '#F3F6F8' : '#FFFFFF')};
  border-radius: 6px;
  border: 1px solid #d3d8de;
  box-shadow: ${({ disabled }) => (disabled ? 'none' : '0px 3px 5px #E9ECF1')};
  display: flex;
  height: 53px;
  justify-content: space-between;
  margin-bottom: 19px;
  opacity: ${(props) => (props.isDragging ? 0 : 1)};
  padding-right: 21px;
  width: 100%;
`;

const HoverContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
  padding-left: 25px;
  width: 100%;
`;

const Text = styled.div`
  align-items: center;
  display: flex;
  flex: 1 0 0%;
  min-width: 0;
`;

const Title = styled.div`
  color: ${({ disabled }) => (disabled ? '#969EA5' : '#677882')};
  font-size: 13px;
  line-height: 15px;

  b {
    font-weight: bold;
    color: ${({ disabled }) => (disabled ? '#969EA5' : '#4F5D68')};
  }
`;

const Separator = styled.div`
  margin: 0 12px;
`;

const Subtitle = styled.div`
  color: ${({ disabled }) => (disabled ? '#969EA5' : '#677882')};
`;

const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const EditButton = styled.button`
  appearance: none;
  border: none;
  padding: 0;
  margin-left: 10px;
  font-size: 13px;
  line-height: 15px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primaryBlue};
  cursor: pointer;
`;
