import { CHTMLLayoutCreator } from "./CHTMLLayoutCreator";

describe("test HTMLLayoutCreator", () => {
    test("add paragraph should add paragraph correctly", () => {
        const htmlLayoutCreator: CHTMLLayoutCreator = new CHTMLLayoutCreator();

        htmlLayoutCreator.addParagraph("paragraph text");

        expect(htmlLayoutCreator.createHTMLLayout()).toContain("<div>paragraph text</div>");
    });

    test("add image should add image correctly", () => {
        const htmlLayoutCreator: CHTMLLayoutCreator = new CHTMLLayoutCreator();

        htmlLayoutCreator.addImage("document.html", 200, 300);

        expect(htmlLayoutCreator.createHTMLLayout()).toContain("<img src=\"document.html\" width=\"200\" height=\"300\" />");
    });
});