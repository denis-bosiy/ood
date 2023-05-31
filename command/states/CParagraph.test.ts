import { CParagraph } from "./CParagraph";
import { IParagraph } from "./IParagraph";

describe("test paragraph", () => {
    test("empty paragraph should containt empty text", () => {
        const paragraph: IParagraph = new CParagraph();

        expect(paragraph.getText()).toBe("");
    });

    test("paragraph with empty string should containt empty string", () => {
        const paragraph: IParagraph = new CParagraph("");

        expect(paragraph.getText()).toBe("");
    });

    test("paragraph should be able to containt arbitrary text", () => {
        const paragraph: IParagraph = new CParagraph("Persona non grata");

        expect(paragraph.getText()).toBe("Persona non grata");
    });
});