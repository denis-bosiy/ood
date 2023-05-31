import { CImage } from "./CImage";
import { IImage } from "./IImage";

describe("test image", () => {
    test("arbitrary image creation should create right image", () => {
        const image: IImage = new CImage("document.html", 200, 300);

        expect(image.getPath()).toBe("document.html");
        expect(image.getWidth()).toBe(200);
        expect(image.getHeight()).toBe(300);
    });

    test("image creation with negative size should throw error", () => {
        expect(() => new CImage("document.html", -200, 300)).toThrowError("Width and height can not be negative");
    });

    test("image can be created with 0 width or 0 height", () => {
        const image: IImage = new CImage("document.html", 0, 0);

        expect(image.getPath()).toBe("document.html");
        expect(image.getWidth()).toBe(0);
        expect(image.getHeight()).toBe(0);
    });
});