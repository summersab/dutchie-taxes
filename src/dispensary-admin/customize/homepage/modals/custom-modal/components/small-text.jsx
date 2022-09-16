import styled from 'styled-components';

export const SmallText = styled.span`
  display: block;
  font-size: 11px;
  font-weight: bold;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.grey[45]};
  padding-bottom: 10px;
`;
