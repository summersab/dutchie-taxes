import styled from 'styled-components';

import Imgix from 'shared/components/imgix';
import { Button } from 'shared/components';
import CheckIcon from './svg/check-icon';

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  margin-bottom: 10px;
  column-gap: 20px;
`;

export const LeftColumn = styled.div`
  text-align: left;
`;

export const RightColumn = styled.div`
  text-align: left;
`;

export const Block = styled.div`
  display: grid;
  margin-bottom: 20px;
`;

export const ImageBlock = styled(Block)`
  margin-bottom: 58px;
`;

export const StyledButton = styled(Button)`
  padding: 0 40px;
`;

export const FileSelect = styled.label`
  width: 100px;
  height: 30px;
  padding: 0 10px;
  margin-top: 10px;
  font-size: 12px;
  font-weight: 700;
  background-color: #0b99e6;
  color: #fff;
  border-radius: 33px;
  display: grid;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #165070;
    border: none;
    box-shadow: none;
    color: #fff;
    outline: none;
  }
`;

export const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 30px;
  column-gap: 10px;
  align-items: center;
`;

export const Input = styled.input`
  background: #fcfdfe;
  border: 1px solid #d2d5da;
  border-radius: 4px;
  padding: 12px;
  font-size: 13px;
  margin-top: 10px;
  width: 100%;
`;

export const Title = styled.div`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 11px;
  line-height: 1.2;
  color: #6d747b;
  margin-bottom: 4px;
`;

export const Body = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 1.2;
  color: #6d747b;
  margin-bottom: 4px;
`;

export const PlaceHolderBanner = styled.div`
  width: 100%;
  height: 133px;
  display: grid;
  align-items: center;
  justify-content: center;
  background: #e1e6eb;
  border: 1px solid #a6b2c0;
  border-radius: 8px;
  font-weight: 700;
  font-size: 13px;
  color: #6d747b;
  margin-bottom: 16px;
`;

export const MobilePlaceHolderBanner = styled.div`
  width: 300px;
  height: 135px;
  display: grid;
  align-items: center;
  justify-content: center;
  background: #e1e6eb;
  border: 1px solid #a6b2c0;
  border-radius: 8px;
  font-weight: 700;
  font-size: 13px;
  color: #6d747b;
`;

export const HiddenInput = styled.input`
  display: none;

  &:disabled + label {
    color: #fff;
    background: #c6c4c4;

    &:hover {
      cursor: not-allowed;
    }
  }
`;

export const ValidateCheckIcon = styled(CheckIcon)<{ valid: boolean }>`
  display: ${({ valid }) => (valid ? 'block' : 'none')};
`;

export const DesktopBannerImage = styled(Imgix)<{ src: string; htmlAttributes: any }>`
  width: 400px;
  height: 133px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const MobileBannerImage = styled(Imgix)<{ src: string; htmlAttributes: any }>`
  width: 300px;
  height: 135px;
  border-radius: 8px;
`;
