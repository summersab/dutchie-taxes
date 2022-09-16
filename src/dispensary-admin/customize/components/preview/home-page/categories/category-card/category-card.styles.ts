import styled from 'styled-components';
import Card from 'shared/components/card';
import Imgix from 'shared/components/imgix';

export const StyledCard = styled(Card)`
  justify-content: flex-start;
  padding: 15px;
  border-radius: 17px;
  background: #fff;
  height: 100%;
  width: 100%;
  aspect-ratio: 1.14 / 1;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const Text = styled.p`
  font-weight: bold;
  font-size: 10px;
  line-height: 1.2;
  color: #afb1b2;
  margin: 0;
`;

export const Title = styled.span`
  color: #242526;
  font-weight: bold;
  font-size: 16px;
  margin: 0;
`;

export const CardHeader = styled.div`
  width: 100%;
`;

export const Image = styled(Imgix)<{ src: string; htmlAttributes: any }>`
  border-radius: 3px;
  object-fit: contain;
  width: 100%;
`;

export const ImageContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-top: auto;
  height: 100%;
  width: 100%;
  position: absolute;
  bottom: 0;
  justify-content: center;

  /*
  This padding value sizes the image container to be 160px x 85px for the 214px x 187px tile...
  and dynamically sizes the image container to maintain the same aspect ratio for different tile sizes.
  For this to work with other tile sizes, the tile must keep the same width to height ratio (1.14:1)
  */
  padding: 42.3% 14.6% 9.4%; ;
`;
