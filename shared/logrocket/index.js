import PublicEnv from 'shared/utils/public-env';
import LogRocket from 'logrocket';

import LogRocketEmulator from './logrocket-emulator';

const LogRocketForExport = PublicEnv.appEnv === 'production' ? LogRocket : LogRocketEmulator;
export default LogRocketForExport;
