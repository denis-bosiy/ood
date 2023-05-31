import { IObserver } from "../Observer/IObserver";

export interface IObservable {
    registerObserver(o: IObserver): void;
    removeObserver(o: IObserver): void;
    notifyObservers(): void;
}