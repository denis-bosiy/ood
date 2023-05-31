import { IImage } from "./IImage";

export class CImage implements IImage {
    private m_path: string;
    private m_width: number;
    private m_height: number;

    constructor(path: string, width: number, height: number) {
        if (width < 0 || height < 0) {
            throw new Error("Width and height can not be negative");
        }

        this.m_path = path;
        this.m_width = width;
        this.m_height = height;
    }

    public getPath(): string {
        return this.m_path;
    }

    public getWidth(): number {
        return this.m_width;
    }

    public getHeight(): number {
        return this.m_height;
    }

    public resize(width: number, height: number): void {
        this.m_width = width;
        this.m_height = height;
    }
}