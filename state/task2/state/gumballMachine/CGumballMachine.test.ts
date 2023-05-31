import { CGumballMachine } from "./CGumballMachine";

describe("test CGumballMachine", () => {
    const log = console.log;

    beforeEach(() => {
        console.log = jest.fn();
    });

    afterAll(() => {
        console.log = log;
    });

    // TODO: Устранить дублирование кода, сократить кол-во кода

    // Testing configurations of machine:
    // a) count = -1, SoldOutState, quarters = 0
    // b) count = 0, SoldOutState, quarters = 2
    // c) count = 1, SoldOutState, quarters = 0
    // d) count = 2, SoldOutState, quarters = 5
    // e) count = 2, HasQuarterState, quarters = 0
    // f) count = 2, NoQuarterState, quarters = 2
    // g) count = 0, NoQuarterState, quarters = 5
    // h) count = 1, NoQuarterState, quarters = 1
    // i) count = 1, SoldState, quarters = 2
    // j) count = 0, NoQuarterState, quarters = 0
    // k) count = 1, SoldState, quarters = 5
    // l) count = 0, HasQuarterState, quarters = 2
    // m) count = 0, SoldState, quarters = 1
    // n) count = 1, HasQuarterState, quarters = 5
    // o) count = 2, SoldState, quarters = 0
    // p) count = 2, HasQuarterState, quarters = 1

    test("using releaseGum when a", () => {
        expect(() => new CGumballMachine(-1)).toThrowError("Gums count can not be negative number");
    });

    test("using releaseGum when b", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldOutState();

        gumballMachine.releaseGum();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("sold out");
    });

    test("using releaseGum when c", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setSoldOutState();

        gumballMachine.releaseGum();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("A gumball comes rolling out the slot...");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("sold out");
    });

    test("using releaseGum when d", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldOutState();

        gumballMachine.releaseGum();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(11);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("A gumball comes rolling out the slot...");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[10][1]).toBe("sold out");
    });

    test("using releaseGum when e", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.setHasQuarterState();

        gumballMachine.releaseGum();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("A gumball comes rolling out the slot...");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("waiting for turn of crank");
    });

    test("using releaseGum when f", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        gumballMachine.releaseGum();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(8);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("A gumball comes rolling out the slot...");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("waiting for quarter");
    });

    test("using releaseGum when g", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        gumballMachine.releaseGum();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(10);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe("waiting for quarter");
    });

    test("using releaseGum when h", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        gumballMachine.releaseGum();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("A gumball comes rolling out the slot...");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("waiting for quarter");
    });

    test("using releaseGum when i", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        gumballMachine.releaseGum();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(8);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("A gumball comes rolling out the slot...");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("delivering a gumball");
    });

    test("using releaseGum when j", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);

        gumballMachine.releaseGum();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("sold out");
    });

    test("using releaseGum when k", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        gumballMachine.releaseGum();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(11);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("A gumball comes rolling out the slot...");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[10][1]).toBe("delivering a gumball");
    });

    test("using releaseGum when l", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        gumballMachine.releaseGum();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("waiting for turn of crank");
    });

    test("using releaseGum when m", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        gumballMachine.releaseGum();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("delivering a gumball");
    });

    test("using releaseGum when n", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        gumballMachine.releaseGum();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(11);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("A gumball comes rolling out the slot...");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[10][1]).toBe("waiting for turn of crank");
    });

    test("using releaseGum when o", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.setSoldState();

        gumballMachine.releaseGum();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("A gumball comes rolling out the slot...");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("delivering a gumball");
    });

    test("using releaseGum when p", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        gumballMachine.releaseGum();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("A gumball comes rolling out the slot...");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("waiting for turn of crank");
    });

    //
    // getGumsCount
    //
    //
    //
    //
    //
    //

    test("using getGumsCount when b", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldOutState();

        const gumsCount: number = gumballMachine.getGumsCount();

        gumballMachine.showInfo();
        expect(gumsCount).toBe(0);
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("sold out");
    });

    test("using getGumsCount when c", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setSoldOutState();

        const gumsCount: number = gumballMachine.getGumsCount();

        gumballMachine.showInfo();
        expect(gumsCount).toBe(1);
        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("sold out");
    });

    test("using releaseGum when d", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldOutState();

        const gumsCount: number = gumballMachine.getGumsCount();

        gumballMachine.showInfo();
        expect(gumsCount).toBe(2);
        expect(console.log).toBeCalledTimes(10);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe("sold out");
    });

    test("using releaseGum when e", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.setHasQuarterState();

        const gumsCount: number = gumballMachine.getGumsCount();

        gumballMachine.showInfo();
        expect(gumsCount).toBe(2);
        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("waiting for turn of crank");
    });

    test("using releaseGum when f", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        const gumsCount: number = gumballMachine.getGumsCount();

        gumballMachine.showInfo();
        expect(gumsCount).toBe(2);
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("waiting for quarter");
    });

    test("using releaseGum when g", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        const gumsCount: number = gumballMachine.getGumsCount();

        gumballMachine.showInfo();
        expect(gumsCount).toBe(0);
        expect(console.log).toBeCalledTimes(10);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe("waiting for quarter");
    });

    test("using releaseGum when h", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        const gumsCount: number = gumballMachine.getGumsCount();

        gumballMachine.showInfo();
        expect(gumsCount).toBe(1);
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("waiting for quarter");
    });

    test("using releaseGum when i", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        const gumsCount: number = gumballMachine.getGumsCount();

        gumballMachine.showInfo();
        expect(gumsCount).toBe(1);
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("delivering a gumball");
    });

    test("using releaseGum when j", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);

        const gumsCount: number = gumballMachine.getGumsCount();

        gumballMachine.showInfo();
        expect(gumsCount).toBe(0);
        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("sold out");
    });

    test("using releaseGum when k", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        const gumsCount: number = gumballMachine.getGumsCount();

        gumballMachine.showInfo();
        expect(gumsCount).toBe(1);
        expect(console.log).toBeCalledTimes(10);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe("delivering a gumball");
    });

    test("using releaseGum when l", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        const gumsCount: number = gumballMachine.getGumsCount();

        gumballMachine.showInfo();
        expect(gumsCount).toBe(0);
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("waiting for turn of crank");
    });

    test("using releaseGum when m", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        const gumsCount: number = gumballMachine.getGumsCount();

        gumballMachine.showInfo();
        expect(gumsCount).toBe(0);
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("delivering a gumball");
    });

    test("using releaseGum when n", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        const gumsCount: number = gumballMachine.getGumsCount();

        gumballMachine.showInfo();
        expect(gumsCount).toBe(1);
        expect(console.log).toBeCalledTimes(10);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe("waiting for turn of crank");
    });

    test("using releaseGum when o", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.setSoldState();

        const gumsCount: number = gumballMachine.getGumsCount();

        gumballMachine.showInfo();
        expect(gumsCount).toBe(2);
        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("delivering a gumball");
    });

    test("using releaseGum when p", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        const gumsCount: number = gumballMachine.getGumsCount();

        gumballMachine.showInfo();
        expect(gumsCount).toBe(2);
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("waiting for turn of crank");
    });

    //
    // setting arbitrary states
    //
    //
    //
    //
    //
    //

    test("using setSoldOutState on gumballMachine should change its state to soldOut", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);

        gumballMachine.setSoldOutState();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("sold out");
    });

    test("using setNoQuarterState on gumballMachine should change its state to noQuarter", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);

        gumballMachine.setNoQuarterState();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("waiting for quarter");
    });

    test("using setSoldState on gumballMachine should change its state to sold", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);

        gumballMachine.setSoldState();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("delivering a gumball");
    });

    test("using setHasQuarterState on gumballMachine should change its state to hasQuarter", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);

        gumballMachine.setHasQuarterState();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("waiting for turn of crank");
    });

    //
    // getQuartersCount
    //
    //
    //
    //
    //
    //

    test("using getQuartersCount when b", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldOutState();

        const quartersCount: number = gumballMachine.getQuartersCount();

        gumballMachine.showInfo();
        expect(quartersCount).toBe(2);
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("sold out");
    });

    test("using getQuartersCount when c", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setSoldOutState();

        const quartersCount: number = gumballMachine.getQuartersCount();

        gumballMachine.showInfo();
        expect(quartersCount).toBe(0);
        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("sold out");
    });

    test("using getQuartersCount when d", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldOutState();

        const quartersCount: number = gumballMachine.getQuartersCount();

        gumballMachine.showInfo();
        expect(quartersCount).toBe(5);
        expect(console.log).toBeCalledTimes(10);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe("sold out");
    });

    test("using getQuartersCount when e", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.setHasQuarterState();

        const quartersCount: number = gumballMachine.getQuartersCount();

        gumballMachine.showInfo();
        expect(quartersCount).toBe(0);
        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("waiting for turn of crank");
    });

    test("using getQuartersCount when f", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        const quartersCount: number = gumballMachine.getQuartersCount();

        gumballMachine.showInfo();
        expect(quartersCount).toBe(2);
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("waiting for quarter");
    });

    test("using getQuartersCount when g", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        const quartersCount: number = gumballMachine.getQuartersCount();

        gumballMachine.showInfo();
        expect(quartersCount).toBe(5);
        expect(console.log).toBeCalledTimes(10);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe("waiting for quarter");
    });

    test("using getQuartersCount when h", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        const quartersCount: number = gumballMachine.getQuartersCount();

        gumballMachine.showInfo();
        expect(quartersCount).toBe(1);
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("waiting for quarter");
    });

    test("using getQuartersCount when i", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        const quartersCount: number = gumballMachine.getQuartersCount();

        gumballMachine.showInfo();
        expect(quartersCount).toBe(2);
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("delivering a gumball");
    });

    test("using getQuartersCount when j", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);

        const quartersCount: number = gumballMachine.getQuartersCount();

        gumballMachine.showInfo();
        expect(quartersCount).toBe(0);
        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("sold out");
    });

    test("using getQuartersCount when k", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        const quartersCount: number = gumballMachine.getQuartersCount();

        gumballMachine.showInfo();
        expect(quartersCount).toBe(5);
        expect(console.log).toBeCalledTimes(10);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe("delivering a gumball");
    });

    test("using getQuartersCount when l", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        const quartersCount: number = gumballMachine.getQuartersCount();

        gumballMachine.showInfo();
        expect(quartersCount).toBe(2);
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("waiting for turn of crank");
    });

    test("using getQuartersCount when m", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        const quartersCount: number = gumballMachine.getQuartersCount();

        gumballMachine.showInfo();
        expect(quartersCount).toBe(1);
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("delivering a gumball");
    });

    test("using getQuartersCount when n", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        const quartersCount: number = gumballMachine.getQuartersCount();

        gumballMachine.showInfo();
        expect(quartersCount).toBe(5);
        expect(console.log).toBeCalledTimes(10);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe("waiting for turn of crank");
    });

    test("using getQuartersCount when o", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.setSoldState();

        const quartersCount: number = gumballMachine.getQuartersCount();

        gumballMachine.showInfo();
        expect(quartersCount).toBe(0);
        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("delivering a gumball");
    });

    test("using getQuartersCount when p", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        const quartersCount: number = gumballMachine.getQuartersCount();

        gumballMachine.showInfo();
        expect(quartersCount).toBe(1);
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("waiting for turn of crank");
    });

    //
    // resetQuarters
    //
    //
    //
    //
    //
    //

    test("using resetQuarters when b", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldOutState();

        gumballMachine.resetQuarters();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("sold out");
    });

    test("using resetQuarters when c", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setSoldOutState();

        gumballMachine.resetQuarters();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("sold out");
    });

    test("using resetQuarters when d", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldOutState();

        gumballMachine.resetQuarters();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(10);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe("sold out");
    });

    test("using resetQuarters when e", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.setHasQuarterState();

        gumballMachine.resetQuarters();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("waiting for turn of crank");
    });

    test("using resetQuarters when f", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        gumballMachine.resetQuarters();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("waiting for quarter");
    });

    test("using resetQuarters when g", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        gumballMachine.resetQuarters();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(10);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe("waiting for quarter");
    });

    test("using resetQuarters when h", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        gumballMachine.resetQuarters();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("waiting for quarter");
    });

    test("using resetQuarters when i", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        gumballMachine.resetQuarters();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("delivering a gumball");
    });

    test("using resetQuarters when j", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);

        gumballMachine.resetQuarters();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("sold out");
    });

    test("using resetQuarters when k", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        gumballMachine.resetQuarters();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(10);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe("delivering a gumball");
    });

    test("using resetQuarters when l", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        gumballMachine.resetQuarters();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("waiting for turn of crank");
    });

    test("using resetQuarters when m", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        gumballMachine.resetQuarters();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("delivering a gumball");
    });

    test("using resetQuarters when n", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        gumballMachine.resetQuarters();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(10);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe("waiting for turn of crank");
    });

    test("using resetQuarters when o", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.setSoldState();

        gumballMachine.resetQuarters();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("delivering a gumball");
    });

    test("using resetQuarters when p", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        gumballMachine.resetQuarters();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("waiting for turn of crank");
    });

    //
    // removeQuarter
    //
    //
    //
    //
    //
    //

    test("using removeQuarter when b", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldOutState();

        gumballMachine.removeQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("sold out");
    });

    test("using removeQuarter when c", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setSoldOutState();

        gumballMachine.removeQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Can not remove quarter, because there is no quarters");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("sold out");
    });

    test("using removeQuarter when d", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldOutState();

        gumballMachine.removeQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(10);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe(4);
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe("sold out");
    });

    test("using removeQuarter when e", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.setHasQuarterState();

        gumballMachine.removeQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Can not remove quarter, because there is no quarters");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("waiting for turn of crank");
    });

    test("using removeQuarter when f", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        gumballMachine.removeQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("waiting for quarter");
    });

    test("using removeQuarter when g", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        gumballMachine.removeQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(10);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe(4);
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe("waiting for quarter");
    });

    test("using removeQuarter when h", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        gumballMachine.removeQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("waiting for quarter");
    });

    test("using removeQuarter when i", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        gumballMachine.removeQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("delivering a gumball");
    });

    test("using removeQuarter when j", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);

        gumballMachine.removeQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Can not remove quarter, because there is no quarters");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("sold out");
    });

    test("using removeQuarter when k", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        gumballMachine.removeQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(10);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe(4);
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe("delivering a gumball");
    });

    test("using removeQuarter when l", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        gumballMachine.removeQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("waiting for turn of crank");
    });

    test("using removeQuarter when m", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        gumballMachine.removeQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("delivering a gumball");
    });

    test("using removeQuarter when n", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        gumballMachine.removeQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(10);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe(4);
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe("waiting for turn of crank");
    });

    test("using removeQuarter when o", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.setSoldState();

        gumballMachine.removeQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Can not remove quarter, because there is no quarters");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("delivering a gumball");
    });

    test("using removeQuarter when p", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        gumballMachine.removeQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("waiting for turn of crank");
    });

    //
    // addQuarter
    //
    //
    //
    //
    //
    //

    test("using addQuarter when b", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldOutState();

        gumballMachine.addQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(3);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("sold out");
    });

    test("using addQuarter when c", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setSoldOutState();

        gumballMachine.addQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("sold out");
    });

    test("using addQuarter when d", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldOutState();

        gumballMachine.addQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(11);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Can not add quarter, because of limit of quarters(5)");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[10][1]).toBe("sold out");
    });

    test("using addQuarter when e", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.setHasQuarterState();

        gumballMachine.addQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("waiting for turn of crank");
    });

    test("using addQuarter when f", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        gumballMachine.addQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(3);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("waiting for quarter");
    });

    test("using addQuarter when g", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        gumballMachine.addQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(11);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Can not add quarter, because of limit of quarters(5)");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[10][1]).toBe("waiting for quarter");
    });

    test("using addQuarter when h", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        gumballMachine.addQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("waiting for quarter");
    });

    test("using addQuarter when i", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        gumballMachine.addQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(3);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("delivering a gumball");
    });

    test("using addQuarter when j", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);

        gumballMachine.addQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("sold out");
    });

    test("using addQuarter when k", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        gumballMachine.addQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(11);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Can not add quarter, because of limit of quarters(5)");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[10][1]).toBe("delivering a gumball");
    });

    test("using addQuarter when l", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        gumballMachine.addQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(3);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("waiting for turn of crank");
    });

    test("using addQuarter when m", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        gumballMachine.addQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("delivering a gumball");
    });

    test("using addQuarter when n", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        gumballMachine.addQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(11);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Can not add quarter, because of limit of quarters(5)");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[10][1]).toBe("waiting for turn of crank");
    });

    test("using addQuarter when o", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.setSoldState();

        gumballMachine.addQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("delivering a gumball");
    });

    test("using addQuarter when p", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        gumballMachine.addQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("waiting for turn of crank");
    });

    //
    // ejectQuarter
    //
    //
    //
    //
    //
    //

    test("using ejectQuarter when b", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldOutState();

        gumballMachine.ejectQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(8);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarters returned");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("sold out");
    });

    test("using ejectQuarter when c", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setSoldOutState();

        gumballMachine.ejectQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You can't eject, you haven't inserted a quarter yet");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("sold out");
    });

    test("using ejectQuarter when d", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldOutState();

        gumballMachine.ejectQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(11);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters returned");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[10][1]).toBe("sold out");
    });

    test("using ejectQuarter when e", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.setHasQuarterState();

        gumballMachine.ejectQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Quarters returned");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("waiting for quarter");
    });

    test("using ejectQuarter when f", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        gumballMachine.ejectQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(8);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("You haven't inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("waiting for quarter");
    });

    test("using ejectQuarter when g", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        gumballMachine.ejectQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(11);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("You haven't inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[10][1]).toBe("waiting for quarter");
    });

    test("using ejectQuarter when h", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        gumballMachine.ejectQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("You haven't inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("waiting for quarter");
    });

    test("using ejectQuarter when i", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        gumballMachine.ejectQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(8);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Sorry you already turned the crank");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("delivering a gumball");
    });

    test("using ejectQuarter when j", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);

        gumballMachine.ejectQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You can't eject, you haven't inserted a quarter yet");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("sold out");
    });

    test("using ejectQuarter when k", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        gumballMachine.ejectQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(11);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Sorry you already turned the crank");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[10][1]).toBe("delivering a gumball");
    });

    test("using ejectQuarter when l", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        gumballMachine.ejectQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(8);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarters returned");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("waiting for quarter");
    });

    test("using ejectQuarter when m", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        gumballMachine.ejectQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Sorry you already turned the crank");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("delivering a gumball");
    });

    test("using ejectQuarter when n", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        gumballMachine.ejectQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(11);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters returned");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[10][1]).toBe("waiting for quarter");
    });

    test("using ejectQuarter when o", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.setSoldState();

        gumballMachine.ejectQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Sorry you already turned the crank");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("delivering a gumball");
    });

    test("using ejectQuarter when p", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        gumballMachine.ejectQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarters returned");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("waiting for quarter");
    });

    //
    // insertQuarter
    //
    //
    //
    //
    //
    //

    test("using insertQuarter when b", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldOutState();

        gumballMachine.insertQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(8);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("You can't insert a quarter, the machine is sold out");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("sold out");
    });

    test("using insertQuarter when c", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setSoldOutState();

        gumballMachine.insertQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You can't insert a quarter, the machine is sold out");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("sold out");
    });

    test("using insertQuarter when d", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldOutState();

        gumballMachine.insertQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(11);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("You can't insert a quarter, the machine is sold out");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[10][1]).toBe("sold out");
    });

    test("using insertQuarter when e", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.setHasQuarterState();

        gumballMachine.insertQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("waiting for turn of crank");
    });

    test("using insertQuarter when f", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        gumballMachine.insertQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(8);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe(3);
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("waiting for turn of crank");
    });

    test("using insertQuarter when g", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        gumballMachine.insertQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(11);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("You can't insert another quarter. The Limit is 5");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[10][1]).toBe("waiting for quarter");
    });

    test("using insertQuarter when h", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        gumballMachine.insertQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("waiting for turn of crank");
    });

    test("using insertQuarter when i", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        gumballMachine.insertQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(8);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Please wait, we're already giving you a gumball");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("delivering a gumball");
    });

    test("using insertQuarter when j", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);

        gumballMachine.insertQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You can't insert a quarter, the machine is sold out");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("sold out");
    });

    test("using insertQuarter when k", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        gumballMachine.insertQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(11);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Please wait, we're already giving you a gumball");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[10][1]).toBe("delivering a gumball");
    });

    test("using insertQuarter when l", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        gumballMachine.insertQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(8);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe(3);
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("waiting for turn of crank");
    });

    test("using insertQuarter when m", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        gumballMachine.insertQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Please wait, we're already giving you a gumball");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("delivering a gumball");
    });

    test("using insertQuarter when n", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        gumballMachine.insertQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(11);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("You can't insert another quarter. The Limit is 5");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[10][1]).toBe("waiting for turn of crank");
    });

    test("using insertQuarter when o", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.setSoldState();

        gumballMachine.insertQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Please wait, we're already giving you a gumball");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("delivering a gumball");
    });

    test("using insertQuarter when p", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        gumballMachine.insertQuarter();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("waiting for turn of crank");
    });

    //
    // turnCrank
    //
    //
    //
    //
    //
    //

    test("using turnCrank when b", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldOutState();

        gumballMachine.turnCrank();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(9);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("You turned but there's no gumballs");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("No gumball dispensed");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe("sold out");
    });

    test("using turnCrank when c", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setSoldOutState();

        gumballMachine.turnCrank();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You turned but there's no gumballs");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("No gumball dispensed");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("sold out");
    });

    test("using turnCrank when d", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldOutState();

        gumballMachine.turnCrank();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(12);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("You turned but there's no gumballs");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("No gumball dispensed");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[10][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[11][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[11][1]).toBe("sold out");
    });

    test("using turnCrank when e", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.setHasQuarterState();

        gumballMachine.turnCrank();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("No gumball dispensed");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("waiting for turn of crank");
    });

    test("using turnCrank when f", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        gumballMachine.turnCrank();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(9);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("You turned but there's no quarter");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("You need to pay first");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe("waiting for quarter");
    });

    test("using turnCrank when g", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        gumballMachine.turnCrank();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(12);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("You turned but there's no quarter");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("You need to pay first");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[10][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[11][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[11][1]).toBe("waiting for quarter");
    });

    test("using turnCrank when h", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        gumballMachine.turnCrank();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(8);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("You turned but there's no quarter");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("You need to pay first");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("waiting for quarter");
    });

    test("using turnCrank when i", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        gumballMachine.turnCrank();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(10);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Turning twice doesn't get you another gumball");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("A gumball comes rolling out the slot...");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Oops, out of gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe("sold out");
    });

    test("using turnCrank when j", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);

        gumballMachine.turnCrank();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You turned but there's no gumballs");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("No gumball dispensed");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("sold out");
    });

    test("using turnCrank when k", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        gumballMachine.turnCrank();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(13);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Turning twice doesn't get you another gumball");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("A gumball comes rolling out the slot...");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Oops, out of gumballs");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[10][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[11][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[11][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[12][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[12][1]).toBe("sold out");
    });

    test("using turnCrank when l", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        gumballMachine.turnCrank();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(9);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("You turned...");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Oops, out of gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe("sold out");
    });

    test("using turnCrank when m", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        gumballMachine.turnCrank();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(8);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Turning twice doesn't get you another gumball");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Oops, out of gumballs");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("sold out");
    });

    test("using turnCrank when n", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        gumballMachine.turnCrank();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(13);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("You turned...");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("A gumball comes rolling out the slot...");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Oops, out of gumballs");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[10][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[10][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[11][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[11][1]).toBe(4);
        expect((console.log as jest.Mock).mock.calls[12][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[12][1]).toBe("sold out");
    });

    test("using turnCrank when o", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.setSoldState();

        gumballMachine.turnCrank();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Turning twice doesn't get you another gumball");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("A gumball comes rolling out the slot...");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("waiting for quarter");
    });

    test("using turnCrank when p", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        gumballMachine.turnCrank();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(8);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("You turned...");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("A gumball comes rolling out the slot...");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("waiting for quarter");
    });

    //
    // showInfo
    //
    //
    //
    //
    //
    //

    test("using showInfo when b", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldOutState();

        gumballMachine.showInfo();

        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("sold out");
    });

    test("using showInfo when c", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setSoldOutState();

        gumballMachine.showInfo();

        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("sold out");
    });

    test("using showInfo when d", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldOutState();

        gumballMachine.showInfo();

        expect(console.log).toBeCalledTimes(10);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe("sold out");
    });

    test("using showInfo when e", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.setHasQuarterState();

        gumballMachine.showInfo();

        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("waiting for turn of crank");
    });

    test("using showInfo when f", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        gumballMachine.showInfo();

        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("waiting for quarter");
    });

    test("using showInfo when g", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        gumballMachine.showInfo();

        expect(console.log).toBeCalledTimes(10);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe("waiting for quarter");
    });

    test("using showInfo when h", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.setNoQuarterState();

        gumballMachine.showInfo();

        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("waiting for quarter");
    });

    test("using showInfo when i", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        gumballMachine.showInfo();

        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("delivering a gumball");
    });

    test("using showInfo when j", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);

        gumballMachine.showInfo();

        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("sold out");
    });

    test("using showInfo when k", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        gumballMachine.showInfo();

        expect(console.log).toBeCalledTimes(10);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe("delivering a gumball");
    });

    test("using showInfo when l", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        gumballMachine.showInfo();

        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("waiting for turn of crank");
    });

    test("using showInfo when m", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();
        gumballMachine.insertQuarter();
        gumballMachine.setSoldState();

        gumballMachine.showInfo();

        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("delivering a gumball");
    });

    test("using showInfo when n", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        gumballMachine.showInfo();

        expect(console.log).toBeCalledTimes(10);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarter has inserted");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe("waiting for turn of crank");
    });

    test("using showInfo when o", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.setSoldState();

        gumballMachine.showInfo();

        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("delivering a gumball");
    });

    test("using showInfo when p", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.insertQuarter();
        gumballMachine.setHasQuarterState();

        gumballMachine.showInfo();

        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("2 gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("waiting for turn of crank");
    });
});
