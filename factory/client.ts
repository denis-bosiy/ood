import { IDesigner } from "./designer/IDesigner";
import { CDesigner } from "./designer/CDesigner";
import { ICanvas } from "./canvas/ICanvas";
import { CPainter } from "./painter";
import { CLayout } from "./layout";
import { exit } from "process";
import { readline } from "./libs";
import { CFigureFactory } from "./Factory/CFigureFactory";

export class CClient {
    private m_canvas: ICanvas;
    private m_readableStream: readline.Interface;

    private async getDesignersPainting(desinger: IDesigner, painter: CPainter): Promise<CLayout> {
        return new Promise<CLayout>(async (resolve, reject) => {
            const layout: CLayout = await desinger.getLayout(this.m_readableStream);
            painter.drawPainting(layout, this.m_canvas);
            resolve(layout);
        });
    }

    private printHelpMessage(): void {
        console.log("-----------------------------");
        console.log("Available commands:");
        console.log("paint - to paint picture");
        console.log("stop - to stop painting");
        console.log("clear - clear canvas");
        console.log("save - save image");
        console.log("help - print help message");
        console.log("exit - close the program");
        console.log("Available figures:");
        console.log("ellipse <center point X> <center point Y> <large semi axis> <small semi axis> <color>");
        console.log("rectangle <left top point x> <left top point y> <width> <height> <color>");
        console.log("triangle <point1 x> <point1 y> <point2 x> <point2 y> <point3 x> <point3 y> <color>");
        console.log("cross <center point x> <center point y> <length> <color>");
        console.log("Available colors: red, green, blue, pink, yellow, black");
        console.log("-----------------------------");
    }

    constructor(canvas: ICanvas, stream: readline.Interface) {
        this.m_canvas = canvas;
        this.m_readableStream = stream;
    }

    public startProcessingStream(): void {
        this.printHelpMessage();

        enum InputState {
            Paint = "PAINT",
            Help = "HELP",
            Clear = "CLEAR",
            Save = "SAVE",
            Exit = "EXIT"
        };

        const processClientsMessages = async (line: string) => {
            switch (line.toUpperCase()) {
                case InputState.Paint:
                    const designer: CDesigner = new CDesigner(new CFigureFactory());
                    const painter: CPainter = new CPainter();
                    this.m_readableStream.off('line', processClientsMessages);
                    console.log("Starting painting....");
                    this.getDesignersPainting(designer, painter).then(() => {
                        this.m_readableStream.on('line', processClientsMessages);
                    });
                    break;
                case InputState.Help:
                    this.printHelpMessage();
                    break;
                case InputState.Clear:
                    this.m_canvas.clear();
                    console.log("Successfully cleared");
                    break;
                case InputState.Save:
                    this.m_canvas.saveToPng("image.png").then(() => console.log("Successfully saved to image.png")).catch((e) => console.log(e));
                    break;
                case InputState.Exit:
                    this.m_readableStream.off("line", processClientsMessages);
                    exit();
                default:
                    console.log("Unknown message. Try again");
                    break;
            }
        }
        this.m_readableStream.on('line', processClientsMessages);
    }
}