export type Nullish = null | undefined;

/**
 * Excludes null and undefined types from a type so you can reference its
 * properties.
 *
 * e.g.
 * type Foo = { Bar?: { Bing: string} };
 *
 * // Does not work because Foo['Bar'] could be undefined
 * type BingType = Foo['Bar']['Bing']
 *
 * // Works because the undefined case is excluded
 * type BingType = WhenNotVoid<Foo['Bar']>['Bing']
 */
export type WhenNotVoid<T> = T extends Nullish ? never : T;

/**
 * A safe alternative to {}.
 *
 * See https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-675156492
 * and https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md
 */
export type EmptyObject = Record<string, undefined>;

/**
 * Utility for excluding __typename from types that are generated from another type's keys
 */
export type ExcludeTypename<GraphqlType> = Exclude<keyof GraphqlType, '__typename'>;

/**
 * Type guard for stripping EmptyObject from a union type.
 *
 * e.g.
 * const foo: Foo | EmptyObject = ...;
 * if (!isEmptyRecord(foo)} {
 *   ... foo is Foo ...
 * }
 */
export const isEmptyRecord = <T extends Record<string, unknown>>(object: EmptyObject | T): object is EmptyObject =>
  typeof object === 'object' && Object.keys(object).length === 0;

/**
 * Utility error for exhaustive switch/if checks.
 *
 * The compiler will detect whether cases beyond those handled occur.
 *
 * e.g.
 * const x: 'one' | 'two' | 'three' = 'two';
 * switch (x) {
 *   case 'one': return 1;
 *   case 'two': return 2;
 *   case 'three': return 3;
 *
 *  // will complain at compile-time if 'four' is added to x's type
 *   default: throw new UnreachableError(x);
 * }
 *
 * See http://ideasintosoftware.com/exhaustive-switch-in-typescript/
 */
export class UnreachableError extends Error {
  constructor(value: never) {
    // eslint-disable-next-line i18next/no-literal-string
    console.error('Unreachable value:', value);

    // rationale: a JS fallback in case the never is ignored by the compiler
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    super(`Unexpected value encountered: ${value}`);
  }
}

/**
 * Type guard for narrowing a value that could be nullish to nullish.
 */
export function isNullish<T>(value: Nullish | T): value is Nullish {
  return value === null || value === undefined;
}

/**
 * Type guard for eliminating null and undefined from a type.
 *
 * Especially useful for array filters.
 */
export function isNotNullish<T>(value: Nullish | T): value is T {
  return !isNullish(value);
}

/**
 * Type guard for determining a value is an object.
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return isNotNullish(value) && typeof value === 'object';
}

/**
 * Assume the values in an object T exist.
 * Makes working with graphql Maybe types easier:
 *
 *
 * AssumeExists<{
 *  foo?: Maybe<string> | undefined
 * }> === {
 *  foo: string
 * }
 */
export type AssumeExists<T extends Record<string, unknown>> = {
  [P in keyof Omit<T, '__typename'>]-?: WhenNotVoid<T[P]>;
};

/**
 * Merges T2 type into T1, Overriding any colliding properties in T1 with properties from T2
 */
export type Merge<T1, T2> = Omit<T1, keyof T2> & T2;

/*
  When defining a styled component's .defaultProps, you may run into type errors
  if using a theme that is strongly typed. This is a helper function to set default props
  without upsetting TypeScript.

  C: Component Type
  D: Default Props Type

  These will be inferred from the function parameters so you likely will not need to specify them

  For more information and example usage, see:
  https://dutchie.atlassian.net/wiki/spaces/FP/pages/19719291293/Strongly+Typed+Styled-Components+Theme
*/
type WithDefaultProps<C, D> = C & { defaultProps: D };

export function withDefaultProps<C, D>(component: C, defaultProps: D): WithDefaultProps<C, D> {
  (component as WithDefaultProps<C, D>).defaultProps = defaultProps;
  return component as WithDefaultProps<C, D>;
}

export type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> & Partial<Pick<Type, Key>>;
