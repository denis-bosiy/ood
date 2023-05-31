import { CDocument } from "../states/CDocument";
import { CHistory } from "../CHistory";
import { CInsertImageCommand } from "./CInsertImageCommand";
import { CInsertParagraphCommand } from "./CInsertParagraphCommand";
import { CResizeImageCommand } from "./CResizeImageCommand";

describe("test resize image command", () => {
    const log = console.log;

    beforeEach(() => {
        console.log = jest.fn();
    });

    afterAll(() => {
        console.log = log;
    });

    test("execute resize image command at image", () => {
        const mockHistory: CHistory = new CHistory();
        const mockDocument: CDocument = new CDocument(mockHistory);
        const insertImageCommand: CInsertImageCommand = new CInsertImageCommand(mockDocument, "document.html", 10, 20, 0);
        const resizeImageCommand: CResizeImageCommand = new CResizeImageCommand(mockDocument, 30, 40, 0);

        insertImageCommand.execute();
        resizeImageCommand.execute();

        expect(mockDocument.getItemsCount()).toBe(1);
        expect(mockDocument.getItem(0).getImage().getWidth()).toBe(30);
        expect(mockDocument.getItem(0).getImage().getHeight()).toBe(40);
    });

    test("execute resize image command at paragraph", () => {
        const mockHistory: CHistory = new CHistory();
        const mockDocument: CDocument = new CDocument(mockHistory);
        const insertParagraphCommand: CInsertParagraphCommand = new CInsertParagraphCommand(mockDocument, "default text", 0);
        const resizeImageCommand: CResizeImageCommand = new CResizeImageCommand(mockDocument, 30, 40, 0);

        insertParagraphCommand.execute();

        expect(() => resizeImageCommand.execute()).toThrowError("Item in the position is not an image");
    });

    test("execute resize image command at nonexistent item", () => {
        const mockHistory: CHistory = new CHistory();
        const mockDocument: CDocument = new CDocument(mockHistory);
        const resizeImageCommand: CResizeImageCommand = new CResizeImageCommand(mockDocument, 30, 40, 0);

        expect(() => resizeImageCommand.execute()).toThrowError("Incorrect item position");
    });
});