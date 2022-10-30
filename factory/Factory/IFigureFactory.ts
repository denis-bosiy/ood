import { CFigure } from "../Figure/CFigure";

export interface IFigureFactory {
    createFigure(description: any[]): CFigure;
}