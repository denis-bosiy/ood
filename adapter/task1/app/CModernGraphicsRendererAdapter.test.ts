import { modern_graphics_lib } from "../modern_graphics_lib/modern_graphics_lib";
import { app } from "./app";

const mockDrawLine = jest.fn((start: modern_graphics_lib.CPoint, end: modern_graphics_lib.CPoint) => {});

class MockModernGraphicsRenderer implements modern_graphics_lib.IModernGraphicsRenderer {
    constructor() {

    }

    public beginDraw(): void {}
    public drawLine(start: modern_graphics_lib.CPoint, end: modern_graphics_lib.CPoint): void {
        mockDrawLine(start, end);
    }
    public endDraw(): void {}
}

describe("test object adapter", () => {
    beforeEach(() => {
        mockDrawLine.mockClear();
    });

    test("moveTo call should move currentPoint to moveTo parameters", () => {
        const renderer: modern_graphics_lib.IModernGraphicsRenderer = new MockModernGraphicsRenderer();
        const adapter: app.CModernGraphicsRendererAdapter = new app.CModernGraphicsRendererAdapter(renderer);

        adapter.moveTo(10, 20);

        adapter.lineTo(30, 40);
        expect(mockDrawLine).toBeCalledTimes(1);
        expect((mockDrawLine).mock.calls[0][0]?.x).toBe(10);
        expect((mockDrawLine).mock.calls[0][0]?.y).toBe(20);
    });

    test("moveTo call with negative arguments should be successfully executed", () => {
        const renderer: modern_graphics_lib.IModernGraphicsRenderer = new MockModernGraphicsRenderer();
        const adapter: app.CModernGraphicsRendererAdapter = new app.CModernGraphicsRendererAdapter(renderer);

        adapter.moveTo(-10, -20);

        adapter.lineTo(30, 40);
        expect(mockDrawLine).toBeCalledTimes(1);
        expect((mockDrawLine).mock.calls[0][0]?.x).toBe(-10);
        expect((mockDrawLine).mock.calls[0][0]?.y).toBe(-20);
    });

    test("moveTo call with the same arguments should be successfully executed", () => {
        const renderer: modern_graphics_lib.IModernGraphicsRenderer = new MockModernGraphicsRenderer();
        const adapter: app.CModernGraphicsRendererAdapter = new app.CModernGraphicsRendererAdapter(renderer);

        adapter.moveTo(0, 0);

        adapter.lineTo(30, 40);
        expect(mockDrawLine).toBeCalledTimes(1);
        expect((mockDrawLine).mock.calls[0][0]?.x).toBe(0);
        expect((mockDrawLine).mock.calls[0][0]?.y).toBe(0);
    });

    test("lineTo call should invoke drawLine with right arguments", () => {
        const renderer: modern_graphics_lib.IModernGraphicsRenderer = new MockModernGraphicsRenderer();
        const adapter: app.CModernGraphicsRendererAdapter = new app.CModernGraphicsRendererAdapter(renderer);

        adapter.moveTo(10, 20);
        adapter.lineTo(30, 40);

        expect(mockDrawLine).toBeCalledTimes(1);
        expect((mockDrawLine).mock.calls[0][1]?.x).toBe(30);
        expect((mockDrawLine).mock.calls[0][1]?.y).toBe(40);
    });

    test("lineTo call should change currentPoint", () => {
        const renderer: modern_graphics_lib.IModernGraphicsRenderer = new MockModernGraphicsRenderer();
        const adapter: app.CModernGraphicsRendererAdapter = new app.CModernGraphicsRendererAdapter(renderer);

        adapter.moveTo(10, 20);
        adapter.lineTo(30, 40);
        adapter.lineTo(50, 60);

        expect(mockDrawLine).toBeCalledTimes(2);
        expect((mockDrawLine).mock.calls[1][0]?.x).toBe(30);
        expect((mockDrawLine).mock.calls[1][0]?.y).toBe(40);
    });

    test("lineTo call with negative arguments should be successfuly executed", () => {
        const renderer: modern_graphics_lib.IModernGraphicsRenderer = new MockModernGraphicsRenderer();
        const adapter: app.CModernGraphicsRendererAdapter = new app.CModernGraphicsRendererAdapter(renderer);

        adapter.moveTo(10, 20);
        adapter.lineTo(-30, -40);

        expect(mockDrawLine).toBeCalledTimes(1);
        expect((mockDrawLine).mock.calls[0][1]?.x).toBe(-30);
        expect((mockDrawLine).mock.calls[0][1]?.y).toBe(-40);
    });

    test("lineTo call with the same arguments should be successfuly executed", () => {
        const renderer: modern_graphics_lib.IModernGraphicsRenderer = new MockModernGraphicsRenderer();
        const adapter: app.CModernGraphicsRendererAdapter = new app.CModernGraphicsRendererAdapter(renderer);

        adapter.moveTo(10, 20);
        adapter.lineTo(0, 0);

        expect(mockDrawLine).toBeCalledTimes(1);
        expect((mockDrawLine).mock.calls[0][1]?.x).toBe(0);
        expect((mockDrawLine).mock.calls[0][1]?.y).toBe(0);
    });
});