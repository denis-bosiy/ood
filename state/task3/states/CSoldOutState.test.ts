import { IGumballMachine } from "../gumballMachine/IGumballMachine";
import { CSoldOutState } from "./CSoldOutState";
import { IState } from "./IState";

const mockSetGumsCount = jest.fn((gumsCount: number) => {});

class MockGumballMachine implements IGumballMachine {
    constructor() {

    }

    public refill(gumsCount: number): void {} 
    public setGumsCount(gumsCount: number): void { mockSetGumsCount(gumsCount); }
    public releaseGum(): void {}
    public getGumsCount(): number { return 1; }

    addQuarter(): void {}
    removeQuarter(): void {}
    resetQuarters(): void {}
    getQuartersCount(): number { return 3; }
    getQuartersLimit(): number { return 5; }

    public setSoldOutState(): void {}
    public setNoQuarterState(): void {}
    public setSoldState(): void {}
    public setHasQuarterState(): void {}
}

describe("test SoldOutState", () => {
    const log = console.log;

    beforeEach(() => {
        console.log = jest.fn();
        mockSetGumsCount.mockClear();
    });

    afterAll(() => {
        console.log = log;
    });

    test("using refill method should invoke console.log and execute setGumsCount method of gumball machine", () => {
        const gumballMachine: IGumballMachine = new MockGumballMachine();
        const soldOutState: IState = new CSoldOutState(gumballMachine);

        soldOutState.refill(2);

        expect(console.log).toBeCalledTimes(1);
        expect((console.log as jest.Mock).mock.calls[0][0]).toBe("Gums count has been successfully changed");
        expect(mockSetGumsCount).toBeCalledTimes(1);
        expect((mockSetGumsCount).mock.calls[0][0]).toBe(2);
    });
});