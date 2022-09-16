/* eslint-disable max-classes-per-file */
import { ApolloError } from 'apollo-client';

export class GraphqlError extends Error {
  constructor(error: ApolloError) {
    super(error.message);
  }
}

type RouteParams = Record<string, string[] | string | undefined>;

export class RouteParamsError extends Error {
  constructor(params: RouteParams) {
    super(`invalid route params: { ${RouteParamsError.formatParams(params)} }`);
  }

  static formatParams(params: RouteParams): string {
    return Object.entries(params)
      .map(([key, value]) => `${key}: ${String(value)}`)
      .join(', ');
  }
}

export class ProtectedRouteError extends Error {
  constructor(protectedRouteReason: string) {
    super(`protected route: ${protectedRouteReason}`);
  }
}
