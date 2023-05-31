export namespace naive {
    enum State {
        SoldOut,		// Жвачка закончилась
        NoQuarter,		// Нет монетки
        HasQuarter,		// Есть монетка
        Sold,			// Монетка выдана
    };

    export interface IUserGumballMachine {
        ejectQuarter(): void;
        insertQuarter(): void;
        turnCrank(): void;
        showInfo(): void;
    }

    export class CGumballMachine implements naive.IUserGumballMachine {
        constructor(gumsCount: number) {
            if (gumsCount < 0) {
                throw new Error("Gums count can not be negative number");
            }

            this.m_gumsCount = gumsCount;
            this.m_quartersCount = 0;
            this.m_state = gumsCount > 0 ? State.NoQuarter : State.SoldOut;
        }

        public insertQuarter(): void {
            switch (this.m_state) {
                case State.SoldOut:
                    console.log("You can't insert a quarter, the machine is sold out");
                    break;
                case State.NoQuarter:
                    console.log("You inserted a quarter");
                    this.m_state = State.HasQuarter;
                    this.m_quartersCount = 1;
                    break;
                case State.HasQuarter:
                    if (this.m_quartersCount === this.QUARTERS_LIMIT) {
                        console.log("You can't insert another quarter");
                    } else {
                        console.log("You inserted a quarter");
                        this.m_quartersCount++;
                    }
                    break;
                case State.Sold:
                    console.log("Please wait, we're already giving you a gumball");
                    break;
            }
        }

        public ejectQuarter(): void {
            switch (this.m_state) {
                case State.HasQuarter:
                    console.log("Quarters returned");
                    this.m_state = State.NoQuarter;
                    this.m_quartersCount = 0;
                    break;
                case State.NoQuarter:
                    console.log("You haven't inserted a quarter");
                    break;
                case State.Sold:
                    console.log("Sorry, you already turned the crank");
                    break;
                case State.SoldOut:
                    if (this.m_quartersCount !== 0) {
                        console.log("Quarters returned");
                        this.m_quartersCount = 0;
                    } else {
                        console.log("You can't eject, you haven't inserted a quarter yet");
                    }
                    break;
            }
        }

        public turnCrank(): void {
            switch (this.m_state) {
                case State.SoldOut:
                    console.log("You turned but there's no gumballs");
                    break;
                case State.NoQuarter:
                    console.log("You turned but there's no quarter");
                    break;
                case State.HasQuarter:
                    console.log("You turned...");
                    this.m_quartersCount--;
                    this.m_state = State.Sold;
                    this.dispense();
                    break;
                case State.Sold:
                    console.log("Turning twice doesn't get you another gumball");
                    break;
            }
        }

        public refill(gumsCount: number): void {
            this.m_gumsCount = gumsCount;
            this.m_state = gumsCount > 0 ? State.NoQuarter : State.SoldOut;
        }

        public showInfo(): void {
            const state: string =
                (this.m_state == State.SoldOut) ? "sold out" :
                    (this.m_state == State.NoQuarter) ? "waiting for quarter" :
                        (this.m_state == State.HasQuarter) ? "waiting for turn of crank"
                            : "delivering a gumball";

            console.log("Mighty Gumball, Inc.");
            console.log("Typescript-enabled Standing Gumball Model #2022");
            console.log("Inventory:", this.m_gumsCount + " gumballs", this.m_gumsCount !== 1 ? "s" : "");
            console.log("Quarters:", this.m_quartersCount);
            console.log("Machine is", state);
        }

        private dispense(): void {
            switch (this.m_state) {
                case State.Sold:
                    console.log("A gumball comes rolling out the slot");
                    --this.m_gumsCount;
                    if (this.m_gumsCount == 0) {
                        console.log("Oops, out of gumballs");
                        this.m_state = State.SoldOut;
                    }
                    else {
                        if (this.m_quartersCount !== 0) {
                            this.m_state = State.HasQuarter;
                        } else {
                            this.m_state = State.NoQuarter;
                        }
                    }
                    break;
                case State.NoQuarter:
                    console.log("You need to pay first");
                    break;
                case State.SoldOut:
                case State.HasQuarter:
                    console.log("No gumball dispensed");
                    break;
            }
        }

        private m_gumsCount: number;	// Количество шариков
        private m_quartersCount: number;
        private m_state: State = State.SoldOut;

        private readonly QUARTERS_LIMIT: number = 5;
    };
}