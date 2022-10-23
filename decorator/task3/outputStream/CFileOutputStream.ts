import { IOutputStream } from "./IOutputStream";
import { createWriteStream, WriteStream } from "fs";

export class CFileOutputStream implements IOutputStream {
    private m_fileOutputStream: WriteStream;

    constructor(path: string) {
        this.m_fileOutputStream = createWriteStream(path);
    }

    public writeByte(byte: Buffer): void {
        for (let i = 0; i < byte.byteLength; i++) {
            this.m_fileOutputStream.write(Buffer.from([byte[i]]));
        }
    }

    public writeBlock(block: Buffer, size: number): void {
        const writeBuffer = Buffer.alloc(size);
        for (let i = 0; i < size; i++) {
            writeBuffer[i] = block[i];
        }
        this.m_fileOutputStream.write(writeBuffer);
    }

    public finishTransmitting(): void {
        
    }
}