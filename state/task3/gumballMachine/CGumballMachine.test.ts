import { CGumballMachine } from "./CGumballMachine";
import { IGumballMachine } from "./IGumballMachine";
import { IState } from "../states/IState";

const mockRefill = jest.fn((gumsCount: number) => {});

class MockState implements IState {
    constructor() {

    }

    insertQuarter(): void {}
    ejectQuarter(): void {}
    turnCrank(): void {}
    dispense(): void {}
    toString(): string { return "123"; }

    refill(gumsCount: number): void { mockRefill(gumsCount); }
}

describe("test refill and setGumsCount methods", () => {
    const log = console.log;

    beforeEach(() => {
        console.log = jest.fn();
        mockRefill.mockClear();
    });

    afterAll(() => {
        console.log = log;
    });

    test("using refill should invoke refill method of current state", () => {
        const gumballMachine: CGumballMachine = new CGumballMachine(2);
        gumballMachine.setState(new MockState());

        gumballMachine.refill(3);

        expect(console.log).toBeCalledTimes(0);
        expect(mockRefill).toBeCalledTimes(1);
        expect((mockRefill).mock.calls[0][0]).toBe(3);
        expect(gumballMachine.getGumsCount()).toBe(2);
    });

    test("using setGumsCount on gumballMachine should change gums count of gumball machine", () => {
        const gumballMachine: IGumballMachine = new CGumballMachine(2);

        gumballMachine.setGumsCount(3);

        expect(gumballMachine.getGumsCount()).toBe(3);
        expect(console.log).toBeCalledTimes(0);
    });
});
