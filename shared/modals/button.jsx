import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { Flex } from 'rebass';
import { Button, Tooltip } from 'shared/components';

const ButtonContainer = styled(Flex)`
  position: relative;
  flex-shrink: ${(props) => props.flexShrink};
`;

export default observer((
  /** @type any */ {
    children,
    width = [1, 1, 1, 'auto'],
    mt = [20],
    mb = [0],
    loading = false,
    alignSelf = 'auto',
    alignItems = 'center',
    buttonContainerWidth = '100%',
    inverted = false,
    link = false,
    tooltip,
    flexShrink = '0',
    ...props
  }
) => (
  <ButtonContainer
    width={buttonContainerWidth}
    mt={mt}
    mb={mb}
    flexDirection='column'
    alignItems={alignItems}
    justifyContent='center'
    alignSelf={alignSelf}
    flexShrink={flexShrink}
    className='modal-button-container'
  >
    {!tooltip && (
      <Button width={width} loading={loading} inverted={inverted} link={link} {...props}>
        {children}
      </Button>
    )}
    {tooltip && (
      <Tooltip
        mainCopy={
          <Button width={width} loading={loading} inverted={inverted} link={link} {...props}>
            {children}
          </Button>
        }
        tooltipCopy={tooltip}
        hoverMain
        right='-29px'
        bottom='44px'
      />
    )}
  </ButtonContainer>
));
