import { ICanvas } from "../Canvas/ICanvas";
import { IDrawableFigure } from "./IDrawableFigure";

// TODO: выделить в отдельный файл Color
export enum Color {
    Red,
    Green,
    Blue,
    Pink,
    Yellow,
    Black
};

export const getColorString = (color: Color): string => {
    switch (color) {
        case Color.Red:
            return "red";
        case Color.Green:
            return "green";
        case Color.Blue:
            return "blue";
        case Color.Pink:
            return "pink";
        case Color.Yellow:
            return "yellow";
        case Color.Black:
            return "black";
        default:
            return "";
    }
}

export abstract class CFigure implements IDrawableFigure {
    // TODO: protected -> private
    protected m_color: Color;

    constructor(color: Color) {
        this.m_color = color;
    }

    abstract draw(canvas: ICanvas): void;

    public get color(): Color {
        return this.m_color;
    }
}