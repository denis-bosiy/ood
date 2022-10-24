import { Canvas, createCanvas } from "canvas";
import { promises as fs } from "fs";
import { CPoint } from "../Figure/CPoint";
import { ICanvas } from "./ICanvas";

const DEFAULT_COLOR: string = "#FFFFFF";

export class CCanvas implements ICanvas {
    private m_canvas: Canvas;
    private m_context: CanvasRenderingContext2D;
    private m_width: number = 0;
    private m_height: number = 0;
    private readonly DEFAULT_LINE_WIDTH = 5;

    constructor(width: number, height: number) {
        this.m_width = width;
        this.m_height = height;
        this.m_canvas = createCanvas(width, height);
        this.m_context = this.m_canvas.getContext("2d");
        this.m_context.lineWidth = this.DEFAULT_LINE_WIDTH;
    }

    public drawLine(from: CPoint, to: CPoint, outlineColor: string = DEFAULT_COLOR): void {
        this.m_context.beginPath();
        this.m_context.strokeStyle = outlineColor;
        this.m_context.moveTo(from.x(), from.y());
        this.m_context.lineTo(to.x(), to.y());
        this.m_context.stroke();
    }

    public drawEllipse(center: CPoint, largeSemiAxis: number, smallSemiAxis: number, outlineColor: string = DEFAULT_COLOR): void {
        this.m_context.beginPath();
        this.m_context.strokeStyle = outlineColor;
        this.m_context.ellipse(center.x(), center.y(), largeSemiAxis, smallSemiAxis, 0, 0, 360);
        this.m_context.stroke();
    }

    public clear(): void {
        this.m_canvas = createCanvas(this.m_width, this.m_height);
        this.m_context = this.m_canvas.getContext("2d");
        this.m_context.lineWidth = this.DEFAULT_LINE_WIDTH;
    }

    public async saveToPng(path: string): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                const buffer = this.m_canvas.toBuffer("image/png");
                console.log("entered");
                fs.writeFile(path, buffer).then(() => {
                    resolve("OK");
                });
            } catch (e) {
                reject(String(e));
            }
        });
    }
}