import styled from 'styled-components';
import { maxWidth, lineHeight, textAlign, alignSelf, fontSize, space } from 'styled-system';

export default styled.p`
  color: #6d747b;
  font-size: 13px;
  line-height: 23.25px;
  margin-bottom: 12px;
  ${maxWidth}
  ${lineHeight}
  ${textAlign}
  ${alignSelf}
  ${fontSize}
  ${space}
  b {
    font-weight: bolder;
  }
`;
