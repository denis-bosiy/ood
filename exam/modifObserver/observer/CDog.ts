import { IObservable } from "./IObservable";
import { IObserver } from "./IObserver";

export class CDog implements IObservable {
    private m_pos: number;
    private m_velocity: number;
    private m_observers: Map<string, IObserver[]>;

    constructor(pos: number, velocity: number) {
        this.m_pos = pos;
        this.m_velocity = velocity;
        this.m_observers = new Map();
    }

    public tick(t: number) {
        this.m_pos += this.m_velocity * t;
        this.notify();
    }

    public getPos(): number {
        return this.m_pos;
    }

    public addObserver(modif: string, o: IObserver) {
        if (this.m_observers.has(modif)) {
            this.m_observers.get(modif)?.push(o);
        }
        this.m_observers.set(modif, [o]);
    }

    public removeObserver(modif: string, o: IObserver): void {
        const foundObserverIndex: number | undefined = this.m_observers.get(modif)?.indexOf(o);

        if (foundObserverIndex && foundObserverIndex !== -1) {
            this.m_observers.get(modif)?.splice(foundObserverIndex, 1);
        }
    }

    public notify(): void {
        for (const [modif, observers] of this.m_observers.entries()) {
            if (modif === "pos") {
                observers.forEach((o: IObserver) => o.update(this.m_pos));
            }
            if (modif === "velocity") {
                observers.forEach((o: IObserver) => o.update(this.m_velocity));
            }
          }
    }

    public changeDirection(): void {
        this.m_velocity *= -1;
        console.log("I have changed direction");
    }
}