import { IInputStream } from "./IInputStream";

export abstract class InputStreamDecorator implements IInputStream {
    protected m_inputStream: IInputStream;

    constructor(inputStream: IInputStream) {
        this.m_inputStream = inputStream;
    }

    public isEof(): boolean {
        return this.m_inputStream.isEof();
    }

    public abstract readByte(): Buffer;

    public abstract readBlock(dstBuffer: number[], size: number): number;
}