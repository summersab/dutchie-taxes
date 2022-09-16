import React, { useMemo } from 'react';
import styled from 'styled-components';

import { ListItem } from './list-item';

export function DraggableListItemPreview(props) {
  const { draggableRef, primaryText, secondaryText } = props;

  const { width } = useMemo(() => draggableRef?.current?.getBoundingClientRect() || {}, [draggableRef]);

  return <StyledListItem width={width} primaryText={primaryText} secondaryText={secondaryText} />;
}

const StyledListItem = styled(ListItem)`
  opacity: 0.75;
  width: ${(props) => (props.width ? `${props.width}px` : 'unset')};
`;
