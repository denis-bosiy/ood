import { CSeries } from "../structures/CSeries";
import { OutputStreamDecorator } from "./OutputStreamDecorator";

export class CCompressDecorator extends OutputStreamDecorator {
    private m_series: CSeries = new CSeries(Buffer.alloc(1), 0);

    public writeByte(byte: Buffer): void {
        if (this.m_series.count === 0) {
            this.m_series = new CSeries(byte, 1);
        } else {
            if (this.m_series.byte[0] === byte[0]) {
                this.m_series.count++;
            } else {
                this.m_outputStream.writeByte(Buffer.from([this.m_series.count]));
                this.m_outputStream.writeByte(this.m_series.byte);

                this.m_series = new CSeries(byte, 1);
            }
        }
    }

    public writeBlock(block: Buffer, size: number): void {
        for (let i = 0; i < size; i++) {
            this.writeByte(Buffer.from([block[i]]));
        }
    }

    public finishTransmitting(): void {
        if (this.m_series.count != 0) {
            this.m_outputStream.writeByte(Buffer.from([this.m_series.count]));
            this.m_outputStream.writeByte(this.m_series.byte);

            this.m_series = new CSeries(Buffer.alloc(1), 0);
        }
    }
}