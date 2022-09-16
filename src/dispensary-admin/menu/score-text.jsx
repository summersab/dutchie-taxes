import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';

import colorUtils from 'src/utils/color-utils';

const Text = styled.span`
  color: ${(props) => props.color};
  font-weight: bold;
`;

export default function ScoreText({ score }) {
  const text = _.isNumber(score) ? score.toFixed(2) : '?';
  const color = colorUtils.getScoreColor(score);
  return <Text color={color}>{text}</Text>;
}
