export {};

interface IFlyBehavior {
  fly(): void;
};

class FlyWithWings implements IFlyBehavior {
  public fly(): void {
    console.log("I'm flying with wings!!");
  }
};

class FlyNoWay implements IFlyBehavior {
  public fly(): void { }
};

interface IQuackBehavior {
  quack(): void;
};

class QuackBehavior implements IQuackBehavior {
  public quack(): void {
    console.log("Quack Quack!!!");
  }
};

class SqueakBehavior implements IQuackBehavior {
  public quack(): void {
    console.log("Squeek!!!");
  }
};

class MuteQuackBehavior implements IQuackBehavior {
  public quack(): void { }
};

class Duck {
  constructor(flyBehavior: IFlyBehavior,
    quackBehavior: IQuackBehavior) {
    this.m_quackBehavior = quackBehavior;
    console.assert(!!this.m_quackBehavior);
    this.setFlyBehavior(flyBehavior);
  }
  public quack(): void {
    this.m_quackBehavior.quack();
  }
  public swim(): void {
    console.log("I'm swimming");
  }
  public fly(): void {
    this.m_flyBehavior.fly();
  }
  public dance(): void {
    console.log("I'm Dancing");
  }
  public setFlyBehavior(flyBehavior: IFlyBehavior): void {
    console.assert(!!flyBehavior);
    this.m_flyBehavior = flyBehavior;
  }
  public display(): void { }

  private m_flyBehavior: IFlyBehavior;
  private m_quackBehavior: IQuackBehavior;
};

class MallardDuck extends Duck {
  constructor() {
    super(new FlyWithWings(), new QuackBehavior());
  }

  public display(): void {
    console.log("I'm mallard duck");
  }
};

class RedheadDuck extends Duck {
  constructor() {
    super(new FlyWithWings(), new QuackBehavior());
  }
  public display(): void {
    console.log("I'm redhead duck")
  }
};

class DecoyDuck extends Duck {
  constructor() {
    super(new FlyNoWay(), new MuteQuackBehavior());
  }

  public display(): void {
    console.log("I'm decoy duck");
  }
  public dance(): void { }
};

class RubberDuck extends Duck {
  constructor() {
    super(new FlyNoWay(), new SqueakBehavior());
  }

  public display(): void {
    console.log("I'm rubber duck");
  }

  public dance(): void { }
};

class ModelDuck extends Duck {
  constructor() {
    super(new FlyNoWay(), new QuackBehavior());
  }

  public display(): void {
    console.log("I'm model duck");
  }

  public dance(): void { }
};

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

const redheadDuck = new RedheadDuck();
playWithDuck(redheadDuck);

const rubberDuck = new RubberDuck();
playWithDuck(rubberDuck);

const decoyDuck = new DecoyDuck();
playWithDuck(decoyDuck);

const modelDuck = new ModelDuck();
playWithDuck(modelDuck);
modelDuck.setFlyBehavior(new FlyWithWings());
playWithDuck(modelDuck);