import React from 'react';
import styled, { css } from 'styled-components';
import { space, width } from 'styled-system';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export const ArrowCss = css`
  border: 1px solid #46494c;
  border-left: 4px solid transparent !important;
  border-right: 4px solid transparent !important;
  border-top: 5px solid #797e83 !important;
  border-bottom: none !important;
  transform: none;
  content: ' ';
  display: block;
  pointer-events: none;
  position: absolute;
  z-index: 4;
`;

const Arrow = styled.div`
  position: absolute;
  cursor: pointer;
  top: 46%;
  right: 26px;
  &:after {
    ${ArrowCss}
  }
`;

export const ArrowImage = () => <Arrow />;

/* eslint-disable import/prefer-default-export */
export const DefaultSelect = ({
  id,
  name,
  label,
  onChange,
  value,
  error,
  errorMessage,
  onValueAfterError,
  disableEmptyOption = false,
  customIcon = null,
  children,
  ...props
}) => (
  <StyledSelectWithLabel {...props}>
    <FormControl variant='filled' classes={{ root: 'mui-dt-root' }}>
      <InputLabel
        htmlFor={id}
        classes={{
          root: 'mui-dt-label-root',
          focused: 'mui-dt-label-focused',
          error: 'mui-dt-label-error',
          shrink: 'mui-dt-label-shrink',
        }}
        className={error ? 'mui-dt-label-error' : ''}
      >
        {error && errorMessage ? errorMessage : label}
      </InputLabel>
      <Select
        native
        id={id}
        error={!!error}
        value={value}
        onChange={(e) => {
          onChange(e);
          if (error) {
            onValueAfterError(e);
          }
        }}
        input={
          <FilledInput
            name={name}
            id={id}
            classes={{
              root: 'mui-dt-input-root',
              input: 'mui-dt-input-input',
              error: 'mui-dt-input-error',
              underline: 'mui-dt-input-underline',
              inputAdornedEnd: 'mui-dt-input-icon',
            }}
          />
        }
        IconComponent={customIcon || ArrowImage}
        {...props}
      >
        <option value='' disabled={disableEmptyOption} />
        {children}
      </Select>
    </FormControl>
  </StyledSelectWithLabel>
);

const StyledSelectWithLabel = styled.div`
  .mui-dt-root {
    ${space};
    ${width};
  }

  .mui-dt-input-root {
    cursor: pointer;
    background-color: #fcfdfe !important;
    border: 1px solid #caced4;
    border-radius: 4px;
    &.mui-dt-input-error {
      border: 1px solid #e25241;
    }
  }

  .mui-dt-input-input {
    font-size: 16px;
    padding: 22px 5px 6px 20px;
    caret-color: #6fa48e;
    color: #5d666d;
    height: 23px;
    width: calc(100% - 18px - 34px);

    @media only screen and (min-width: 768px) {
      font-size: 13px;
      height: 19px;
      padding: 19px 34px 5px 18px;
    }

    &:focus {
      background-color: transparent;
    }
  }

  .mui-dt-label-root {
    color: #858788;
    font-size: 16px;
    transform: translate(20px, 19px) scale(1);
    transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
      font-size 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    &.mui-dt-label-shrink {
      // transform: translate(20px, 10px) scale(0.8);
      transform: translate(20px, 10px);
      font-size: 10px;

      @media only screen and (min-width: 768px) {
        // transform: translate(18px, 8px) scale(0.8);
        transform: translate(18px, 8px);
        font-size: 10px;
      }
    }
    &.mui-dt-label-error {
      color: #e25241 !important;
    }
    &.mui-dt-label-focused {
      color: #858788;
    }

    @media only screen and (min-width: 768px) {
      font-size: 13px;
      transform: translate(18px, 17px) scale(1);
    }
  }
  .mui-dt-input-underline:before {
    display: none;
  }
  .mui-dt-input-underline:after {
    transform: scale(0) !important; // remove underline highlight
  }
`;
