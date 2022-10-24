import { stdin, stdout } from "process";
import { CDesigner } from "./CDesigner";
import {readline} from "../libs";
import { CFigureFactory } from "../Factory/CFigureFactory";

describe("test designer", () => {
    const log = console.log;
  
    beforeEach(() => {
      console.log = jest.fn();
    });
  
    afterAll(() => {
      console.log = log;
    });

    test("incorrect figure name should return error", () => {
        jest.spyOn(readline, 'createInterface').mockImplementationOnce(() => {
            return ['text1'] as any
        });
        const designer: CDesigner = new CDesigner(new CFigureFactory());

        designer.getLayout(readline.createInterface(stdin, stdout)).then(() => {
            expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Type Error: Incorrect figure name");
        });
    });

    test("incorrect args count should return error", () => {
        jest.spyOn(readline, 'createInterface').mockImplementationOnce(() => {
            return ['ellipse 1 2 3 4 5 6 7'] as any
        });
        const designer: CDesigner = new CDesigner(new CFigureFactory());

        designer.getLayout(readline.createInterface(stdin, stdout)).then(() => {
            expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Type Error: Incorrect args count");
        });
    });

    test("incorrect number arg should return error", () => {
        jest.spyOn(readline, 'createInterface').mockImplementationOnce(() => {
            return ['ellipse a 2 3 4 red'] as any
        });
        const designer: CDesigner = new CDesigner(new CFigureFactory());

        designer.getLayout(readline.createInterface(stdin, stdout)).then(() => {
            expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Type Error: First parameter should be number");
        });
    });

    test("incorrect color arg should return error", () => {
        jest.spyOn(readline, 'createInterface').mockImplementationOnce(() => {
            return ['ellipse 1 2 3 4 bl'] as any
        });
        const designer: CDesigner = new CDesigner(new CFigureFactory());

        designer.getLayout(readline.createInterface(stdin, stdout)).then(() => {
            expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Type Error: Incorrect color name");
        });
    });
})