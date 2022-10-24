import { readline } from "../libs";
import { CLayout } from "../layout";
import { CEllipseArgs, Parser, CRectangleArgs, CTriangleArgs, CCrossArgs } from "../parser";
import { IDesigner } from "./IDesigner";
import { CFigure } from "../Figure/CFigure";
import { IFigureFactory } from "../Factory/IFigureFactory";

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
                figure = this.m_figureFactory.createEllipse(ellipseArgs.centerPoint, ellipseArgs.largeSemiAxis, ellipseArgs.smallSemiAxis, ellipseArgs.color);
                break;
            case AvailableFigures.Rectangle:
                const rectangleArgs: CRectangleArgs = Parser.parseRectangleArgs(args);
                figure = this.m_figureFactory.createRectangle(rectangleArgs.leftTopPoint, rectangleArgs.width, rectangleArgs.height, rectangleArgs.color);
                break;
            case AvailableFigures.Triangle:
                const triangleArgs: CTriangleArgs = Parser.parseTriangleArgs(args);
                figure = this.m_figureFactory.createTriangle(triangleArgs.points, triangleArgs.color);
                break;
            case AvailableFigures.Cross:
                const crossArgs: CCrossArgs = Parser.parseCrossArgs(args);
                figure = this.m_figureFactory.createCross(crossArgs.centerPoint, crossArgs.length, crossArgs.color);
                break;
            default:
                throw new Error("Incorrect figure name");
        }

        return figure;
    }
    constructor(figureFactory: IFigureFactory) {
        this.m_figureFactory = figureFactory;
    }

    public async getLayout(stream: readline.Interface): Promise<CLayout> {
        return new Promise((resolve, reject) => {
            const layout: CLayout = new CLayout();

            const processStreamsFigures = (line: string) => {
                if (line === "stop") {
                    resolve(layout);
                    stream.off("line", processStreamsFigures);
                    console.log("Stopped painting");
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
        })
    }
}