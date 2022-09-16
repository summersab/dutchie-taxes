import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import { mediaQueries } from 'shared/styles';

import { getColorByIndex } from '../helpers';

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <CustomLabel
      x={x}
      y={y}
      fill={getColorByIndex(index)}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
    >
      {`${(percent * 100).toFixed(0)}%`}
    </CustomLabel>
  );
};

export function Chart(props) {
  const { orderTypes } = props;
  const filteredOrderTypes = _.filter(orderTypes, (orderType) => orderType.percentage > 0.1);

  return (
    <Wrapper>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={filteredOrderTypes}
            dataKey='percentage'
            fill='#82ca9d'
            innerRadius='50%'
            outerRadius='70%'
            paddingAngle={2}
            labelLine={false}
            startAngle={450}
            endAngle={90}
            label={renderCustomizedLabel}
          >
            {_.map(orderTypes, (entry, index) => (
              <Cell key={`cell-${index}`} fill={getColorByIndex(index)} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 212px;
  height: 190px;
`;

const CustomLabel = styled.text`
  font-size: 14px;
  font-weight: bold;

  @media ${mediaQueries.largePhone} {
    font-size: 12px;
  }
`;
