export type ArrayOfOneOrMore<T> = {
    0: T
} & Array<T>