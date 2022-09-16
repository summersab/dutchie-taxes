import React from 'react';
import styled from 'styled-components';
import { Image } from 'rebass/styled-components';
import {
  width as styledWidth,
  height as styledHeight,
  margin as styledMargin,
  display as styledDisplay,
} from 'styled-system';

export default ({
  display = 'block',
  height = '15px',
  width = '15px',
  src = '/icons/question-mark.svg',
  margin,
  color,
  ...props
}) => (
  <Icon
    height={height}
    width={width}
    margin={margin}
    src={color === 'grey' ? '/icons/question-mark-grey.svg' : src}
    display={display}
    {...props}
  />
);

const Icon = styled(({ ...props }) => <Image {...props} />)`
  margin-left: 7px;
  ${styledHeight}
  ${styledWidth}
  ${styledMargin}
  ${styledDisplay}
`;
