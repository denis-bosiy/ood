import { CDog } from "./CDog";
import { CEnclosure } from "./CEnclosure";
import { IObserver } from "./IObserver";

export class CWatchman implements IObserver {
    private m_dog: CDog;
    private m_enclosure: CEnclosure;

    constructor(dog: CDog, enclosure: CEnclosure) {
        this.m_dog = dog;
        this.m_enclosure = enclosure;
    }

    public update(data: number): void {
        const dogsPos: number = data;

        if (dogsPos < this.m_enclosure.getX0() || dogsPos > this.m_enclosure.getX1()) {
            this.m_dog.changeDirection();
        }
    }
}