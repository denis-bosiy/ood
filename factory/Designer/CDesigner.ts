import { CLayout } from "../Clayout";
import { CEllipseArgs, Parser, CRectangleArgs, CTriangleArgs, CCrossArgs } from "../Parser";
import { IDesigner } from "./IDesigner";
import { CFigure } from "../Figure/CFigure";
import { IFigureFactory } from "../Factory/IFigureFactory";
import LineByLineReader from "line-by-line";

enum AvailableFigures {
    Ellipse = "ellipse",
    Rectangle = "rectangle",
    Triangle = "triangle",
    Cross = "cross"
};

export class CDesigner implements IDesigner {
    private m_figureFactory: IFigureFactory;

    private recogniseFigure(args: string[]): CFigure | null {
        let figure: CFigure | null = null;

        switch (args[0]) {
            case AvailableFigures.Ellipse:
                const ellipseArgs: CEllipseArgs = Parser.parseEllipseArgs(args);
                figure = this.m_figureFactory.createFigure([AvailableFigures.Ellipse, ellipseArgs.centerPoint, ellipseArgs.largeSemiAxis, ellipseArgs.smallSemiAxis, ellipseArgs.color]);
                break;
            case AvailableFigures.Rectangle:
                const rectangleArgs: CRectangleArgs = Parser.parseRectangleArgs(args);
                figure = this.m_figureFactory.createFigure([AvailableFigures.Rectangle, rectangleArgs.leftTopPoint, rectangleArgs.width, rectangleArgs.height, rectangleArgs.color]);
                break;
            case AvailableFigures.Triangle:
                const triangleArgs: CTriangleArgs = Parser.parseTriangleArgs(args);
                figure = this.m_figureFactory.createFigure([AvailableFigures.Triangle, triangleArgs.points, triangleArgs.color]);
                break;
            case AvailableFigures.Cross:
                const crossArgs: CCrossArgs = Parser.parseCrossArgs(args);
                figure = this.m_figureFactory.createFigure([AvailableFigures.Cross, crossArgs.centerPoint, crossArgs.length, crossArgs.color]);
                break;
            default:
                throw new Error("Incorrect figure name");
        }

        return figure;
    }
    constructor(figureFactory: IFigureFactory) {
        this.m_figureFactory = figureFactory;
    }

    public getLayout(stream: LineByLineReader): Promise<CLayout> {
        return new Promise((resolve, reject) => {
            const layout: CLayout = new CLayout();

            const processStreamsFigures = (line: string) => {
                if (line === "stop") {
                    stream.off("line", processStreamsFigures);
                    console.log("Stopped painting");
                    resolve(layout);
                    return;
                }
                try {
                    const args = line.split(" ");
                    let createdFigure: CFigure | null = this.recogniseFigure(args);
                    if (createdFigure) {
                        layout.addFigure(createdFigure);
                    }
                } catch (e: any) {
                    console.log(String(e));
                }
            }
            stream.on("line", processStreamsFigures);
            stream.on("end", () => resolve(layout));
            stream.on("error", (e) => reject(e));
        })
    }
}