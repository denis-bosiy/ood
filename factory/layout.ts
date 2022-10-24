import { CFigure } from "./Figure/CFigure";

export class CLayout {
    private m_figures: CFigure[] = [];

    constructor() {
    }

    public addFigure(figure: CFigure): void {
        this.m_figures.push(figure);
    }

    public get figures(): CFigure[] {
        return this.m_figures;
    }
}