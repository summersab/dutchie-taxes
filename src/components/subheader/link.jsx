import _ from 'lodash';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { SuperAdminContent } from 'src/components/super-admin-content';

export default function SubheaderLink(props) {
  const { label, onClick = null, onlyActiveOnIndex, superAdminOnly = false, to } = props;

  function handleClick(event) {
    event.preventDefault();
    onClick();
  }

  const linkProps = _.pickBy(
    {
      onClick: onClick ? handleClick : null,
      onlyActiveOnIndex,
      to,
    },
    (value) => !_.isNil(value)
  );

  const link = (
    <StyledLink {...linkProps}>
      <Label>{label}</Label>
    </StyledLink>
  );

  if (superAdminOnly) {
    return (
      <SuperAdminContent>
        <div>{link}</div>
      </SuperAdminContent>
    );
  }

  return link;
}

const StyledLink = styled(NavLink)`
  color: #89939d;
  cursor: pointer;
  font-size: 14px;
  margin-left: 28px;
  white-space: nowrap;

  :hover {
    color: #42505d;
    text-decoration: none !important;
  }

  :focus,
  :active {
    outline: none;
  }

  &.--is-active {
    color: #42505d;
    font-weight: bold;
  }
`;

StyledLink.defaultProps = {
  activeClassName: '--is-active',
};

const Label = styled.span``;
