import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 31px;
  margin-bottom: 40px;
  padding: 0 16px;
`;

export const Title = styled.h2`
  color: #242526;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
`;

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  row-gap: 16.5px;
  column-gap: 18px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const ViewAllButton = styled.button`
  background: #eaeff2;
  color: #677882;
  font-size: 16.5px;
  border-radius: 10px;
  height: 50px;
  margin-top: 14.5px;
  border: none;
  width: 100%;
  cursor: pointer;
`;
