export class CEnclosure {
    private m_x0: number;
    private m_x1: number;

    constructor(x0: number, x1: number) {
        this.m_x0 = x0;
        this.m_x1 = x1;
    }

    public getX0(): number {
        return this.m_x0;
    }

    public getX1(): number {
        return this.m_x1;
    }
}