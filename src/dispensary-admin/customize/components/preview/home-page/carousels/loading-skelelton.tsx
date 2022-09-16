import React from 'react';
import styled from 'styled-components';
import { space } from 'styled-system';

export const StyledSkeleton = styled.div`
  ${space}
  @keyframes loading {
    0% {
      background-color: #d9dfe1;
    }
    25% {
      background-color: #e8ecee;
    }
    50% {
      background-color: #eef1f2;
    }
    75% {
      background-color: #e8ecee;
    }
    100% {
      background-color: #d9dfe1;
    }
  }
  animation: loading 1s linear infinite;
  background-color: ${({ theme }) => theme.colors.grey[95]};
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 10px;
  display: inline-block;
  line-height: 1;
  width: 100%;
  height: 100%;
`;

type SkeletonProps = {
  height?: number | string;
  width?: number | string;
  circle?: boolean;
  rounded?: boolean;
  mr?: number | string;
  borderRadius?: number | string;
};

export function Skeleton({ width, height, circle, rounded, ...props }: SkeletonProps): JSX.Element {
  const style: SkeletonProps = {};

  if (width) {
    style.width = width;
  }

  if (height) {
    style.height = height;
  }

  if (width && height && circle) {
    style.borderRadius = `50%`;
  }

  if (rounded) {
    style.borderRadius = `30px`;
  }

  return (
    <div>
      <StyledSkeleton style={style} {...props}>
        &zwnj;
      </StyledSkeleton>
    </div>
  );
}
