import { Color } from "./Figure/CFigure";
import { CPoint } from "./Figure/CPoint";

export class Parser {
    // TODO: Вынести всё в одно место(цвета)
    static AVAILABLE_COLORS: string[] = ["red", "green", "blue", "pink", "yellow", "black"];

    static parseEllipseArgs(args: string[]): CEllipseArgs {
        if (args.length !== 6) {
            throw new Error("Incorrect args count");
        }
        if (isNaN(Number(args[1]))) {
            throw new Error("First parameter should be number");
        }
        if (isNaN(Number(args[2]))) {
            throw new Error("Second parameter should be number");
        }
        if (isNaN(Number(args[3]))) {
            throw new Error("Third parameter should be number");
        }
        if (isNaN(Number(args[4]))) {
            throw new Error("Fourth parameter should be number");
        }
        if (!this.AVAILABLE_COLORS.includes(args[5].toLowerCase())) {
            throw new Error("Incorrect color name");
        }

        return new CEllipseArgs(new CPoint(Number(args[1]), Number(args[2])), Number(args[3]), Number(args[4]), this.AVAILABLE_COLORS.indexOf(args[5].toLowerCase()));
    }

    static parseRectangleArgs(args: string[]): CRectangleArgs {
        if (args.length !== 6) {
            throw new Error("Incorrect args count");
        }
        if (isNaN(Number(args[1]))) {
            throw new Error("First parameter should be number");
        }
        if (isNaN(Number(args[2]))) {
            throw new Error("Second parameter should be number");
        }
        if (isNaN(Number(args[3]))) {
            throw new Error("Third parameter should be number");
        }
        if (isNaN(Number(args[4]))) {
            throw new Error("Fourth parameter should be number");
        }
        if (!this.AVAILABLE_COLORS.includes(args[5].toLowerCase())) {
            throw new Error("Incorrect color name");
        }

        return new CRectangleArgs(new CPoint(Number(args[1]), Number(args[2])), Number(args[3]), Number(args[4]), this.AVAILABLE_COLORS.indexOf(args[5].toLowerCase()));
    }

    static parseTriangleArgs(args: string[]): CTriangleArgs {
        if (args.length !== 8) {
            throw new Error("Incorrect args count");
        }
        if (isNaN(Number(args[1]))) {
            throw new Error("First parameter should be number");
        }
        if (isNaN(Number(args[2]))) {
            throw new Error("Second parameter should be number");
        }
        if (isNaN(Number(args[3]))) {
            throw new Error("Third parameter should be number");
        }
        if (isNaN(Number(args[4]))) {
            throw new Error("Fourth parameter should be number");
        }
        if (isNaN(Number(args[5]))) {
            throw new Error("Third parameter should be number");
        }
        if (isNaN(Number(args[6]))) {
            throw new Error("Fourth parameter should be number");
        }
        if (!this.AVAILABLE_COLORS.includes(args[7].toLowerCase())) {
            throw new Error("Incorrect color name");
        }

        return new CTriangleArgs([new CPoint(Number(args[1]), Number(args[2])), new CPoint(Number(args[3]), Number(args[4])), new CPoint(Number(args[5]), Number(args[6]))], this.AVAILABLE_COLORS.indexOf(args[7].toLowerCase()));
    }

    static parseCrossArgs(args: string[]): CCrossArgs {
        if (args.length !== 5) {
            throw new Error("Incorrect args count");
        }
        if (isNaN(Number(args[1]))) {
            throw new Error("First parameter should be number");
        }
        if (isNaN(Number(args[2]))) {
            throw new Error("Second parameter should be number");
        }
        if (isNaN(Number(args[3]))) {
            throw new Error("Third parameter should be number");
        }
        if (!this.AVAILABLE_COLORS.includes(args[4].toLowerCase())) {
            throw new Error("Incorrect color name");
        }

        return new CCrossArgs(new CPoint(Number(args[1]), Number(args[2])), Number(args[3]), this.AVAILABLE_COLORS.indexOf(args[4].toLowerCase()));
    }
}

export class CFigureArgs {
    private m_color: Color;

    constructor(color: Color) {
        this.m_color = color;
    }

    public get color(): Color {
        return this.m_color;
    }
}

export class CEllipseArgs extends CFigureArgs {
    private m_centerPoint: CPoint;
    private m_largeSemiAxis: number = 0;
    private m_smallSemiAxis: number = 0;

    constructor(centerPoint: CPoint, largeSemiAxis: number, smallSemiAxis: number, color: Color) {
        super(color);
        this.m_centerPoint = centerPoint;
        this.m_largeSemiAxis = largeSemiAxis;
        this.m_smallSemiAxis = smallSemiAxis;
    }

    public get centerPoint(): CPoint {
        return this.m_centerPoint;
    }

    public get largeSemiAxis(): number {
        return this.m_largeSemiAxis;
    }

    public get smallSemiAxis(): number {
        return this.m_smallSemiAxis;
    }
}

export class CRectangleArgs extends CFigureArgs {
    private m_leftTopPoint: CPoint;
    private m_width: number = 0;
    private m_height: number = 0;

    constructor(leftTopPoint: CPoint, width: number, height: number, color: Color) {
        super(color);
        this.m_leftTopPoint = leftTopPoint;
        this.m_width = width;
        this.m_height = height;
    }

    public get leftTopPoint(): CPoint {
        return this.m_leftTopPoint;
    }

    public get width(): number {
        return this.m_width;
    }

    public get height(): number {
        return this.m_height;
    }
}

export class CTriangleArgs extends CFigureArgs {
    private m_points: CPoint[] = [];

    constructor(points: CPoint[], color: Color) {
        super(color);
        this.m_points = points;
    }

    public get points(): CPoint[] {
        return this.m_points;
    }
}

export class CCrossArgs extends CFigureArgs {
    private m_centerPoint: CPoint;
    private m_length: number = 0;

    constructor(centerPoint: CPoint, length: number, color: Color) {
        super(color);

        this.m_centerPoint = centerPoint;
        this.m_length = length;
    }

    public get centerPoint(): CPoint {
        return this.m_centerPoint;
    }

    public get length(): number {
        return this.m_length;
    }
}