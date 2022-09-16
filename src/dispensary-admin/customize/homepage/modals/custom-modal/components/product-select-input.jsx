import React, { useState } from 'react';
import styled from 'styled-components';

import Popper from '@material-ui/core/Popper';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';

import { CheckmarkDropdownOption } from 'src/components/core/autocomplete/checkmark-dropdown-option';

import { CustomTextField } from './custom-text-field';
import { SearchIcon } from './search-icon';
import concatBrandName from '../utils/concat-brand-name';

const StyledCheckmarkDropdownOption = styled(CheckmarkDropdownOption)`
  background-color: transparent;

  &:hover {
    background-color: transparent;
  }
`;

// MUI styles
const StyledAutocomplete = styled(Autocomplete)`
  .MuiInputBase-root {
    padding: 0;
    padding-left: 20px;
  }

  .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root'] .MuiAutocomplete-input {
    padding-left: 12px;
  }
`;

const StyledPopper = styled(Popper)`
  .MuiAutocomplete-paper {
    width: 388px;
    margin-top: 10px;
    background: ${({ theme }) => theme.colors.white};
    border-radius: 7px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1884);
  }

  .MuiAutocomplete-option {
    padding: 0;

    &[aria-selected='true'] {
      background-color: unset;
    }
    &[data-focus='true'] {
      background: ${({ theme }) => theme.colors.primaryGrey};
    }
  }

  .MuiAutocomplete-listbox {
    padding: 0;
  }
`;

function renderInput({ InputProps, ...params }) {
  return (
    <CustomTextField
      {...params}
      variant='outlined'
      placeholder='Search...'
      InputProps={{
        ...InputProps,
        startAdornment: (
          <InputAdornment>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

function renderOption({ Name, brand, type }, { selected }) {
  return (
    <StyledCheckmarkDropdownOption
      primaryText={concatBrandName(brand, Name)}
      secondaryText={type}
      selected={selected}
    />
  );
}

export function ProductSelectInput(props) {
  const { options, value, onChange } = props;

  const [searchString, setSearchString] = useState('');

  const handleInputChange = (e, val) => {
    // prevent autocomplete from clearing input value on option select
    // eslint-disable-next-line no-prototype-builtins
    if (e && !e?.hasOwnProperty('altKey')) {
      setSearchString(val);
    }
  };

  return (
    <StyledAutocomplete
      inputValue={searchString}
      onInputChange={handleInputChange}
      multiple
      selectOnFocus
      disableClearable
      disableCloseOnSelect
      popupIcon={null}
      value={value}
      options={options}
      onChange={onChange}
      // eslint-disable-next-line lodash/prefer-constant
      renderTags={() => null}
      renderInput={renderInput}
      renderOption={renderOption}
      PopperComponent={StyledPopper}
      getOptionLabel={({ brand, Name }) => concatBrandName(brand, Name)}
    />
  );
}
