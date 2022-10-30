import { IDesigner } from "./designer/IDesigner";
import { CDesigner } from "./designer/CDesigner";
import { ISavableCanvas } from "./canvas/ICanvas";
import { CPainter } from "./Cpainter";
import { CLayout } from "./Clayout";
import { CFigureFactory } from "./Factory/CFigureFactory";
import LineByLineReader from "line-by-line";

export class CClient {
    private m_canvas: ISavableCanvas;
    private m_readableStream: LineByLineReader;

    private async getDesignersPainting(desinger: IDesigner, painter: CPainter): Promise<CLayout> {
        const layout: CLayout = await desinger.getLayout(this.m_readableStream);

        painter.drawPainting(layout, this.m_canvas);

        return layout;
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

    constructor(canvas: ISavableCanvas, stream: LineByLineReader) {
        this.m_canvas = canvas;
        this.m_readableStream = stream;
    }

    public startProcessingStream(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.printHelpMessage();

            enum InputState {
                Paint = "PAINT",
                Stop = "STOP",
                Help = "HELP",
                Clear = "CLEAR",
                Save = "SAVE",
                Exit = "EXIT"
            };

            let isProcessingAnotherStream: boolean = false;

            const processClientsMessages = (line: string) => {
                if (isProcessingAnotherStream) {
                    if (line.toUpperCase() === InputState.Stop) {
                        isProcessingAnotherStream = !isProcessingAnotherStream;
                    }
                    return;
                }
                switch (line.toUpperCase()) {
                    case InputState.Paint:
                        const designer: CDesigner = new CDesigner(new CFigureFactory());
                        const painter: CPainter = new CPainter();
                        isProcessingAnotherStream = true;
                        console.log("Starting painting...");
                        this.getDesignersPainting(designer, painter);
                        break;
                    case InputState.Help:
                        this.printHelpMessage();
                        break;
                    case InputState.Clear:
                        this.m_canvas.clear();
                        console.log("Successfully cleared");
                        break;
                    case InputState.Save:
                        this.m_canvas.saveToPng("image.png");
                        console.log("Successfully saved to image.png");
                        break;
                    case InputState.Exit:
                        this.m_readableStream.off("line", processClientsMessages);
                        resolve();
                        break;
                    default:
                        console.log("Unknown message. Try again");
                        break;
                }
            }
            this.m_readableStream.on('line', processClientsMessages);
            this.m_readableStream.on('end', () => resolve());
            this.m_readableStream.on('error', (e) => reject(e));
        })
    }
}