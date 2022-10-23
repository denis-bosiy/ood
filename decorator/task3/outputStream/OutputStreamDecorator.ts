import { IOutputStream } from "./IOutputStream";

export abstract class OutputStreamDecorator implements IOutputStream {
    protected m_outputStream: IOutputStream;

    constructor(outputStream: IOutputStream) {
        this.m_outputStream = outputStream;
    }

    public abstract writeByte(byte: Buffer): void;

    public abstract writeBlock(block: Buffer, size: number): void;

    public abstract finishTransmitting(): void;
}