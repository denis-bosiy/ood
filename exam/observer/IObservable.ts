import { IObserver } from "./IObserver"

export interface IObservable {
    addObserver(o: IObserver): void
    removeObserver(o: IObserver): void
    notify(): void
}