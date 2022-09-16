import styled from 'styled-components';
import { space } from 'styled-system';

export const Page = styled.div`
  flex: 1 0 0%;
  min-height: 0;
  padding: 40px 55px;
  position: relative;
  width: 100%;
  ${space}
`;

export const Title = styled.h1`
  color: #454e50;
  font-size: 18px;
  font-weight: bold;
  line-height: 20px;
  margin-bottom: 11px;
`;

export const Detail = styled.div`
  color: #4f5d68;
  font-size: 13px;
  line-height: 21px;
  max-width: 510px;
  padding-bottom: 25px;
  width: 100%;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;
