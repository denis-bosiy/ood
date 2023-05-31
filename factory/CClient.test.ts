import { CCanvas } from "./Canvas/CCanvas";
import { CClient } from "./CClient";
import LineByLineReader from "line-by-line";

describe("test client", () => {
    const log = console.log;

    beforeEach(() => {
        console.log = jest.fn();
    });

    afterAll(() => {
        console.log = log;
    });

    test("paint figure and exit", async () => {
        const canvas: CCanvas = new CCanvas(1000, 1000);
        const rl: LineByLineReader = new LineByLineReader("factory/testFiles/CClient/paintFigureExit.txt");
        const client: CClient = new CClient(canvas, rl);

        await client.startProcessingStream();

        // TODO: Вынести экспекты 0 - 14 в отдельную функцию
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Available commands:");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("paint - to paint picture");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("stop - to stop painting");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("clear - clear canvas");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("save - save image");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("help - print help message");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("exit - close the program");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Available figures:");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("ellipse <center point X> <center point Y> <large semi axis> <small semi axis> <color>");
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("rectangle <left top point x> <left top point y> <width> <height> <color>");
        expect((console.log as jest.Mock).mock.calls[11][0]).toBe("triangle <point1 x> <point1 y> <point2 x> <point2 y> <point3 x> <point3 y> <color>");
        expect((console.log as jest.Mock).mock.calls[12][0]).toBe("cross <center point x> <center point y> <length> <color>");
        expect((console.log as jest.Mock).mock.calls[13][0]).toBe("Available colors: red, green, blue, pink, yellow, black");
        expect((console.log as jest.Mock).mock.calls[14][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[15][0]).toBe("Starting painting...");
        expect((console.log as jest.Mock).mock.calls[16][0]).toBe("Stopped painting");
    });

    test("paint figure, save and exit", async () => {
        const canvas: CCanvas = new CCanvas(1000, 1000);
        const rl: LineByLineReader = new LineByLineReader("factory/testFiles/CClient/paintFigureSaveExit.txt");
        const client: CClient = new CClient(canvas, rl);

        await client.startProcessingStream();

        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Available commands:");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("paint - to paint picture");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("stop - to stop painting");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("clear - clear canvas");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("save - save image");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("help - print help message");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("exit - close the program");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Available figures:");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("ellipse <center point X> <center point Y> <large semi axis> <small semi axis> <color>");
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("rectangle <left top point x> <left top point y> <width> <height> <color>");
        expect((console.log as jest.Mock).mock.calls[11][0]).toBe("triangle <point1 x> <point1 y> <point2 x> <point2 y> <point3 x> <point3 y> <color>");
        expect((console.log as jest.Mock).mock.calls[12][0]).toBe("cross <center point x> <center point y> <length> <color>");
        expect((console.log as jest.Mock).mock.calls[13][0]).toBe("Available colors: red, green, blue, pink, yellow, black");
        expect((console.log as jest.Mock).mock.calls[14][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[15][0]).toBe("Starting painting...");
        expect((console.log as jest.Mock).mock.calls[16][0]).toBe("Stopped painting");
        expect((console.log as jest.Mock).mock.calls[17][0]).toBe("Successfully saved to image.png");
    });

    test("paint figure, type not figure, save and exit", async () => {
        const canvas: CCanvas = new CCanvas(1000, 1000);
        const rl: LineByLineReader = new LineByLineReader("factory/testFiles/CClient/paintFigureTypeNotFigureSaveExit.txt");
        const client: CClient = new CClient(canvas, rl);

        await client.startProcessingStream();

        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Available commands:");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("paint - to paint picture");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("stop - to stop painting");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("clear - clear canvas");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("save - save image");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("help - print help message");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("exit - close the program");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Available figures:");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("ellipse <center point X> <center point Y> <large semi axis> <small semi axis> <color>");
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("rectangle <left top point x> <left top point y> <width> <height> <color>");
        expect((console.log as jest.Mock).mock.calls[11][0]).toBe("triangle <point1 x> <point1 y> <point2 x> <point2 y> <point3 x> <point3 y> <color>");
        expect((console.log as jest.Mock).mock.calls[12][0]).toBe("cross <center point x> <center point y> <length> <color>");
        expect((console.log as jest.Mock).mock.calls[13][0]).toBe("Available colors: red, green, blue, pink, yellow, black");
        expect((console.log as jest.Mock).mock.calls[14][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[15][0]).toBe("Starting painting...");
        expect((console.log as jest.Mock).mock.calls[16][0]).toBe("Error: Incorrect figure name");
        expect((console.log as jest.Mock).mock.calls[17][0]).toBe("Stopped painting");
        expect((console.log as jest.Mock).mock.calls[18][0]).toBe("Successfully saved to image.png");
    });

    test("paint figure, type not figure and exit", async () => {
        const canvas: CCanvas = new CCanvas(1000, 1000);
        const rl: LineByLineReader = new LineByLineReader("factory/testFiles/CClient/paintFigureTypeNotFigureExit.txt");
        const client: CClient = new CClient(canvas, rl);

        await client.startProcessingStream();

        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Available commands:");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("paint - to paint picture");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("stop - to stop painting");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("clear - clear canvas");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("save - save image");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("help - print help message");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("exit - close the program");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Available figures:");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("ellipse <center point X> <center point Y> <large semi axis> <small semi axis> <color>");
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("rectangle <left top point x> <left top point y> <width> <height> <color>");
        expect((console.log as jest.Mock).mock.calls[11][0]).toBe("triangle <point1 x> <point1 y> <point2 x> <point2 y> <point3 x> <point3 y> <color>");
        expect((console.log as jest.Mock).mock.calls[12][0]).toBe("cross <center point x> <center point y> <length> <color>");
        expect((console.log as jest.Mock).mock.calls[13][0]).toBe("Available colors: red, green, blue, pink, yellow, black");
        expect((console.log as jest.Mock).mock.calls[14][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[15][0]).toBe("Starting painting...");
        expect((console.log as jest.Mock).mock.calls[16][0]).toBe("Error: Incorrect figure name");
        expect((console.log as jest.Mock).mock.calls[17][0]).toBe("Stopped painting");
    });

    test("paint, type not figure, save and exit", async () => {
        const canvas: CCanvas = new CCanvas(1000, 1000);
        const rl: LineByLineReader = new LineByLineReader("factory/testFiles/CClient/paintTypeNotFigureSaveExit.txt");
        const client: CClient = new CClient(canvas, rl);

        await client.startProcessingStream();

        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Available commands:");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("paint - to paint picture");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("stop - to stop painting");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("clear - clear canvas");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("save - save image");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("help - print help message");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("exit - close the program");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Available figures:");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("ellipse <center point X> <center point Y> <large semi axis> <small semi axis> <color>");
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("rectangle <left top point x> <left top point y> <width> <height> <color>");
        expect((console.log as jest.Mock).mock.calls[11][0]).toBe("triangle <point1 x> <point1 y> <point2 x> <point2 y> <point3 x> <point3 y> <color>");
        expect((console.log as jest.Mock).mock.calls[12][0]).toBe("cross <center point x> <center point y> <length> <color>");
        expect((console.log as jest.Mock).mock.calls[13][0]).toBe("Available colors: red, green, blue, pink, yellow, black");
        expect((console.log as jest.Mock).mock.calls[14][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[15][0]).toBe("Starting painting...");
        expect((console.log as jest.Mock).mock.calls[16][0]).toBe("Error: Incorrect figure name");
        expect((console.log as jest.Mock).mock.calls[17][0]).toBe("Stopped painting");
        expect((console.log as jest.Mock).mock.calls[18][0]).toBe("Successfully saved to image.png");
    });

    test("paint, type not figure and exit", async () => {
        const canvas: CCanvas = new CCanvas(1000, 1000);
        const rl: LineByLineReader = new LineByLineReader("factory/testFiles/CClient/paintTypeNotFigureExit.txt");
        const client: CClient = new CClient(canvas, rl);

        await client.startProcessingStream();

        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Available commands:");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("paint - to paint picture");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("stop - to stop painting");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("clear - clear canvas");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("save - save image");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("help - print help message");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("exit - close the program");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Available figures:");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("ellipse <center point X> <center point Y> <large semi axis> <small semi axis> <color>");
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("rectangle <left top point x> <left top point y> <width> <height> <color>");
        expect((console.log as jest.Mock).mock.calls[11][0]).toBe("triangle <point1 x> <point1 y> <point2 x> <point2 y> <point3 x> <point3 y> <color>");
        expect((console.log as jest.Mock).mock.calls[12][0]).toBe("cross <center point x> <center point y> <length> <color>");
        expect((console.log as jest.Mock).mock.calls[13][0]).toBe("Available colors: red, green, blue, pink, yellow, black");
        expect((console.log as jest.Mock).mock.calls[14][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[15][0]).toBe("Starting painting...");
        expect((console.log as jest.Mock).mock.calls[16][0]).toBe("Error: Incorrect figure name");
        expect((console.log as jest.Mock).mock.calls[17][0]).toBe("Stopped painting");
    });

    test("paint, save and exit", async () => {
        const canvas: CCanvas = new CCanvas(1000, 1000);
        const rl: LineByLineReader = new LineByLineReader("factory/testFiles/CClient/paintSaveExit.txt");
        const client: CClient = new CClient(canvas, rl);

        await client.startProcessingStream();

        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Available commands:");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("paint - to paint picture");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("stop - to stop painting");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("clear - clear canvas");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("save - save image");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("help - print help message");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("exit - close the program");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Available figures:");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("ellipse <center point X> <center point Y> <large semi axis> <small semi axis> <color>");
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("rectangle <left top point x> <left top point y> <width> <height> <color>");
        expect((console.log as jest.Mock).mock.calls[11][0]).toBe("triangle <point1 x> <point1 y> <point2 x> <point2 y> <point3 x> <point3 y> <color>");
        expect((console.log as jest.Mock).mock.calls[12][0]).toBe("cross <center point x> <center point y> <length> <color>");
        expect((console.log as jest.Mock).mock.calls[13][0]).toBe("Available colors: red, green, blue, pink, yellow, black");
        expect((console.log as jest.Mock).mock.calls[14][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[15][0]).toBe("Starting painting...");
        expect((console.log as jest.Mock).mock.calls[16][0]).toBe("Stopped painting");
        expect((console.log as jest.Mock).mock.calls[17][0]).toBe("Successfully saved to image.png");
    });

    test("paint and exit", async () => {
        const canvas: CCanvas = new CCanvas(1000, 1000);
        const rl: LineByLineReader = new LineByLineReader("factory/testFiles/CClient/paintExit.txt");
        const client: CClient = new CClient(canvas, rl);

        await client.startProcessingStream();

        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Available commands:");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("paint - to paint picture");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("stop - to stop painting");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("clear - clear canvas");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("save - save image");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("help - print help message");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("exit - close the program");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Available figures:");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("ellipse <center point X> <center point Y> <large semi axis> <small semi axis> <color>");
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("rectangle <left top point x> <left top point y> <width> <height> <color>");
        expect((console.log as jest.Mock).mock.calls[11][0]).toBe("triangle <point1 x> <point1 y> <point2 x> <point2 y> <point3 x> <point3 y> <color>");
        expect((console.log as jest.Mock).mock.calls[12][0]).toBe("cross <center point x> <center point y> <length> <color>");
        expect((console.log as jest.Mock).mock.calls[13][0]).toBe("Available colors: red, green, blue, pink, yellow, black");
        expect((console.log as jest.Mock).mock.calls[14][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[15][0]).toBe("Starting painting...");
        expect((console.log as jest.Mock).mock.calls[16][0]).toBe("Stopped painting");
    });

    test("save and exit", async () => {
        const canvas: CCanvas = new CCanvas(1000, 1000);
        const rl: LineByLineReader = new LineByLineReader("factory/testFiles/CClient/saveExit.txt");
        const client: CClient = new CClient(canvas, rl);

        await client.startProcessingStream();

        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Available commands:");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("paint - to paint picture");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("stop - to stop painting");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("clear - clear canvas");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("save - save image");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("help - print help message");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("exit - close the program");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Available figures:");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("ellipse <center point X> <center point Y> <large semi axis> <small semi axis> <color>");
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("rectangle <left top point x> <left top point y> <width> <height> <color>");
        expect((console.log as jest.Mock).mock.calls[11][0]).toBe("triangle <point1 x> <point1 y> <point2 x> <point2 y> <point3 x> <point3 y> <color>");
        expect((console.log as jest.Mock).mock.calls[12][0]).toBe("cross <center point x> <center point y> <length> <color>");
        expect((console.log as jest.Mock).mock.calls[13][0]).toBe("Available colors: red, green, blue, pink, yellow, black");
        expect((console.log as jest.Mock).mock.calls[14][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[15][0]).toBe("Successfully saved to image.png");
    });

    test("help and exit", async () => {
        const canvas: CCanvas = new CCanvas(1000, 1000);
        const rl: LineByLineReader = new LineByLineReader("factory/testFiles/CClient/helpExit.txt");
        const client: CClient = new CClient(canvas, rl);

        await client.startProcessingStream();

        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Available commands:");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("paint - to paint picture");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("stop - to stop painting");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("clear - clear canvas");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("save - save image");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("help - print help message");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("exit - close the program");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Available figures:");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("ellipse <center point X> <center point Y> <large semi axis> <small semi axis> <color>");
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("rectangle <left top point x> <left top point y> <width> <height> <color>");
        expect((console.log as jest.Mock).mock.calls[11][0]).toBe("triangle <point1 x> <point1 y> <point2 x> <point2 y> <point3 x> <point3 y> <color>");
        expect((console.log as jest.Mock).mock.calls[12][0]).toBe("cross <center point x> <center point y> <length> <color>");
        expect((console.log as jest.Mock).mock.calls[13][0]).toBe("Available colors: red, green, blue, pink, yellow, black");
        expect((console.log as jest.Mock).mock.calls[14][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[15][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[16][0]).toBe("Available commands:");
        expect((console.log as jest.Mock).mock.calls[17][0]).toBe("paint - to paint picture");
        expect((console.log as jest.Mock).mock.calls[18][0]).toBe("stop - to stop painting");
        expect((console.log as jest.Mock).mock.calls[19][0]).toBe("clear - clear canvas");
        expect((console.log as jest.Mock).mock.calls[20][0]).toBe("save - save image");
        expect((console.log as jest.Mock).mock.calls[21][0]).toBe("help - print help message");
        expect((console.log as jest.Mock).mock.calls[22][0]).toBe("exit - close the program");
        expect((console.log as jest.Mock).mock.calls[23][0]).toBe("Available figures:");
        expect((console.log as jest.Mock).mock.calls[24][0]).toBe("ellipse <center point X> <center point Y> <large semi axis> <small semi axis> <color>");
        expect((console.log as jest.Mock).mock.calls[25][0]).toBe("rectangle <left top point x> <left top point y> <width> <height> <color>");
        expect((console.log as jest.Mock).mock.calls[26][0]).toBe("triangle <point1 x> <point1 y> <point2 x> <point2 y> <point3 x> <point3 y> <color>");
        expect((console.log as jest.Mock).mock.calls[27][0]).toBe("cross <center point x> <center point y> <length> <color>");
        expect((console.log as jest.Mock).mock.calls[28][0]).toBe("Available colors: red, green, blue, pink, yellow, black");
        expect((console.log as jest.Mock).mock.calls[29][0]).toBe("-----------------------------");
    });

    test("clear and exit", async () => {
        const canvas: CCanvas = new CCanvas(1000, 1000);
        const rl: LineByLineReader = new LineByLineReader("factory/testFiles/CClient/clearExit.txt");
        const client: CClient = new CClient(canvas, rl);

        await client.startProcessingStream();

        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Available commands:");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("paint - to paint picture");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("stop - to stop painting");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("clear - clear canvas");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("save - save image");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("help - print help message");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("exit - close the program");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Available figures:");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("ellipse <center point X> <center point Y> <large semi axis> <small semi axis> <color>");
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("rectangle <left top point x> <left top point y> <width> <height> <color>");
        expect((console.log as jest.Mock).mock.calls[11][0]).toBe("triangle <point1 x> <point1 y> <point2 x> <point2 y> <point3 x> <point3 y> <color>");
        expect((console.log as jest.Mock).mock.calls[12][0]).toBe("cross <center point x> <center point y> <length> <color>");
        expect((console.log as jest.Mock).mock.calls[13][0]).toBe("Available colors: red, green, blue, pink, yellow, black");
        expect((console.log as jest.Mock).mock.calls[14][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[15][0]).toBe("Successfully cleared");
    });

    test("unavailable command and exit", async () => {
        const canvas: CCanvas = new CCanvas(1000, 1000);
        const rl: LineByLineReader = new LineByLineReader("factory/testFiles/CClient/unavailableCommandExit.txt");
        const client: CClient = new CClient(canvas, rl);

        await client.startProcessingStream();

        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Available commands:");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("paint - to paint picture");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("stop - to stop painting");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("clear - clear canvas");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("save - save image");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("help - print help message");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("exit - close the program");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Available figures:");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("ellipse <center point X> <center point Y> <large semi axis> <small semi axis> <color>");
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("rectangle <left top point x> <left top point y> <width> <height> <color>");
        expect((console.log as jest.Mock).mock.calls[11][0]).toBe("triangle <point1 x> <point1 y> <point2 x> <point2 y> <point3 x> <point3 y> <color>");
        expect((console.log as jest.Mock).mock.calls[12][0]).toBe("cross <center point x> <center point y> <length> <color>");
        expect((console.log as jest.Mock).mock.calls[13][0]).toBe("Available colors: red, green, blue, pink, yellow, black");
        expect((console.log as jest.Mock).mock.calls[14][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[15][0]).toBe("Unknown message. Try again");
    });

    test("exit", async () => {
        const canvas: CCanvas = new CCanvas(1000, 1000);
        const rl: LineByLineReader = new LineByLineReader("factory/testFiles/CClient/exit.txt");
        const client: CClient = new CClient(canvas, rl);

        await client.startProcessingStream();

        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("-----------------------------");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Available commands:");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("paint - to paint picture");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("stop - to stop painting");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("clear - clear canvas");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("save - save image");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("help - print help message");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("exit - close the program");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Available figures:");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("ellipse <center point X> <center point Y> <large semi axis> <small semi axis> <color>");
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("rectangle <left top point x> <left top point y> <width> <height> <color>");
        expect((console.log as jest.Mock).mock.calls[11][0]).toBe("triangle <point1 x> <point1 y> <point2 x> <point2 y> <point3 x> <point3 y> <color>");
        expect((console.log as jest.Mock).mock.calls[12][0]).toBe("cross <center point x> <center point y> <length> <color>");
        expect((console.log as jest.Mock).mock.calls[13][0]).toBe("Available colors: red, green, blue, pink, yellow, black");
        expect((console.log as jest.Mock).mock.calls[14][0]).toBe("-----------------------------");
    });
});