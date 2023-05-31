import { IEnumerable } from "./IEnumerable";

export interface IEnumerator {
    reset(): void;
    hasNext(): boolean;
    next(): IEnumerable;
}