import { IOutputStream } from "./IOutputStream";

export class CMemoryOutputStream implements IOutputStream {
    private m_memory: Buffer;
    private m_currIndex: number;
    private m_size: number;

    constructor(memory: Buffer) {
        this.m_memory = Buffer.from(memory);
        this.m_currIndex = 0;
        this.m_size = memory.length;
    }

    public writeByte(byte: Buffer): void {
        if (this.m_currIndex >= this.m_size) {
            throw new Error("Memory allocation error. Not enough space in memory");
        }

        for (let i = 0; i < byte.byteLength; i++) {
            this.m_memory[this.m_currIndex] = byte[i];
            this.m_currIndex++;
        }
    }

    public writeBlock(block: Buffer, size: number): void {
        if (this.m_currIndex + size >= this.m_size) {
            throw new Error("Memory allocation error. Not enough space in memory");
        }

        for (let i = 0; i < size; i++) {
            this.m_memory[this.m_currIndex] = block[i];
            this.m_currIndex++;
        }
    }

    public finishTransmitting(): void {
        
    }
}