import { IDocument } from "../states/IDocument";
import { CAbstractCommand } from "./CAbstractCommand";

export class CSetTitleCommand extends CAbstractCommand {
    private m_document: IDocument;
    private m_title: string;
    private m_previousTitle: string;

    constructor(document: IDocument, title: string) {
        super();

        this.m_document = document;
        this.m_title = title;
    }

    protected doExecute(): void {
        this.m_previousTitle = this.m_document.getTitle();
        this.m_document.setTitle(this.m_title);
    }

    protected doUnexecute(): void {
        this.m_document.setTitle(this.m_previousTitle);
    }
}