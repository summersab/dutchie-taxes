import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

import ScoreText from 'src/dispensary-admin/menu/score-text';
import colorUtils from 'src/utils/color-utils';

type MenuScoreBarProps = {
  label?: string;
  parent: React.MutableRefObject<HTMLDivElement | null>;
  score: number;
  to: MenuScoreBarTarget;
};

type MenuScoreBarTarget = {
  pathname: string;
  query: {
    category?: string;
    sortBy: string;
  };
};

function MenuScoreBar({ label, parent, score, to }: MenuScoreBarProps): JSX.Element {
  const color = colorUtils.getScoreColor(score);
  const percentage = (score / 5.0) * 100;

  const linkToCategory = {
    pathname: `${to.pathname}`,
    search: `?category=${to.query.category ?? ''}&sortBy=${to.query.sortBy}`,
  };

  function onClick(): void {
    parent.current?.dispatchEvent(new Event('mouseleave'));
  }

  return (
    <Container>
      <TextContainer>
        <Label>
          {label}: <ScoreText score={score} />
        </Label>

        <Link onClick={onClick} to={linkToCategory}>
          View
        </Link>
      </TextContainer>

      <Bar>
        <Background />
        <Fill color={color} percentage={percentage} />
      </Bar>
    </Container>
  );
}

export default React.memo(MenuScoreBar);

const Container = styled.div`
  margin-bottom: 20px;

  :last-child {
    margin-bottom: 0;
  }
`;

const TextContainer = styled.div`
  display: flex;
  font-size: 12px;
  line-height: 18px;
  justify-content: space-between;
  margin-bottom: 3px;
`;

const Label = styled.div`
  color: #6d747b;
  font-weight: bold;
`;

const Link = styled(RouterLink)`
  color: #4597e0;
`;

const Bar = styled.div`
  position: relative;
`;

const Background = styled.div`
  background-color: #edeeef;
  border-radius: 4px;
  height: 6px;
  width: 100%;
`;

const Fill = styled.div<{ percentage: number }>`
  background-color: ${(props) => props.color};
  border-radius: 4px;
  height: 6px;
  left: 0;
  position: absolute;
  top: 0;
  width: ${(props) => props.percentage}%;
`;
