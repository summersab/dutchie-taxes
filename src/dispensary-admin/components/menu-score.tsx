import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';

import { categories } from 'shared/constants';
import useHover from 'shared/hooks/use-hover';

import ScoreText from 'src/dispensary-admin/menu/score-text';
import MenuScoreBar from 'src/dispensary-admin/menu/menu-score-bar';
import { GqlMenuScore } from 'types/graphql';

type MenuScoreProps = {
  dispensaryId: string;
  menuScore: number;
  menuScoresByCategory: GqlMenuScore[] | null;
};

export default function MenuScore({ dispensaryId, menuScore, menuScoresByCategory }: MenuScoreProps): JSX.Element {
  const [hoverRef, isHovered] = useHover();
  const validMenuScoresByCategory = (menuScoresByCategory ?? []).filter((score) => score.category && score.value);

  const menuScoreObjects = validMenuScoresByCategory.map((object) => {
    const categoryOption = categories.find((option) => option === object.category);
    const index = categories.findIndex((option) => option === object.category);

    return {
      categoryOption,
      order: index,
      score: object.value,
      to: {
        pathname: `/dispensaries/${dispensaryId}/menu`,
        query: {
          category: categoryOption,
          sortBy: 'score',
        },
      },
    };
  });

  const sortedMenuScoreObjects = _.sortBy(menuScoreObjects, 'order');

  return (
    <Container>
      <HoverContainer ref={hoverRef}>
        <Text>
          Menu Score: <ScoreText score={menuScore} />
        </Text>

        {!_.isEmpty(sortedMenuScoreObjects) && isHovered && (
          <Popover>
            <CategoryBreakdown>
              <Heading>Menu Score Breakdown</Heading>

              <Bars>
                {_.map(sortedMenuScoreObjects, (menuScoreObject) => (
                  <MenuScoreBar
                    key={_.toLower(menuScoreObject.categoryOption)}
                    label={menuScoreObject.categoryOption}
                    parent={hoverRef}
                    score={menuScoreObject.score ?? 0}
                    to={menuScoreObject.to}
                  />
                ))}
              </Bars>
            </CategoryBreakdown>
          </Popover>
        )}
      </HoverContainer>
    </Container>
  );
}

const Container = styled.div`
  flex: 1 0 0%;
  text-align: right;
`;

const HoverContainer = styled.div`
  display: inline-block;
  position: relative;
  text-align: left;
`;

const Text = styled.span`
  color: #a2a7ae;
  cursor: pointer;
  font-size: 13px;
`;

const Popover = styled.div`
  padding-top: 10px;
  position: absolute;
  right: -33px;
  top: 100%;
  z-index: 2;
`;

const CategoryBreakdown = styled.div`
  background-color: #fff;
  border: 1px solid #cdcdcd;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.07);
  padding: 34px;
  position: relative;
  width: 319px;

  :after,
  :before {
    bottom: 100%;
    right: 43px;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  :after {
    border-color: rgba(255, 255, 255, 0);
    border-bottom-color: #fff;
    border-width: 8px;
    margin-right: -8px;
  }

  :before {
    border-color: rgba(205, 205, 205, 0);
    border-bottom-color: #cdcdcd;
    border-width: 9px;
    margin-right: -9px;
  }
`;

const Heading = styled.h3`
  color: #6d747b;
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 17px;
`;

const Bars = styled.div``;
