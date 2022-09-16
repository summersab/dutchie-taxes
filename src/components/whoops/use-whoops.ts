import { WhoopsReason } from './whoops.types';

type UseWhoopsCopyParams = {
  reason: WhoopsReason;
};

type UseWhoopsCopyReturn = {
  topText: string;
  bottomText?: string;
  buttonText: string;
  onButtonClick: () => void;
};

function useWhoopsConfig({ reason }: UseWhoopsCopyParams): UseWhoopsCopyReturn {
  if (reason === WhoopsReason.pageNotFound) {
    return {
      topText: `We're sorry, we couldn't find the page you were looking for!`,
      bottomText: `It looks like the page you requested doesn't exist.`,
      buttonText: `Go Back`,
      onButtonClick: () => window.history.back(),
    };
  }

  return {
    topText: `We're sorry, something went wrong.`,
    buttonText: `Try Again`,
    onButtonClick: () => window.location.reload(),
  };
}

export function useWhoops(reason: WhoopsReason): UseWhoopsCopyReturn {
  const whoopsConfig = useWhoopsConfig({ reason });

  return whoopsConfig;
}
