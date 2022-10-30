import { CDesigner } from "./CDesigner";
import LineByLineReader from "line-by-line";
import { CFigureFactory } from "../Factory/CFigureFactory";

describe("test designer", () => {
    const log = console.log;
  
    beforeEach(() => {
      console.log = jest.fn();
    });
  
    afterAll(() => {
      console.log = log;
    });

    test("correct ellipse should not return error", async () => {
        const designer: CDesigner = new CDesigner(new CFigureFactory());

        await designer.getLayout(new LineByLineReader("factory/testFiles/CDesigner/correctEllipse.txt"));

        expect((console.log as jest.Mock).mock.calls.length).toBe(0);
    });

    test("correct rectangle should not return error", async () => {
        const designer: CDesigner = new CDesigner(new CFigureFactory());

        await designer.getLayout(new LineByLineReader("factory/testFiles/CDesigner/correctRectangle.txt"));

        expect((console.log as jest.Mock).mock.calls.length).toBe(0);
    });

    test("correct triangle should not return error", async () => {
        const designer: CDesigner = new CDesigner(new CFigureFactory());

        await designer.getLayout(new LineByLineReader("factory/testFiles/CDesigner/correctTriangle.txt"));

        expect((console.log as jest.Mock).mock.calls.length).toBe(0);
    });

    test("correct cross should not return error", async () => {
        const designer: CDesigner = new CDesigner(new CFigureFactory());

        await designer.getLayout(new LineByLineReader("factory/testFiles/CDesigner/correctCross.txt"));

        expect((console.log as jest.Mock).mock.calls.length).toBe(0);
    });

    test("incorrect figure name should return error", async () => {
        const designer: CDesigner = new CDesigner(new CFigureFactory());

        await designer.getLayout(new LineByLineReader("factory/testFiles/CDesigner/incorrectFigureName.txt"));

        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Error: Incorrect figure name");
    });

    test("incorrect args count should return error", async () => {
        const designer: CDesigner = new CDesigner(new CFigureFactory());

        await designer.getLayout(new LineByLineReader("factory/testFiles/CDesigner/incorrectFigureArgsCount.txt"));

        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Error: Incorrect args count");
    });

    test("incorrect number arg should return error", async () => {
        const designer: CDesigner = new CDesigner(new CFigureFactory());

        await designer.getLayout(new LineByLineReader("factory/testFiles/CDesigner/incorrectFigureNumberArg.txt"));

        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Error: First parameter should be number");
    });

    test("incorrect color arg should return error", async () => {
        const designer: CDesigner = new CDesigner(new CFigureFactory());

        await designer.getLayout(new LineByLineReader("factory/testFiles/CDesigner/incorrectFigureColorArg.txt"));

        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Error: Incorrect color name");
    });
})