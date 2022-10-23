import { IInputStream } from "./IInputStream";
import { existsSync, mkdir, readFileSync } from "fs";

export class CFileInputStream implements IInputStream {
    private m_bytes: Buffer;
    private m_currentIndex: number = 0;

    constructor(path: string) {
        if (!existsSync(path)) {
            throw new Error(`File on path = "${path}" is not exists`);
        }

        const fileContent: Buffer = readFileSync(path);
        this.m_bytes = Buffer.from(fileContent);
    }

    public isEof(): boolean {
        return this.m_currentIndex >= this.m_bytes.length;
    }

    public readByte(): Buffer {
        if (this.isEof()) {
            throw new Error("Can not read byte. Detected end of file");
        }

        return Buffer.from([this.m_bytes[this.m_currentIndex++]]);
    }

    public readBlock(dstBuffer: number[], size: number): number {
        let i = 0;
        while (i < size && !this.isEof()) {
            try {
                dstBuffer[i] = this.readByte()[0];
            } catch (e) {
                throw e;
            }
            i++;
        }

        return i;
    }
}