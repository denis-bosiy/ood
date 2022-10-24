export class CPoint {
    private m_x: number = 0;
    private m_y: number = 0;

    constructor(x: number, y: number) {
        this.m_x = x;
        this.m_y = y;
    }

    public x(): number {
        return this.m_x;
    }

    public y(): number {
        return this.m_y;
    }
}