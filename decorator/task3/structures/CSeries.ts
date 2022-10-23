export class CSeries {
    public byte: Buffer;
    public count: number;

    constructor(byte: Buffer, count: number)
    {
        this.byte = byte;
        this.count = count;
    }
}