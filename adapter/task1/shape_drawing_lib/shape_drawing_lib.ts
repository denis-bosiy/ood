import { graphics_lib } from "../graphics_lib/graphics_lib";

export namespace shape_drawing_lib {
    export interface ICanvasDrawable {
        draw(canvas: graphics_lib.ICanvas): void;
    }

    export class CTriangle implements ICanvasDrawable {
        constructor(points: CPoint[]) {
            if (points.length !== 3) {
                throw new Error("Incorrect points count. Points count should be 3");
            }

            this.m_points = points;
        }

        public draw(canvas: graphics_lib.ICanvas) {
            canvas.moveTo(this.m_points[0].x, this.m_points[0].y);
            canvas.lineTo(this.m_points[1].x, this.m_points[1].y);
            canvas.lineTo(this.m_points[2].x, this.m_points[2].y);
            canvas.lineTo(this.m_points[0].x, this.m_points[0].y);
        }

        private m_points: CPoint[];
    }

    export class CRectangle implements ICanvasDrawable {
        constructor(leftTopPoint: CPoint, width: number, height: number) {
            if (width < 0) {
                throw new Error("Width can not be negative number");
            }
            if (height < 0) {
                throw new Error("Height can not be negative number");
            }

            this.m_leftTopPoint = leftTopPoint;
            this.m_width = width;
            this.m_height = height;
        }

        public draw(canvas: graphics_lib.ICanvas): void {
            canvas.moveTo(this.m_leftTopPoint.x, this.m_leftTopPoint.y);
            canvas.lineTo(this.m_leftTopPoint.x + this.m_width, this.m_leftTopPoint.y);
            canvas.lineTo(this.m_leftTopPoint.x + this.m_width, this.m_leftTopPoint.y + this.m_height);
            canvas.lineTo(this.m_leftTopPoint.x, this.m_leftTopPoint.y + this.m_height);
            canvas.lineTo(this.m_leftTopPoint.x, this.m_leftTopPoint.y);
        }

        private m_leftTopPoint: CPoint;
        private m_width: number;
        private m_height: number;
    }

    export class CPoint {
        constructor(_x: number, _y: number) {
            this.x = _x;
            this.y = _y;
        }

        public x: number;
        public y: number;
    }

    export class CCanvasPainter {
        constructor(canvas: graphics_lib.ICanvas) {
            this.m_canvas = canvas;
        }

        public draw(drawable: ICanvasDrawable) {
            drawable.draw(this.m_canvas);
        }

        private m_canvas: graphics_lib.ICanvas;
    }
}