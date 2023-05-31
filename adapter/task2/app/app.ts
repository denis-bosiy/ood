import { modern_graphics_lib } from '../modern_graphics_lib/modern_graphics_lib';
import { shape_drawing_lib } from '../shape_drawing_lib/shape_drawing_lib';
import { graphics_lib } from '../graphics_lib/graphics_lib';

export namespace app {
    const paintPicture = (painter: shape_drawing_lib.CCanvasPainter): void => {
        const triangle: shape_drawing_lib.ICanvasDrawable = new shape_drawing_lib.CTriangle([new shape_drawing_lib.CPoint(10, 15), new shape_drawing_lib.CPoint(100, 200), new shape_drawing_lib.CPoint(150, 250)]);
        const rectangle: shape_drawing_lib.ICanvasDrawable = new shape_drawing_lib.CRectangle(new shape_drawing_lib.CPoint(30, 40), 18, 24);

        painter.draw(triangle);
        painter.draw(rectangle);
    }

    export const paintPictureOnCanvas = (): void => {
        const simpleCanvas: graphics_lib.ICanvas = new graphics_lib.CCanvas();
        const painter: shape_drawing_lib.CCanvasPainter = new shape_drawing_lib.CCanvasPainter(simpleCanvas);

        paintPicture(painter);
    }

    export const paintPictureOnModernGraphicsRenderer = (): void => {
        const adapter: CModernGraphicsRendererAdapter = new CModernGraphicsRendererAdapter();
        const painter: shape_drawing_lib.CCanvasPainter = new shape_drawing_lib.CCanvasPainter(adapter);

        paintPicture(painter);
    }

    export class CModernGraphicsRendererAdapter extends modern_graphics_lib.CModernGraphicsRenderer implements graphics_lib.ICanvas {
        constructor() {
            super();
        }

        public moveTo(x: number, y: number): void {
            this.m_currentPoint = new modern_graphics_lib.CPoint(x, y);
        }

        public lineTo(x: number, y: number): void {
            const toPoint: modern_graphics_lib.CPoint = new modern_graphics_lib.CPoint(x, y);

            // TODO: Вынести beginDraw, endDraw из адаптера
            this.beginDraw();
            this.drawLine(this.m_currentPoint, toPoint);
            this.endDraw();

            this.m_currentPoint = toPoint;
        }

        private m_currentPoint: modern_graphics_lib.CPoint;
    }
}