import { IParagraph } from "./IParagraph";

export class CParagraph implements IParagraph {
    private m_text: string;

    constructor(text: string = "") {
        this.m_text = text;
    }

    public getText(): string {
        return this.m_text;
    }

    public setText(text: string): void {
        this.m_text = text;
    }
}