import React from 'react';
import styled from 'styled-components';

/**
 * @param {{
 *   className?: string;
 *   html?: string;
 * }}
 */
export default function RichTextHtmlWrapper({ className, html }) {
  return (
    <Wrapper
      data-testid='rich-text-wrapper'
      className={className}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
}

const Wrapper = styled.div`
  strong {
    font-weight: bold;
  }
  em {
    font-style: italic;
  }

  ul,
  ol {
    margin-top: 0;
    padding-left: 0.5rem;
    list-style-position: inside;
  }
`;
