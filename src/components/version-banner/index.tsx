import React from 'react';

import { UpdateBanner } from 'src/components/update-banner';
import { useVersionCheck } from './use-version-check';

type Props = {
  currentVersion: string;
};

export function VersionBanner(props: Props): JSX.Element | null {
  const { currentVersion } = props;
  const { hasLatestVersion, onReload } = useVersionCheck(currentVersion);

  if (!currentVersion || hasLatestVersion) {
    return null;
  }

  return (
    <UpdateBanner buttonText='Refresh' heading='A new version of Dutchie is available.' onClick={onReload}>
      We've released a new version of Dutchie. Click the button on the right to make sure you're running the latest
      code.
    </UpdateBanner>
  );
}
