export interface IInputStream {
    isEof(): boolean;
    readByte(): Buffer;
    readBlock(dstBuffer: number[], size: number): number;
}