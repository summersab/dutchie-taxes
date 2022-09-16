import React from 'react';
import styled from 'styled-components';
import RichTextHtmlWrapper from 'shared/components/rich-text-html-wrapper';

type DisclaimerProps = {
  disclaimerHtml: string;
};

export const TEST_ID_DISCLAIMER = 'disclaimer';

export function Disclaimer({ disclaimerHtml }: DisclaimerProps): JSX.Element {
  return (
    <DisclaimerWrapper data-testid={TEST_ID_DISCLAIMER}>
      <RichTextHtmlWrapper html={disclaimerHtml} className='preview-disclaimer' />
    </DisclaimerWrapper>
  );
}

const DisclaimerWrapper = styled.div`
  color: #677882;
  font-size: 10px;
  line-height: 1.4;
  margin: 50px auto;
  max-width: 900px;
  padding: 0 25px;
  text-align: center;
`;
