import { CDocument } from "../states/CDocument";
import { CHistory } from "../CHistory";
import { CInsertImageCommand } from "./CInsertImageCommand";
import { CInsertParagraphCommand } from "./CInsertParagraphCommand";
import { CReplaceTextCommand } from "./CReplaceTextCommand";

describe("test replace text command", () => {
    const log = console.log;

    beforeEach(() => {
        console.log = jest.fn();
    });

    afterAll(() => {
        console.log = log;
    });

    test("execute replace text command at paragraph", () => {
        const mockHistory: CHistory = new CHistory();
        const mockDocument: CDocument = new CDocument(mockHistory);
        const insertParagraphCommand: CInsertParagraphCommand = new CInsertParagraphCommand(mockDocument, "default text", 0);
        const replaceTextCommand: CReplaceTextCommand = new CReplaceTextCommand(mockDocument, "replaced text", 0);

        insertParagraphCommand.execute();
        replaceTextCommand.execute();

        expect(mockDocument.getItemsCount()).toBe(1);
        expect(mockDocument.getItem(0).getParagraph().getText()).toBe("replaced text");
    });

    test("execute replace text command at image", () => {
        const mockHistory: CHistory = new CHistory();
        const mockDocument: CDocument = new CDocument(mockHistory);
        const insertImageCommand: CInsertImageCommand = new CInsertImageCommand(mockDocument, "document.html", 20, 30, 0);
        const replaceTextCommand: CReplaceTextCommand = new CReplaceTextCommand(mockDocument, "replaced text", 0);

        insertImageCommand.execute();

        expect(() => replaceTextCommand.execute()).toThrowError("Item in the position is not a paragraph");
    });

    test("execute replace text command at nonexistent item", () => {
        const mockHistory: CHistory = new CHistory();
        const mockDocument: CDocument = new CDocument(mockHistory);
        const replaceTextCommand: CReplaceTextCommand = new CReplaceTextCommand(mockDocument, "replaced text", 0);

        expect(() => replaceTextCommand.execute()).toThrowError("Incorrect item position");
    });
});