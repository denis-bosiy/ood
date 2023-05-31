export namespace graphics_lib {
    export interface ICanvas {
        moveTo(x: number, y: number): void;
        lineTo(x: number, y: number): void;
    }

    export class CCanvas implements ICanvas {
        constructor() { }

        public moveTo(x: number, y: number): void {
            console.log("moveTo(" + x + ", " + "y" + ")");
        }

        public lineTo(x: number, y: number): void {
            console.log("lineTo(" + x + ", " + "y" + ")");
        }
    }
}