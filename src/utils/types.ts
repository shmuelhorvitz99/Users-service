/* v8 ignore start */
export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {}; // eslint-disable-line @typescript-eslint/ban-types
