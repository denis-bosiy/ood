import { IInputStream } from "./IInputStream";

export class CFileMemoryInputStream implements IInputStream {
    private m_memory: Buffer;
    private m_currentIndex: number = 0;

    constructor(memory: Buffer) {
        this.m_memory = Buffer.from(memory);
    }

    public isEof(): boolean {
        return this.m_currentIndex >= this.m_memory.length;
    }

    public readByte(): Buffer {
        if (this.isEof()) {
            throw new Error("Can not read byte. Detected end of file");
        }

        return Buffer.from([this.m_memory[this.m_currentIndex++]]);
    }

    public readBlock(dstBuffer: number[], size: number): number {
        for (let i = 0; i < size; i++) {
            try {
                dstBuffer[i] = this.readByte()[0];
            } catch (e) {
                throw e;
            }
        }

        return size;
    }
}