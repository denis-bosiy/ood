import { IObservable } from "./IObservable";
import { IObserver } from "./IObserver";

export class CDog implements IObservable {
    private m_pos: number;
    private m_velocity: number;
    private m_observers: IObserver[];

    constructor(pos: number, velocity: number) {
        this.m_pos = pos;
        this.m_velocity = velocity;
        this.m_observers = [];
    }

    public tick(t: number) {
        this.m_pos += this.m_velocity * t;
        this.notify();
    }

    public getPos(): number {
        return this.m_pos;
    }

    public addObserver(o: IObserver) {
        const foundObserverIndex: number = this.m_observers.indexOf(o);
        
        this.m_observers.push(o);
    }

    public removeObserver(o: IObserver): void {
        const foundObserverIndex: number = this.m_observers.indexOf(o);

        if (foundObserverIndex !== -1) {
            this.m_observers.splice(foundObserverIndex, 1);
        }
    }

    public notify(): void {
        this.m_observers.forEach((o: IObserver) => o.update());
    }

    public changeDirection(): void {
        this.m_velocity *= -1;
        console.log("I have changed direction");
    }
}