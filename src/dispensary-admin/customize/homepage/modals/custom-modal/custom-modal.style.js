import styled, { css } from 'styled-components';
import { mediaQueries } from 'shared/styles';
import { ModalContainer } from 'shared/modals';

const containerStyles = css`
  flex: 0 0 50%;
  height: 100%;

  @media ${mediaQueries.largePhone} {
    flex: unset;
    width: 100%;
  }
`;

export const CustomModalStyles = styled(ModalContainer)`
  display: flex;
  flex-direction: row;
  text-align: left;
  border-radius: 8px;
  overflow: hidden;
  z-index: 0;

  @media ${mediaQueries.largePhone} {
    flex-direction: column;
    overflow-y: scroll;
    border-radius: 0;
  }
`;

export const EditContainer = styled.form`
  ${containerStyles}
  padding: 34px 40px 79px 43px;
  background-color: ${({ theme }) => theme.colors.white};

  @media ${mediaQueries.largePhone} {
    height: unset;
  }
`;

export const DisplayContainer = styled.div`
  ${containerStyles}
  display: flex;
  flex-direction: column;
  padding: 0 18px;
  background-color: ${({ theme }) => theme.colors.primaryGrey};
  position: relative;
`;

export const Field = styled.div`
  padding-bottom: 30px;
`;
