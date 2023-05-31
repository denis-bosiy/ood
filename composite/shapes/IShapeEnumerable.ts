import { IEnumerable } from "../enumerator/IEnumerable";
import { IShape } from "./IShape";

export interface IShapeEnumerable extends IShape, IEnumerable {
}