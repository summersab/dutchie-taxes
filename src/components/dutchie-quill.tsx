import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';

import 'react-quill/dist/quill.bubble.css';

const formats = ['bold', 'italic', 'link', 'list'];
const modules = {
  clipboard: { matchVisual: false },
  toolbar: [
    ['bold', 'italic', 'link'],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ],
};

const StyledReactQuill = styled(ReactQuill)`
  width: 100%;
  .ql-editor {
    background-color: #fcfdfe;
    border: 1px solid #d1d5da;
    border-radius: 2px;
    box-shadow: none;
    color: #707478;
    font-size: 13px;
    padding: 14px 21px 13px;
    overflow: visible;
  }

  .ql-container,
  .ql-editor {
    min-height: 200px;
  }
  .ql-editor.ql-blank::before {
    font-style: normal;
    color: #bbbfc4;
    font-size: 13px;
  }
`;

type DutchieQuillProps = {
  onChange?: (html: string, plainText: string, opts: { isEmpty: boolean }) => void;
  htmlValue?: string;
};

export function DutchieQuill(props: DutchieQuillProps): JSX.Element {
  const { onChange, htmlValue = '', ...otherProps } = props;
  const [blockApiChangeEvents, setBlockApiChangeEvents] = useState(!!htmlValue);

  return (
    <StyledReactQuill
      formats={formats}
      modules={modules}
      onChange={(html, _delta, source, editor) => {
        // Workaround for "feature" where change event fires on initialization. See: https://bit.ly/2VB2pUx
        if (source === 'api' && blockApiChangeEvents) {
          setBlockApiChangeEvents(false);
        } else {
          const plainText = editor.getText();
          const isEmpty = plainText.trim().length === 0;

          if (onChange) {
            // An empty Quill still has the html of <p><br></p>, so let's strip it
            // https://github.com/zenoamaro/react-quill/issues/250
            if (html === `<p><br></p>`) {
              html = '';
            }

            onChange(html, plainText, { isEmpty });
          }
        }
      }}
      theme='bubble'
      value={htmlValue}
      {...otherProps}
    />
  );
}
