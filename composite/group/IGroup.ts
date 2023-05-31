import { IShape } from "../shapes/IShape";

export interface IGroup extends IShape {
    getShapesCount(): number;
    getShapeAtIndex(index: number): IShape;
    insertShape(shape: IShape, index: number): void;
    removeShapeAtIndex(index: number): void;
}