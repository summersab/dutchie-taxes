import React, { forwardRef } from 'react';
import styled from 'styled-components';

const Clickable = forwardRef((/** @type { HTMLAttributes<HTMLButtonElement> } */ props, ref) => (
  <StyledButton {...props} ref={ref} />
));

export default Clickable;

const StyledButton = styled.button`
  // override default button styles
  appearance: none;
  border: none;
  padding: 0;
  background-color: transparent;

  cursor: ${({ disabled }) => (disabled ? `default` : `pointer`)};
`;
