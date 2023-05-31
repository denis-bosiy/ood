import { IObserver } from "./IObserver"

export interface IObservable {
    addObserver(modif: string, o: IObserver): void
    removeObserver(modif: string, o: IObserver): void
    notify(modif: string): void
}