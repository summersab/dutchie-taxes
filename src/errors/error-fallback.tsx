import React, { useEffect } from 'react';
import { FallbackProps } from 'react-error-boundary';

import { Whoops, WhoopsReason } from 'src/components/whoops';
import { GraphqlError, RouteParamsError, ProtectedRouteError } from './errors';

const getErrorReason = (error: Error): WhoopsReason => {
  if (error instanceof GraphqlError) {
    return WhoopsReason.serverError;
  }

  if (error instanceof RouteParamsError) {
    return WhoopsReason.pageNotFound;
  }

  if (error instanceof ProtectedRouteError) {
    return WhoopsReason.pageNotFound;
  }

  return WhoopsReason.serverError;
};

type UseErrorFallbackReturn = {
  reason: WhoopsReason;
};

function useErrorFallback({ error }: FallbackProps): UseErrorFallbackReturn {
  useEffect(() => {
    // TODO: log to datadog/rollbar?
    console.error(error);
  }, [error]);

  return {
    reason: getErrorReason(error),
  };
}

export function ErrorFallback(props: FallbackProps): JSX.Element {
  const { reason } = useErrorFallback(props);

  return <Whoops reason={reason} />;
}
