export namespace modern_graphics_lib {
    export class CModernGraphicsRenderer implements IModernGraphicsRenderer {
        constructor() { }

        public beginDraw(): void {
            if (this.m_drawing) {
                throw new Error("Drawing has already begun");
            }

            console.log("<draw>");
            this.m_drawing = true;
        }

        public drawLine(start: CPoint, end: CPoint) {
            if (!this.m_drawing) {
                throw new Error("DrawLine is allowed between BeginDraw()/EndDraw() only");
            }

            console.log(`  <line fromX=${start.x} fromY=${start.y} toX=${end.x} toY=${end.y} />`);
        }

        public endDraw(): void {
            if (!this.m_drawing) {
                throw new Error("Drawing has not been started");
            }

            console.log("</draw>");
            this.m_drawing = false;
        }

        private m_drawing = false;
    }

    export class CPoint {
        constructor(_x: number, _y: number) {
            this.x = _x;
            this.y = _y;
        }

        public x: number;
        public y: number;
    }

    export interface IModernGraphicsRenderer {
        beginDraw(): void;
        drawLine(start: CPoint, end: CPoint): void;
        endDraw(): void;
    }
}