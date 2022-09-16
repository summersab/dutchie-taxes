import styled from 'styled-components';
import { space, width } from 'styled-system';
import { mediaQueries } from 'shared/styles';

export const NotifyBlock = styled.div`
  display: flex;
  background-color: rgb(239, 247, 239);
  margin: 0px 0px 20px 0px;
  border: 1px solid rgb(191, 222, 210);
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  color: #6d747b;
  font-size: 13px;
  width: 400px;
  padding: 10px 19px;
  margin-bottom: 25px;
  line-height: 16px;
  button {
    font-size: 13px;
  }

  @media ${mediaQueries.largePhone} {
    width: 100%;
    justify-content: center;
    display: inline-block;
    button {
      display: inline-block;
    }
  }
`;

export const WhiteNotifyBlock = styled(NotifyBlock)`
  background-color: white;
  border: none;
  text-align: center;
  align-items: center;
  justify-content: center;
  line-height: 15px;
  padding: 0;
  ${space}
`;

export const YellowNotifyBlock = styled(NotifyBlock)`
  background-color: #fffdeb;
  border: 1px solid #d8d5ba;
  text-align: ${({ align }) => align || 'left'};
  width: 100%;
  font-size: 12px;
  padding: 11px 14px 11px 19px;
  color: #75725b;
  border-radius: 4px;
  ${space}
`;

export const RedNotifyBlock = styled(NotifyBlock)`
  background-color: #fff0f0;
  border: 1px solid #d8c1c1;
  width: 100%;
  padding: 11px 14px 11px 19px;
  color: #986c6c;
  border-radius: 4px;
  ${space}
  ${width}
`;
