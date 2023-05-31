import { CGumballMachine } from "./CGumballMachine";

describe("test CGumballMachine", () => {
    const log = console.log;

    beforeEach(() => {
        console.log = jest.fn();
    });

    afterAll(() => {
        console.log = log;
    });

    test("using releaseGum on gumball machine with count = -1, soldOutState should throw error", () => {
        expect(() => new CGumballMachine(-1)).toThrowError("Gums count can not be negative number");
    });

    test("releaseGum with count = 0, hasQuarterState gumball machine should call console log 0 times", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setHasQuarterState();

        gumballMachine.releaseGum();

        expect(console.log).toBeCalledTimes(0);
    });

    test("using releaseGum on gumball machine with count = 0, noQuarterState should call console log 0 times", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();

        gumballMachine.releaseGum();

        expect(console.log).toBeCalledTimes(0);
    });

    test("using releaseGum on gumball machine with count = 0, soldOutState should call console log 0 times", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setSoldOutState();

        gumballMachine.releaseGum();

        expect(console.log).toBeCalledTimes(0);
    });

    test("using releaseGum on gumball machine with count = 0, soldState should call console log 0 times", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setSoldState();

        gumballMachine.releaseGum();

        expect(console.log).toBeCalledTimes(0);
    });

    test("using releaseGum on gumball machine with count = 1, hasQuarterState should call console log 1 times", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setHasQuarterState();

        gumballMachine.releaseGum();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("A gumball comes rolling out the slot...");

    });

    test("using releaseGum on gumball machine with count = 1, noQuarterState should call console log 1 times", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setNoQuarterState();

        gumballMachine.releaseGum();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("A gumball comes rolling out the slot...");

    });

    test("using releaseGum on gumball machine with count = 1, soldOutState should call console log 1 times", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setSoldOutState();

        gumballMachine.releaseGum();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("A gumball comes rolling out the slot...");

    });

    test("using releaseGum on gumball machine with count = 1, soldState should call console log 1 times", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setSoldState();

        gumballMachine.releaseGum();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("A gumball comes rolling out the slot...");

    });

    test("using getGumsCount on gumball machine with count = 0 should return 0", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);

        expect(gumballMachine.getGumsCount()).toBe(0);
    });

    test("using getGusmCount on gumball machine with count = 1 should return 1", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);

        expect(gumballMachine.getGumsCount()).toBe(1);
    });

    // TODO: Устранить дублирование кода, используя возможности тестового фреймворка(beforeEach)
    test("using setSoldOutState on gumballMachine should change its state to soldOut", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);

        gumballMachine.setSoldOutState();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(4);
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("sold out");
    });

    test("using setNoQuarterState on gumballMachine should change its state to noQuarter", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);

        gumballMachine.setNoQuarterState();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(4);
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("waiting for quarter");
    });

    test("using setSoldState on gumballMachine should change its state to sold", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);

        gumballMachine.setSoldState();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(4);
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("delivering a gumball");
    });

    test("using setHasQuarterState on gumballMachine should change its state to hasQuarter", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);

        gumballMachine.setHasQuarterState();

        gumballMachine.showInfo();
        expect(console.log).toBeCalledTimes(4);
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("waiting for turn of crank");
    });

    test("using ejectQuarter on gumballMachine with count = 0, state = hasQuarterState should return quarter", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setHasQuarterState();

        gumballMachine.ejectQuarter();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Quarter returned");
    });

    test("using ejectQuarter on gumballMachine with count = 0, state = noQuarterState should print failure message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();

        gumballMachine.ejectQuarter();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You haven't inserted a quarter");
    });

    test("using ejectQuarter on gumballMachine with count = 0, state = soldOutState should print failure message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setSoldOutState();

        gumballMachine.ejectQuarter();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You can't eject, you haven't inserted a quarter yet");
    });

    test("using ejectQuarter on gumballMachine with count = 0, state = soldState should print failure message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setSoldState();

        gumballMachine.ejectQuarter();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Sorry you already turned the crank");
    });

    test("using ejectQuarter on gumballMachine with count = 1, state = hasQuarterState should return quarter", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setHasQuarterState();

        gumballMachine.ejectQuarter();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Quarter returned");
    });

    test("using ejectQuarter on gumballMachine with count = 1, state = noQuarterState should print failure message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setNoQuarterState();

        gumballMachine.ejectQuarter();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You haven't inserted a quarter");
    });

    test("using ejectQuarter on gumballMachine with count = 1, state = soldOutState should print failure message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setSoldOutState();

        gumballMachine.ejectQuarter();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You can't eject, you haven't inserted a quarter yet");
    });

    test("using ejectQuarter on gumballMachine with count = 1, state = soldState should print failure message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setSoldState();

        gumballMachine.ejectQuarter();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Sorry you already turned the crank");
    });

    test("using insertQuarter on gumballMachine with count = 0, state = hasQuarterState should print failure message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setHasQuarterState();

        gumballMachine.insertQuarter();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You can't insert another quarter");
    });

    test("using insertQuarter on gumballMachine with count = 0, state = noQuarterState should print success message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();

        gumballMachine.insertQuarter();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
    });

    test("using insertQuarter on gumballMachine with count = 0, state = soldOutState should print failure message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setSoldOutState();

        gumballMachine.insertQuarter();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You can't insert a quarter, the machine is sold out");
    });

    test("using insertQuarter on gumballMachine with count = 0, state = soldState should print failure message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setSoldState();

        gumballMachine.insertQuarter();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Please wait, we're already giving you a gumball");
    });

    test("using insertQuarter on gumballMachine with count = 1, state = hasQuarterState should print failure message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setHasQuarterState();

        gumballMachine.insertQuarter();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You can't insert another quarter");
    });

    test("using insertQuarter on gumballMachine with count = 1, state = noQuarterState should print success message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setNoQuarterState();

        gumballMachine.insertQuarter();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You inserted a quarter");
    });

    test("using insertQuarter on gumballMachine with count = 1, state = soldOutState should print failure message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setSoldOutState();

        gumballMachine.insertQuarter();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You can't insert a quarter, the machine is sold out");
    });

    test("using insertQuarter on gumballMachine with count = 1, state = soldState should print failure message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setSoldState();

        gumballMachine.insertQuarter();

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Please wait, we're already giving you a gumball");
    });

    test("using turnCrank on gumballMachine with count = 0, state = hasQuarterState should print success message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setHasQuarterState();

        gumballMachine.turnCrank();

        expect(console.log).toBeCalledTimes(2);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You turned...");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Oops, out of gumballs");
    });

    test("using turnCrank on gumballMachine with count = 0, state = noQuarterState should print failure message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setNoQuarterState();

        gumballMachine.turnCrank();

        expect(console.log).toBeCalledTimes(2);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You turned but there's no quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("You need to pay first");
    });

    test("using turnCrank on gumballMachine with count = 0, state = soldOutState should print failure message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setSoldOutState();

        gumballMachine.turnCrank();

        expect(console.log).toBeCalledTimes(2);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You turned but there's no gumballs");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("No gumball dispensed");
    });

    test("using turnCrank on gumballMachine with count = 0, state = soldState should print failure message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setSoldState();

        gumballMachine.turnCrank();

        expect(console.log).toBeCalledTimes(2);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Turning twice doesn't get you another gumball");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Oops, out of gumballs");
    });

    test("using turnCrank on gumballMachine with count = 1, state = hasQuarterState should print success message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setHasQuarterState();

        gumballMachine.turnCrank();

        expect(console.log).toBeCalledTimes(3);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You turned...");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("A gumball comes rolling out the slot...");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Oops, out of gumballs");
    });

    test("using turnCrank on gumballMachine with count = 1, state = noQuarterState should print failure message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setNoQuarterState();

        gumballMachine.turnCrank();

        expect(console.log).toBeCalledTimes(2);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You turned but there's no quarter");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("You need to pay first");
    });

    test("using turnCrank on gumballMachine with count = 1, state = soldOutState should print failure message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setSoldOutState();

        gumballMachine.turnCrank();

        expect(console.log).toBeCalledTimes(2);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("You turned but there's no gumballs");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("No gumball dispensed");
    });

    test("using turnCrank on gumballMachine with count = 1, state = soldState should print failure message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setSoldState();

        gumballMachine.turnCrank();

        expect(console.log).toBeCalledTimes(3);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Turning twice doesn't get you another gumball");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("A gumball comes rolling out the slot...");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Oops, out of gumballs");
    });

    test("using showInfo on gumballMachine with count = 1, state = hasQuarterState should print correct info message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setHasQuarterState();

        gumballMachine.showInfo();
        
        expect(console.log).toBeCalledTimes(4);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("waiting for turn of crank");
    });

    test("using showInfo on gumballMachine with count = 1, state = noQuarterState should print correct info message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(1);
        gumballMachine.setNoQuarterState();

        gumballMachine.showInfo();
        
        expect(console.log).toBeCalledTimes(4);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("1 gumball");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("waiting for quarter");
    });

    test("using showInfo on gumballMachine with count = 0, state = soldOutState should print correct info message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setSoldOutState();

        gumballMachine.showInfo();
        
        expect(console.log).toBeCalledTimes(4);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("sold out");
    });

    test("using showInfo on gumballMachine with count = 0, state = soldState should print correct info message", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(0);
        gumballMachine.setSoldState();

        gumballMachine.showInfo();
        
        expect(console.log).toBeCalledTimes(4);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Mighty Gumball, Inc");
        expect((console.log as jest.Mock).mock.calls[1][0]).toBe("Typescript-enabled Standing Gumball Model #2022");
        expect((console.log as jest.Mock).mock.calls[2][0]).toBe("Inventory:");
        expect((console.log as jest.Mock).mock.calls[2][1]).toBe("0 gumballs");
        expect((console.log as jest.Mock).mock.calls[3][0]).toBe("Machine is");
        expect((console.log as jest.Mock).mock.calls[3][1]).toBe("delivering a gumball");
    });
});
