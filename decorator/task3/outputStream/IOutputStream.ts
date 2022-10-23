export interface IOutputStream {
    writeByte(data: Buffer): void;
    writeBlock(block: Buffer, size: number): void;
    finishTransmitting(): void;
}