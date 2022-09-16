import React from 'react';
import styled from 'styled-components';
import { space, color, flexbox, typography, layout } from 'styled-system';
import { Text } from 'rebass/styled-components';

export const Checkbox = styled(({ register, inputId = 'checkbox', ...props }) => (
  <input id={inputId} type='checkbox' ref={register} {...props} />
))`
  margin: 0 8px 0 0;
  ${space}
  ${color}
`;

export const Label = styled.label`
  align-items: center;
  display: flex;
  font-size: 14px;
  margin-bottom: 4px;
  ${flexbox}
  ${typography}
  ${space}
  ${color}
`;

export const Truncate = styled(Text)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Hide = styled.div`
  ${layout}
`;
