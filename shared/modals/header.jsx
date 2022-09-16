import styled from 'styled-components';
import { fontSize } from 'styled-system';

/**
 * @typedef {import('styled-system').FontSizeProps} FontSizeProps
 */

const StyledHeader =
  /** @type {import('styled-components').ThemeStyledFunction<'h2', FontSizeProps>} */
  (styled.h2)`
  color: #46494c;
  font-size: 15px;
  font-weight: bold;
  line-height: 1;
  margin-bottom: ${(props) => (props.mb ? props.mb : '21px')};
  text-transform: ${(props) => (props.lowercase ? 'none' : 'uppercase')};
  ${fontSize};
`;

export default StyledHeader;
