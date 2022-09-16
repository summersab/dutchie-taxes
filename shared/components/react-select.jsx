import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';

import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import AsyncCreatableSelect from 'react-select/async-creatable';
import AsyncSelect from 'react-select/async';

import { ArrowImage, ArrowCss } from './select-with-label';

function isValidNewOption(inputValue, _selectValue, selectOptions) {
  const hasCaseInsensitiveExactMatch = _.some(
    selectOptions,
    (option) => _.trim(option.label.toLowerCase()) === _.trim(inputValue.toLowerCase())
  );

  return inputValue.length > 0 && selectOptions.length <= 3 && !hasCaseInsensitiveExactMatch;
}

// This is actually 3 components wrapped into 1:
// if isCreatable, return <CreatableSelect>
// else if isAsync, return <AsyncSelect>
// default return is <Select>
const ReactSelect = (
  /** @type any */ {
    defaultValue,
    height = 45,

    isAsyncCreatable = false,
    isAsyncMulti = false,
    isAsync = false,
    isLoading = false,
    loadOptions = _.noop, // see https://react-select.com/async#async
    isCreatable = false,
    isMulti = false,
    isSearchable = true,
    isClearable = false,

    id = 'react-select',
    formatCreateLabel,
    formatOptionLabel,
    noOptionsMessage = () => 'No options',
    onChange,
    onCreateOption,
    options = [],
    placeholder = 'Select...',
    value,
    components,

    textAlign = 'inherit',
    width = 194,
    borderRadius = '2px',
    containerStyles = {},
    optionStyles = {},
    customSelectedBackgroundColor = null,
    customSelectedColor = null,
    hasError = false,
    tagPrefix = '',
  }
) => {
  const getOptionBgColor = (isFocused, isSelected, isDisabled) => {
    if (isSelected && customSelectedBackgroundColor) {
      return customSelectedBackgroundColor;
    }
    if (isDisabled) {
      return '#FFF';
    }
    if (isSelected) {
      return '#7A9ED5';
    }
    if (isFocused) {
      return '#F6F6F6';
    }

    return '#FFF';
  };

  const getOptionColor = (isSelected, isDisabled) => {
    if (isDisabled) {
      return '#C6C6C6';
    }
    if (isSelected && customSelectedColor) {
      return customSelectedColor;
    }
    if (isSelected) {
      return '#FFF';
    }
    return '#6d747b';
  };

  const styleOverrides = {
    container: (styles) => ({
      ...styles,
      ...containerStyles,
    }),
    control: (styles) => ({
      ...styles,
      cursor: 'pointer',
      width,
      minHeight: height,
      boxShadow: 'none',
      borderRadius,

      borderColor: hasError ? '#e25241' : '#d1d5da',
      ':hover': {
        borderColor: hasError ? '#e25241' : '#d1d5da',
      },
      fontSize: '13px',
      color: '#6d747b',
      backgroundColor: '#fcfdfe',
      paddingLeft: isMulti ? '13px' : '11px',
    }),
    menu: (styles) => ({ ...styles, zIndex: 100 }),
    option: (styles, { isFocused, isSelected, isDisabled }) => ({
      ...styles,
      ...optionStyles,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      fontSize: '13px',
      textAlign,
      backgroundColor: getOptionBgColor(isFocused, isSelected, isDisabled),
      color: getOptionColor(isSelected, isDisabled),
      ':active': {
        ...styles[':active'],
        color: customSelectedColor ?? '#fff',
        backgroundColor: customSelectedBackgroundColor ?? '#7A9ED5',
      },
    }),
    singleValue: (styles) => ({
      ...styles,
      color: '#707478',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: '100%',
      top: '1px',
      transform: 'none',
    }),
    multiValue: (styles) => ({
      ...styles,
      borderRadius: '3px',
      border: 'solid 1px #b7c2d0',
      backgroundColor: '#eaeff4',
      margin: '4px',
      ':first-of-type': { marginLeft: 0 },
    }),
    multiValueLabel: (styles) => ({ ...styles, color: '#606f7f', fontSize: '13px', fontWeight: 'bold' }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: ' #9aa8b6',
      ':hover': {},
    }),
  };

  const sharedProps = {
    id,
    onChange,
    options,
    placeholder,
    styles: styleOverrides,
    value,
  };

  if (isCreatable) {
    const customizedComponents = { DropdownIndicator: null, ...components };
    return <CreatableSelect {...sharedProps} components={customizedComponents} isClearable={false} isMulti />;
  }
  const showClearable = isClearable && !_.isEmpty(value?.value);

  const customizedComponents = isMulti
    ? { DropdownIndicator: null, ...components }
    : { IndicatorsContainer: showClearable ? ClearIndicatorWithArrow : ArrowImage, ...components };

  if (isAsyncCreatable) {
    return (
      <AsyncCreatableSelect
        {...sharedProps}
        components={customizedComponents}
        createOptionPosition='last'
        formatCreateLabel={formatCreateLabel}
        isClearable={isClearable}
        isLoading={isLoading}
        isValidNewOption={isValidNewOption}
        loadOptions={loadOptions}
        onCreateOption={onCreateOption}
      />
    );
  }

  if (isAsyncMulti) {
    return (
      <AsyncSelect
        {...sharedProps}
        isMulti
        noOptionsMessage={noOptionsMessage}
        components={customizedComponents}
        loadOptions={loadOptions}
        isClearable={isClearable}
      />
    );
  }

  if (isAsync) {
    return (
      <AsyncSelect
        {...sharedProps}
        noOptionsMessage={noOptionsMessage}
        components={customizedComponents}
        loadOptions={loadOptions}
        isClearable={isClearable}
      />
    );
  }

  return (
    <Select
      {...sharedProps}
      components={customizedComponents}
      defaultValue={defaultValue}
      isClearable={isClearable}
      isMulti={isMulti}
      isSearchable={isSearchable}
      noOptionsMessage={noOptionsMessage}
      formatOptionLabel={formatOptionLabel}
      classNamePrefix={tagPrefix}
    />
  );
};

export default ReactSelect;

const ClearIndicatorWithArrow = ({ clearValue }) => (
  <ClearContainer>
    <Clear onClick={clearValue}>
      <svg viewBox='0 0 14 14' xmlns='http://www.w3.org/2000/svg' height='10px' width='10px' fill='#797e83'>
        <path d='m13.71 11.55-4.55-4.55 4.55-4.55c.6-.6.17-1.13-.43-1.73s-1.13-1-1.73-.43l-4.55 4.54-4.55-4.54c-.6-.6-1.13-.17-1.73.43s-1 1.13-.43 1.73l4.54 4.55-4.54 4.55c-.6.6-.17 1.13.43 1.73s1.13 1 1.73.43l4.55-4.55 4.55 4.55c.6.6 1.13.16 1.73-.43s1.03-1.14.43-1.73z' />
      </svg>
    </Clear>
    <Divider>|</Divider>
    <Arrow />
  </ClearContainer>
);

const ClearContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 40px;
  margin-right: 26px;
  padding-top: 2px;
  color: #797e83;
`;

const Clear = styled.div`
  padding-top: 1px;
`;

const Divider = styled.div`
  font-size: 20px;
`;

const Arrow = styled.div`
  &:after {
    ${ArrowCss}
    transform: translateY(-3px);
  }
`;
