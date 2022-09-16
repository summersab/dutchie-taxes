import { useEffect } from 'react';
import amplitude from 'amplitude-js';

import PublicEnv from 'shared/utils/public-env';
import { useDispensary } from 'src/hooks/use-dispensary';
import { useUser } from 'src/hooks/use-user';

const amplitudeClient = amplitude.getInstance();
amplitudeClient.init(PublicEnv.amplitudeApiKey);
amplitudeClient.setVersionName(PublicEnv.herokuSlugCommit);

type TrackMetadataProps = {
  email: string;
  dispensaryId: string;
  dispensaryName: string;
};

const trackMetadata = ({ email, dispensaryId, dispensaryName }: TrackMetadataProps): void => {
  amplitudeClient.setUserId(email);
  // we may want to adjust this later for chain admins
  if (dispensaryId && dispensaryName) {
    amplitudeClient.setGroup('dispensary', dispensaryId);
    const groupIdentify = new amplitude.Identify().set('dispensaryName', dispensaryName);
    amplitude.getInstance().groupIdentify('dispensary', dispensaryId, groupIdentify);
  }
};

// eslint-disable-next-line no-shadow
export enum AmplitudeCategory {
  analytics = 'analytics',
  customize = 'customize',
  reporting = 'reporting',
}

type LogData = Record<string, string>;
type LogEvent = string;
type LogFunc = (event: LogEvent, data: LogData) => void;

type LogDataObj = {
  event: LogEvent;
  data: LogData;
};

type AmplitudeUtil = {
  log: LogFunc;
};

// shared across multiple useAmplitude instances
let queue: LogDataObj[] = [];

function processLog({ event, data }: LogDataObj): void {
  amplitudeClient.logEvent(event, data);
}

function processQueue(): void {
  const toProcess = queue;
  queue = [];
  toProcess.forEach(processLog);
}

const queuedAmplitude: AmplitudeUtil = {
  log(event, data) {
    queue.push({ event, data });
  },
};

const liveAmplitude: AmplitudeUtil = {
  log(event, data) {
    processLog({ event, data });
  },
};

export function useAmplitude(): AmplitudeUtil {
  const { name: dispensaryName, id: dispensaryId } = useDispensary();
  const { email } = useUser();

  useEffect(() => {
    if (email && dispensaryId && dispensaryName) {
      trackMetadata({ email, dispensaryId, dispensaryName });
      processQueue();
    }
  }, [email, dispensaryId, dispensaryName]);

  const isAmplitudeLive = !!(dispensaryName && dispensaryId && email);
  return isAmplitudeLive ? liveAmplitude : queuedAmplitude;
}
