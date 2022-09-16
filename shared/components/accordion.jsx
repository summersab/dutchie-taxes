import React, { useMemo } from 'react';
import styled from 'styled-components';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import _ from 'lodash';

export const AccordionContext = React.createContext();

const getAccordionSize = (prop) => {
  const hasPixelValue = _.includes(prop, 'px');
  if (hasPixelValue) {
    const value = _.split(prop, `px`)?.[0] ?? '';
    if (!Number.isNaN(value)) {
      return prop;
    }
  }
  return prop === 'large' ? `80px` : `54px`;
};
const AccordionStyled = styled(({ ...props }) => <Accordion {...props} />)`
  --collapsed-height: ${({ collapsedSize }) => getAccordionSize(collapsedSize)};
  min-height: var(--collapsed-height) !important;
  border-color: ${(props) => (props.error ? `#e25241` : `#d8dee3`)} !important;
`;
const AccordionSummaryStyled = styled(AccordionSummary)`
  height: var(--collapsed-height) !important;
  &.Mui-focused {
    background-color: transparent !important;
  }
`;
const AccordionActionsStyled = styled(AccordionActions)``;

// mui theme overrides
export const MuiAccordion = {
  root: {
    minHeight: '54px',
    maxWidth: 390,
    borderRadius: 5,
    border: '1px solid',
    borderColor: '#d8dee3',
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.07)',
    '&.MuiCollapse-container': {
      marginTop: -16,
    },
  },
};
export const MuiAccordionSummary = {
  root: {
    height: '54px',
    padding: '0 21px 0 21px',
    alignItems: 'center',
    transition: 'none',
    '&.Mui-expanded': {
      minHeight: '54px',
      position: 'relative',
    },
  },
};
export const MuiAccordionActions = {
  root: {
    padding: '0 21px 21px 21px',
  },
};

function AccordionWrapper(props) {
  const { expanded, disabled } = props;
  const contextValue = useMemo(
    () => ({
      expanded,
      disabled,
    }),
    [expanded, disabled]
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <AccordionStyled {...props} />
    </AccordionContext.Provider>
  );
}

AccordionWrapper.testProps = [
  {
    children: [
      <AccordionSummaryStyled>Summary</AccordionSummaryStyled>,
      <AccordionActionsStyled>Details</AccordionActionsStyled>,
    ],
  },
  {
    children: [
      <AccordionSummaryStyled>Summary</AccordionSummaryStyled>,
      <AccordionActionsStyled>Details</AccordionActionsStyled>,
    ],
    expanded: true,
  },
];

AccordionSummaryStyled.snapshot = false;
AccordionActionsStyled.snapshot = false;

export {
  AccordionWrapper as Accordion,
  AccordionSummaryStyled as AccordionSummary,
  AccordionActionsStyled as AccordionActions,
};
