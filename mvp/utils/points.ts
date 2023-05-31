import { CPoint } from "../Point/CPoint"

export const getTopLeftPoint = (points: CPoint[]): CPoint => {
    let minX = Infinity;
    let minY = Infinity;

    for(let i = 0; i < points.length; i++) {
        if (points[i].x < minX) {
            minX = points[i].x;
        }
        if (points[i].y < minY) {
            minY = points[i].y;
        }
    }

    return new CPoint(minX, minY);
}

export const getWidth = (points: CPoint[]): number => {
    const topLeftPoint: CPoint = getTopLeftPoint(points);
    const bottomRightPoint: CPoint = getBottomRightPoint(points);

    return bottomRightPoint.x - topLeftPoint.x;
}

export const getHeight = (points: CPoint[]): number => {
    const topLeftPoint: CPoint = getTopLeftPoint(points);
    const bottomRightPoint: CPoint = getBottomRightPoint(points);

    return bottomRightPoint.y - topLeftPoint.y;
}

export const getBottomRightPoint = (points: CPoint[]): CPoint => {
    let maxX = -Infinity;
    let maxY = -Infinity;

    for(let i = 0; i < points.length; i++) {
        if (points[i].x > maxX) {
            maxX = points[i].x;
        }
        if (points[i].y > maxY) {
            maxY = points[i].y;
        }
    }

    return new CPoint(maxX, maxY);
}