export { };

// FlyBehavior

const makeCountableFlyWithWings = (): () => void => {
    let departuresCount: number = 0;

    const countableFlyWithWings = (): void => {
        departuresCount++;
        console.log("I'm flying with wings!!", "Departures count =", departuresCount);
    }

    return countableFlyWithWings;
}

const flyWithWings = (): void => {
    console.log("I'm flying with wings!!");
};

const flyNoWay = (): void => { };

// QuackBehavior

const makeDefaultQuack = (): void => {
    console.log("Quack Quack!!!");
}

const makeSqueak = (): void => {
    console.log("Squeek!!!");
}

const makeMutedQuack = (): void => {};

// DanceBehavior

const makeWaltzDance = (): void => {
    console.log("I'm dancing waltz");
}

const makeMinuetDance = (): void => {
    console.log("I'm dancing minuet");
}

const makeNoDance = (): void => {}

// Duck

class Duck {
    constructor(flyBehavior: () => void,
        quackBehavior: () => void,
        danceBehavior: () => void) {
        this.setQuackBehavior(quackBehavior);
        this.setFlyBehavior(flyBehavior);
        this.setDanceBehavior(danceBehavior);
    }
    public quack(): void {
        this.m_quackBehavior();
    }
    public swim(): void {
        console.log("I'm swimming");
    }
    public fly(): void {
        this.m_flyBehavior();
    }
    public dance(): void {
        this.m_danceBehavior();
    }
    public setQuackBehavior(quackBehavior: () => void): void {
        console.assert(!!quackBehavior);
        this.m_quackBehavior = quackBehavior;
    }
    public setFlyBehavior(flyBehavior: () => void): void {
        console.assert(!!flyBehavior);
        this.m_flyBehavior = flyBehavior;
    }
    public setDanceBehavior(danceBehavior: () => void): void {
        console.assert(!!danceBehavior);
        this.m_danceBehavior = danceBehavior;
    }
    public display(): void { }

    private m_flyBehavior: () => void;
    private m_quackBehavior: () => void;
    private m_danceBehavior: () => void;
};

class MallardDuck extends Duck {
    constructor() {
        super(makeCountableFlyWithWings(), makeDefaultQuack, makeWaltzDance);
    }

    public display(): void {
        console.log("I'm mallard duck");
    }
};

class RedheadDuck extends Duck {
    constructor() {
        super(makeCountableFlyWithWings(), makeDefaultQuack, makeMinuetDance);
    }
    public display(): void {
        console.log("I'm redhead duck")
    }
};

class DecoyDuck extends Duck {
    constructor() {
        super(flyNoWay, makeMutedQuack, makeNoDance);
    }

    public display(): void {
        console.log("I'm decoy duck");
    }
};

class RubberDuck extends Duck {
    constructor() {
        super(flyNoWay, makeSqueak, makeNoDance);
    }

    public display(): void {
        console.log("I'm rubber duck");
    }
};

class ModelDuck extends Duck {
    constructor() {
        super(flyNoWay, makeDefaultQuack, makeNoDance);
    }

    public display(): void {
        console.log("I'm model duck");
    }
};

// Функции для взаимодействия с утками

function drawDuck(duck: Duck): void {
    duck.display();
}

function playWithDuck(duck: Duck): void {
    drawDuck(duck);
    duck.quack();
    duck.fly();
    duck.dance();
    console.log("");
}

// Основной код выполнения

const mallardDuck = new MallardDuck();
playWithDuck(mallardDuck);
playWithDuck(mallardDuck);
mallardDuck.setFlyBehavior(makeCountableFlyWithWings());
console.log("Changed behavior\n");
playWithDuck(mallardDuck);

const redheadDuck = new RedheadDuck();
playWithDuck(redheadDuck);

const rubberDuck = new RubberDuck();
playWithDuck(rubberDuck);

const decoyDuck = new DecoyDuck();
playWithDuck(decoyDuck);

const modelDuck = new ModelDuck();
playWithDuck(modelDuck);
modelDuck.setFlyBehavior(flyWithWings);
playWithDuck(modelDuck);