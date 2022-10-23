import { shuffle } from "../algorithms/shuffle";
import { IInputStream } from "./IInputStream";
import { InputStreamDecorator } from "./InputStreamDecorator";

export class CDecryptionDecorator extends InputStreamDecorator {
    private m_decryptTable: Map<number, number> = new Map<number, number>();
    private readonly ENCODING_TABLE_LENGTH: number = 256;

    constructor(inputStream: IInputStream, key: number) {
        super(inputStream);

        const array: number[] = [];
        for(let i = 0; i < this.ENCODING_TABLE_LENGTH; i++) {
            array.push(i);
        }
        shuffle(array, key);
        for (let i = 0; i < this.ENCODING_TABLE_LENGTH; i++) {
            this.m_decryptTable.set(array[i], i);
        }
    }

    public readByte(): Buffer {
        return this.decryptByte(this.m_inputStream.readByte());
    }

    public readBlock(dstBuffer: number[], size: number): number {
        const actualSize: number = this.m_inputStream.readBlock(dstBuffer, size);

        return this.decryptBlock(dstBuffer, actualSize);
    }

    protected decryptByte(byte: Buffer): Buffer {
        return Buffer.from([this.m_decryptTable.get(byte[0]) ?? byte[0]]);
    }

    protected decryptBlock(block: number[], size: number): number {
        for (let i = 0; i < size; i++) {
            block[i] = this.m_decryptTable.get(block[i]) ?? block[i];
        }

        return size;
    }
}