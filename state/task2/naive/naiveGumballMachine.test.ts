import { naive } from "./naiveGumballMachine";

describe("test naive.CGumballMachine", () => {
    const log = console.log;

    beforeEach(() => {
        console.log = jest.fn();
    });

    afterAll(() => {
        console.log = log;
    });

    test("using releaseGum on gumball machine with count = -1, soldOutState should throw error", () => {
        expect(() => new naive.CGumballMachine(-1)).toThrowError("Gums count can not be negative number");
    });

    test("using ejectQuarter on gumballMachine with count = 0, state = noQuarterState should print failure message", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(0);

        gumballMachine.ejectQuarter();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You can't eject, you haven't inserted a quarter yet");
    });

    test("using ejectQuarter on gumballMachine with count = 0, state = soldOutState should print failure message", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(0);

        gumballMachine.ejectQuarter();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You can't eject, you haven't inserted a quarter yet");
    });

    test("using ejectQuarter on gumballMachine with count = 1, state = hasQuarterState, quarters = 1 should return quarter", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(1);
        gumballMachine.insertQuarter();

        gumballMachine.ejectQuarter();

        expect(console.log).toBeCalledTimes(2);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Quarters returned");
    });

    test("using ejectQuarter on gumballMachine with count = 1, state = hasQuarterState, quarters = 2 should return quarter", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();

        gumballMachine.ejectQuarter();

        expect(console.log).toBeCalledTimes(3);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Quarters returned");
    });

    test("using ejectQuarter on gumballMachine with count = 1, state = hasQuarterState, quarters = 5 should return quarter", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();

        gumballMachine.ejectQuarter();

        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters returned");
    });

    test("using ejectQuarter on gumballMachine with count = 1, state = noQuarterState should print failure message", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(1);

        gumballMachine.ejectQuarter();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You haven't inserted a quarter");
    });

    test("using ejectQuarter on gumballMachine with count = 1, state = soldOutState should print failure message", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(0);

        gumballMachine.ejectQuarter();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You can't eject, you haven't inserted a quarter yet");
    });

    test("using insertQuarter on gumballMachine with count = 0, state = soldOutState should print failure message", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(0);

        gumballMachine.insertQuarter();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You can't insert a quarter, the machine is sold out");
    });

    test("using insertQuarter on gumballMachine with count = 1, state = hasQuarterState, quarters = 1 should print failure message", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(1);
        gumballMachine.insertQuarter();

        gumballMachine.insertQuarter();

        expect(console.log).toBeCalledTimes(2);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("You inserted a quarter");
    });

    test("using insertQuarter on gumballMachine with count = 1, state = hasQuarterState, quarters = 2 should print failure message", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();

        gumballMachine.insertQuarter();

        expect(console.log).toBeCalledTimes(3);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("You inserted a quarter");
    });

    test("using insertQuarter on gumballMachine with count = 1, state = hasQuarterState, quarters = 5 should print failure message", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();

        gumballMachine.insertQuarter();

        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("You can't insert another quarter");
    });

    test("using insertQuarter on gumballMachine with count = 1, state = noQuarterState should print success message", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(1);

        gumballMachine.insertQuarter();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
    });

    test("using insertQuarter on gumballMachine with count = 1, state = soldOutState should print failure message", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(0);

        gumballMachine.insertQuarter();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You can't insert a quarter, the machine is sold out");
    });

    test("using turnCrank on gumballMachine with count = 0, state = hasQuarterState, quarters = 1 should print success message", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(1);
        gumballMachine.insertQuarter();

        gumballMachine.turnCrank();

        expect(console.log).toBeCalledTimes(4);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("You turned...");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("A gumball comes rolling out the slot");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Oops, out of gumballs");
    });

    test("using turnCrank on gumballMachine with count = 0, state = hasQuarterState, quarters = 2 should print success message", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();

        gumballMachine.turnCrank();

        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("You turned...");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("A gumball comes rolling out the slot");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Oops, out of gumballs");
    });

    test("using turnCrank on gumballMachine with count = 0, state = hasQuarterState, quarters = 5 should print success message", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();

        gumballMachine.turnCrank();

        expect(console.log).toBeCalledTimes(8);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("You turned...");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("A gumball comes rolling out the slot");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Oops, out of gumballs");
    });

    test("using turnCrank on gumballMachine with count = 0, state = noQuarterState should print failure message", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(1);

        gumballMachine.turnCrank();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You turned but there's no quarter");
    });

    test("using turnCrank on gumballMachine with count = 0, state = soldOutState should print failure message", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(0);

        gumballMachine.turnCrank();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You turned but there's no gumballs");
    });

    test("using turnCrank on gumballMachine with count = 1, state = hasQuarterState should print success message", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(1);
        gumballMachine.insertQuarter();

        gumballMachine.turnCrank();

        expect(console.log).toBeCalledTimes(4);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("You turned...");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("A gumball comes rolling out the slot");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Oops, out of gumballs");
    });

    test("using turnCrank on gumballMachine with count = 1, state = noQuarterState should print failure message", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(1);

        gumballMachine.turnCrank();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You turned but there's no quarter");
    });

    test("using turnCrank on gumballMachine with count = 1, state = soldOutState should print failure message", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(0);

        gumballMachine.turnCrank();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You turned but there's no gumballs");
    });

    test("using showInfo on gumballMachine with count = 1, state = hasQuarterState, quarters = 1 should print correct info message", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(1);
        gumballMachine.insertQuarter();

        gumballMachine.showInfo();
        
        expect(console.log).toBeCalledTimes(6);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Mighty Gumball, Inc.");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("1 gumballs");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe(1);
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe("waiting for turn of crank");
    });

    test("using showInfo on gumballMachine with count = 1, state = hasQuarterState, quarters = 2 should print correct info message", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();

        gumballMachine.showInfo();
        
        expect(console.log).toBeCalledTimes(7);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Mighty Gumball, Inc.");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("1 gumballs");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[5][1]).toBe(2);
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[6][1]).toBe("waiting for turn of crank");
    });

    test("using showInfo on gumballMachine with count = 1, state = hasQuarterState, quarters = 5 should print correct info message", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(1);
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();

        gumballMachine.showInfo();
        
        expect(console.log).toBeCalledTimes(10);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("You inserted a quarter");
        expect((console.log as jest.Mock).mock.calls[5][0]).toBe("Mighty Gumball, Inc.");
        expect((console.log as jest.Mock).mock.calls[6][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[7][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[7][1]).toBe("1 gumballs");
        expect((console.log as jest.Mock).mock.calls[8][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[8][1]).toBe(5);
        expect((console.log as jest.Mock).mock.calls[9][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[9][1]).toBe("waiting for turn of crank");
    });

    test("using showInfo on gumballMachine with count = 1, state = noQuarterState should print correct info message", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(1);

        gumballMachine.showInfo();
        
        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc.");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("1 gumballs");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("waiting for quarter");
    });

    test("using showInfo on gumballMachine with count = 0, state = soldOutState should print correct info message", () => {
        const gumballMachine: naive.IUserGumballMachine = new naive.CGumballMachine(0);

        gumballMachine.showInfo();
        
        expect(console.log).toBeCalledTimes(5);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc.");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Quarters:");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe(0);
        expect((console.log as jest.Mock).mock.calls[4][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[4][1]).toBe("sold out");
    });
});
