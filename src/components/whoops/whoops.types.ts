export enum WhoopsReason {
  pageNotFound = 'notFound',
  serverError = 'serverError',
}

export type WhoopsProps = {
  reason: WhoopsReason;
};
