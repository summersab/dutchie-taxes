import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { Label, Checkbox } from 'shared/components/legacy-rebass';
import { width } from 'styled-system';
import { Tooltip } from 'shared/components';

const CheckboxLabel = styled(Label)`
  position: relative;
  line-height: 1.5;
  margin-top: ${(props) => props.mt || 0};
  margin-bottom: ${(props) => props.mb || 0};
  ${width}
`;

export const StyledCheckbox = styled(Checkbox)`
  height: 17px;
  width: 17px;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;

  + span {
    min-height: 17px;
    line-height: 17px;
    cursor: ${({ disabled }) => (disabled && 'not-allowed') || 'pointer'};
    color: ${({ disabled, color }) => (disabled && '#b3b3b3 !important') || color || '#575e64'};
    font-size: 13px;
    padding-left: 30px;
    position: relative;

    > span {
      height: 17px;
      width: 17px;
      position: absolute;
      left: 0;
      top: 0;
      background: url(/icons/unchecked-icon.svg) no-repeat;
    }
  }

  &:checked + span > span {
    background: url(/icons/checked-icon.svg) no-repeat;
  }

  // apply focus styles to label
  &.focus-visible + span > span {
    box-shadow: 0 0 0pt 2pt rgba(11, 153, 230, 0.4) !important;
  }
`;

const CheckBox = (
  /** @type any */
  {
    name,
    label,
    onChange = _.noop,
    onClick = _.noop,
    labelButton = false,
    labelButtonOnClick = false,
    tooltip = false,
    inputId,
    tooltipCopy,
    className,
    register,
    ...props
  }
) => (
  <CheckboxLabel {...props} className={`${className} checkbox-old`}>
    <StyledCheckbox
      inputId={inputId}
      name={name}
      onChange={onChange}
      onClick={onClick}
      register={register}
      {...props}
    />
    <span>
      <span />
      {label}
      {labelButton && (
        <a onClick={labelButtonOnClick}>{labelButton}</a> // eslint-disable-line
      )}
    </span>
    {tooltip && <Tooltip tooltipCopy={tooltipCopy} grey left='auto' bottom='30px' right='-61px' width='239px' />}
  </CheckboxLabel>
);

export default CheckBox;
