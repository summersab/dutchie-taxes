import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RSCE from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism.css';

const Root = styled.div`
  position: relative;
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
  padding: 0.25rem 0 0.5rem;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  user-select: none;
  pointer-events: none;
  color: #575e64;
  font-size: 13px;
  line-height: 17px;
`;

const Code = styled(RSCE)`
  background-color: #f6f8fa;
  border: 1px solid rgba(0, 0, 0, 0.06);
  margin-bottom: 1rem;

  & pre,
  & textarea {
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace !important;
    font-size: 11px !important;
    line-height: 1.4 !important;
    padding: 16px !important;
    margin: 0 !important;
    min-height: unset !important;
  }
`;

const Editor = ({ name, onChange, title = ``, placeholder = ``, initialValue = `` }) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (v) => setValue(v);

  useEffect(() => {
    if (onChange && name && value !== initialValue) {
      onChange({
        target: {
          name,
          value,
        },
      });
    }
  }, [value]);

  return (
    <Root>
      {title && <Tab>{title}</Tab>}
      <Code value={value || placeholder} onValueChange={handleChange} highlight={(v) => highlight(v, languages.css)} />
    </Root>
  );
};

export default Editor;
