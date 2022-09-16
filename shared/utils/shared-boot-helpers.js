import LogRocket from 'shared/logrocket';
import PublicEnv from 'shared/utils/public-env';

/*
 * NOTE: Apollo grabs a reference to the network.  We need to instantiate
 * LogRocket before Apollo otherwise LogRocket can't see the graphql traffic.
 */
export function initLogRocket(logrocketId) {
  if (logrocketId) {
    try {
      LogRocket.init(logrocketId, {
        release: PublicEnv.herokuSlugCommit,
        dom: {
          inputSanitizer: true,
        },
        network: {
          isEnabled: true,
          requestSanitizer: (request) => {
            if (request?.headers?.authorization) {
              request.headers.authorization = 'redacted';
            }

            return request;
          },
        },
        mergeIframes: true,
      });
      console.info('LogRocket init completed');
    } catch (e) {
      console.error('Failed to load log rocket!', e);
    }
  }
}

export default {
  initLogRocket,
};
