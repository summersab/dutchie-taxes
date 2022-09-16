import React from 'react';
import { Link } from 'react-router-dom';
import type { SectionLink } from 'src/models/section-links';
import styled, { css } from 'styled-components';

import { mediaQueries } from 'shared/styles';
import { SidebarIcon } from 'src/components/sidebar/icon';
import { Tag } from 'src/dispensary-admin/customize/customize';

type SidebarLinkProps = Pick<SectionLink, 'badge' | 'icon' | 'label' | 'status' | 'to'> & {
  active?: boolean;
  onClick?: () => void;
};

export function SidebarLink(props: SidebarLinkProps): JSX.Element {
  const { active, badge, icon, label, to, status, onClick } = props;

  return (
    // eslint-disable-next-line react/destructuring-assignment
    <StyledLink $active={!!active} to={to} onClick={onClick}>
      {icon && <SidebarIcon icon={icon} active={active} />}

      <Label>
        {label}
        {badge && <Badge size={badge > 99 ? 'lg' : 'sm'}>{badge}</Badge>}
        {status && <Stauts>{status}</Stauts>}
      </Label>
    </StyledLink>
  );
}

const Label = styled.span`
  display: inline-block;
  font-weight: bold;
  font-size: 14px;
  margin-left: 18px;

  @media ${mediaQueries.desktop} {
    font-size: 18px;
  }
`;

const StyledLink = styled(Link)<{ $active: boolean }>`
  align-items: center;
  display: flex;
  line-height: 42px;
  color: #c8e7db;
  cursor: pointer;
  padding-left: 38px;
  position: relative;

  @media ${mediaQueries.desktop} {
    line-height: 65px;
    padding-left: 56px;
    color: #ffffff;
  }

  @media ${mediaQueries.largePhone} {
    line-height: 54px;
    padding-left: 55px;
    margin: 5px 0;
  }

  &:hover {
    color: #d4efe5;
    text-decoration: none !important;
  }

  ${(props) =>
    props.$active &&
    css`
      background-color: #4b8d74;
      color: #f4f7fa;
      @media ${mediaQueries.desktop} {
        color: #ffffff;
      }
    `}
`;

const Badge = styled.div<{ size: 'lg' | 'sm' }>`
  background-color: #ed5b5b;
  border-radius: ${({ size }) => (size === 'lg' ? '10px' : '100%')};
  color: #ffffff;
  display: inline-block;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
  margin-left: 10px;
  padding-right: 1px;
  text-align: center;
  width: ${({ size }) => (size === 'lg' ? '33px' : '20px')};
`;

const Stauts = styled(Tag)`
  top: 0;
  bottom: 0;
  margin: auto 8px;
  width: auto;
`;
