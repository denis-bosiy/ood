import { CDocumentItem } from "./CDocumentItem";
import { IImage } from "./IImage";
import { IParagraph } from "./IParagraph";

export interface IDocument {
    insertParagraph(text: string, position: number): IParagraph;
    insertImage(path: string, width: number, height: number, position: number): IImage;
    getItemsCount(): number;
    getItem(index: number): CDocumentItem;
    deleteItem(index: number): void;
    getTitle(): string;
    setTitle(title: string): void;
    canUndo(): boolean;
    undo(): void;
    canRedo(): boolean;
    redo(): void;
    save(path: string): void;
}