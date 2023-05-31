import { CPoint } from "../Point/CPoint";

export const defaultEllipseOptions = {
    frameOptions: {
        x: 300,
        y: 210,
        width: 40,
        height: 60
    },
    centerPoint: new CPoint(320, 240),
    radiusX: 20,
    radiusY: 30
};

export const defaultRectangleOptions = {
    frameOptions:
    {
        x: 300,
        y: 200,
        width: 40,
        height: 40
    },
    leftTopPoint: new CPoint(300, 200),
    width: 40,
    height: 40
};

export const defaultTriangleOptions = {
    frameOptions: {
        x: 300,
        y: 200,
        width: 40,
        height: 60
    },
    points: [new CPoint(300, 260), new CPoint(320, 200), new CPoint(340, 260)]
};