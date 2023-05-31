export class CRGBAColor {
    private m_redChannel: number;
    private m_greenChannel: number;
    private m_blueChannel: number;
    private m_alphaChannel: number;

    constructor(redChannel: number, greenChannel: number, blueChannel: number, alphaChannel: number) {
        this.m_redChannel = redChannel;
        this.m_greenChannel = greenChannel;
        this.m_blueChannel = blueChannel;
        this.m_alphaChannel = alphaChannel;
    }

    public toString(): string {
        return "rgba(" + this.m_redChannel + "," + this.m_greenChannel + "," + this.m_blueChannel + "," + this.m_alphaChannel + ")";
    }

    public getRedChannel(): number {
        return this.m_redChannel;
    }

    public getGreenChannel(): number {
        return this.m_greenChannel;
    }

    public getBlueChannel(): number {
        return this.m_blueChannel;
    }

    public getAlphaChannel(): number {
        return this.m_alphaChannel;
    }
}