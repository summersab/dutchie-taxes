import styled from 'styled-components';
import Imgix from 'shared/components/imgix';

export const Container = styled.div`
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 3px 5px #e9ecf1;
  display: flex;
  padding: 16px;
  background: #ffffff;
  margin-bottom: 16px;
  border: 1px solid #d3d8de;

  [data-remove] {
    opacity: 0;
    transition: 0.15s opacity;
    visibility: hidden;
  }

  &:hover [data-remove] {
    cursor: pointer;
    opacity: 1;
    visibility: visible;
  }
`;

export const ImageContainer = styled.div`
  border: 1px solid #e1e6eb;
  border-radius: 8px;
  height: 63px;
  margin-right: 17px;
  overflow: hidden;
  width: 140px;
`;

export const Image = styled(Imgix)<{ src: string; htmlAttributes: any }>`
  display: block;
`;

export const LinkContainer = styled.div`
  color: #a0a6ac;
  display: flex;
  flex-grow: 1;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.65;

  a {
    color: #0b99e6;
  }
`;

export const Controls = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 48px;
`;
