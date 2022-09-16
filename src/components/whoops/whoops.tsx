import React from 'react';

import { WhoopsProps } from './whoops.types';
import { WhoopsContent } from './content';

export function Whoops({ reason }: WhoopsProps): JSX.Element {
  return <WhoopsContent reason={reason} />;
}
