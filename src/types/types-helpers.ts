export type Prettify<T> = {
  [K in keyof T]: T[K];
} & unknown;

export type DeepPrettify<T> = {
  [K in keyof T]: T[K] extends object ? DeepPrettify<T[K]> : T[K];
} & unknown;

export const objectKeys = <T extends object>(obj: T): Array<keyof T> => Object.keys(obj) as Array<keyof T>;
