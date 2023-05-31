import { CDocumentItem } from "./CDocumentItem";
import { IDocument } from "./IDocument";
import { IParagraph } from "./IParagraph";
import { CParagraph } from "./CParagraph";
import { IImage } from "./IImage";
import { CImage } from "./CImage";
import { IHistory } from "../IHistory";
import { CHTMLLayoutCreator } from "./CHTMLLayoutCreator";
import * as fs from "fs";

export class CDocument implements IDocument {
    private m_title: string;
    private m_items: CDocumentItem[];
    private m_history: IHistory;

    constructor(history: IHistory, title: string = "") {
        this.m_title = title;
        this.m_items = [];
        this.m_history = history;
    }

    public insertParagraph(text: string, position: number): IParagraph {
        const newParagraph: IParagraph = new CParagraph(text);

        this.m_items.splice(position, 0, new CDocumentItem(undefined, newParagraph));

        return newParagraph;
    }

    public insertImage(path: string, width: number, height: number, position: number): IImage {
        const newImage: IImage = new CImage(path, width, height);

        this.m_items.splice(position, 0, new CDocumentItem(newImage, undefined));

        return newImage;
    }

    public getItemsCount(): number {
        return this.m_items.length;
    }

    public getItem(index: number): CDocumentItem {
        if (index < 0 || index >= this.m_items.length) {
            throw new Error("Incorrect index. Index should be more positive and less than items count");
        }

        return this.m_items[index];
    }

    public deleteItem(index: number): void {
        if (index < 0 || index >= this.m_items.length) {
            throw new Error("Incorrect index. Index should be more positive and less than items count");
        }

        this.m_items.splice(index, 1);
    }

    public getTitle(): string {
        return this.m_title;
    }

    public setTitle(title: string): void {
        this.m_title = title;
    }

    public canUndo(): boolean {
        return this.m_history.canUndo();
    }

    public undo(): void {
        this.m_history.undo();
    }

    public canRedo(): boolean {
        return this.m_history.canRedo();
    }

    public redo(): void {
        this.m_history.redo();
    }

    public save(path: string): void {
        const htmlLayoutCreator: CHTMLLayoutCreator = new CHTMLLayoutCreator(this.getTitle());

        this.m_items.forEach((item: CDocumentItem) => {
            if (item && item.getImage()) {
                const image: IImage = item.getImage();
                htmlLayoutCreator.addImage(image.getPath(), image.getWidth(), image.getHeight());
            }
            if (item && item.getParagraph()) {
                const paragprah: IParagraph = item.getParagraph();
                htmlLayoutCreator.addParagraph(paragprah.getText());
            }
        });

        fs.writeFile(path, htmlLayoutCreator.createHTMLLayout(), function (err) {
            if (err) throw err;
        });
    }
}