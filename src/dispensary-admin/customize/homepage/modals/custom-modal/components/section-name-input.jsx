import React from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';

import { CustomTextField } from './custom-text-field';

export function SectionNameInput(props) {
  const { value, onChange } = props;

  const characterCount = value.length;

  return (
    <CustomTextField
      fullWidth
      name='sectionName'
      placeholder='Give your new section a name'
      variant='outlined'
      value={value}
      onChange={onChange}
      InputProps={{
        endAdornment: <InputAdornment>{characterCount}/25</InputAdornment>,
      }}
    />
  );
}
