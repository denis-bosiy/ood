import { Canvas, createCanvas } from "canvas";
import { CPoint } from "../CPoint";
import { ICanvas } from "./ICanvas";
import { promises as fs } from "fs";

export class CCanvas implements ICanvas {
    private m_canvas: Canvas;
    private m_context: CanvasRenderingContext2D;

    constructor(width: number, height: number) {
        this.m_canvas = createCanvas(width, height);
        this.m_context = this.m_canvas.getContext("2d");
        this.m_context.lineWidth = 2;
        this.m_context.strokeStyle = "black";
        this.m_context.fillStyle = "black";
    }

    public drawLine(from: CPoint, to: CPoint): void {
        this.m_context.beginPath();
        this.m_context.moveTo(from.x, from.y);
        this.m_context.lineTo(to.x, to.y);
        this.m_context.stroke();
        this.m_context.closePath();
    }

    public drawEllipse(center: CPoint, radiusX: number, radiusY: number): void {
        this.m_context.beginPath();
        this.m_context.ellipse(center.x, center.y, radiusX, radiusY, 0, 0, 360);
        this.m_context.stroke();
        this.m_context.closePath();
    }

    public fillEllipse(center: CPoint, radiusX: number, radiusY: number): void {
        this.m_context.beginPath();
        this.m_context.ellipse(center.x, center.y, radiusX, radiusY, 0, 0, 360);
        this.m_context.closePath();
        this.m_context.fill();
    }

    public fillPolygon(points: CPoint[]): void {
        if (points.length < 3) {
            throw new Error("Points count of polygon should be more than 2");
        }

        this.m_context.beginPath();
        this.m_context.moveTo(points[0].x, points[0].y);
        for(let i = 1; i < points.length; i++) {
            this.m_context.lineTo(points[i].x, points[i].y);
        }
        this.m_context.closePath();
        this.m_context.fill();
    }

    public setFillColor(color: string): void {
        this.m_context.fillStyle = color;
    }

    public setLineColor(color: string): void {
        this.m_context.strokeStyle = color;
    }

    public setLineWidth(width: number): void {
        this.m_context.lineWidth = width;
    }

    public async saveToPng(path: string): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                const buffer = this.m_canvas.toBuffer("image/png");
                fs.writeFile(path, buffer).then(() => {
                    resolve("OK");
                });
            } catch (e) {
                reject(String(e));
            }
        });
    }
}