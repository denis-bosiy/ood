/*
Шаблонный интерфейс IObserver. Его должен реализовывать класс, 
желающий получать уведомления от соответствующего IObservable
Параметром шаблона является тип аргумента,
передаваемого Наблюдателю в метод update
*/

export interface IObserver<T> {
    update(data: T): void;
};

/*
Шаблонный интерфейс IObservable. Позволяет подписаться и отписаться на оповещения, а также
инициировать рассылку уведомлений зарегистрированным наблюдателям.
*/

interface IObservable<T> {
    registerObserver(observer: IObserver<T>, priority: number, parameters: string[]): void;
    notifyObservers(): void;
    removeObserver(observer: IObserver<T>): void;
};

class ParametrableObservers<T> {
    public parameters: string[]
    public observers: Set<IObserver<T>>;

    constructor(parameters: string[], observers: Set<IObserver<T>>) {
        this.parameters = parameters;
        this.observers = observers;
    }
}
// Реализация интерфейса IObservable

export abstract class CObservable<T> implements IObservable<T>
{
    private m_observersMap: Map<number, ParametrableObservers<T>[]> = new Map();
    private m_sortedPriorities: Array<number> = [];

    private addPriority(priority): void {
        this.m_observersMap.set(priority, []);

        let indexForInsertion = 0;
        while (this.m_sortedPriorities && this.m_sortedPriorities[indexForInsertion] > priority) {
            indexForInsertion++;
        }
        this.m_sortedPriorities.splice(indexForInsertion, 0, priority)
    }

    // Классы-наследники должны перегрузить данный метод, 
    // в котором возвращать информацию об изменениях в объекте
    protected abstract getChangedData(): T;

    public registerObserver(observer: IObserver<T>, priority: number, parameters: string[]): void {
        if (!this.m_observersMap.has(priority)) {
            this.addPriority(priority);
        }
        this.m_observersMap.get(priority)?.push(new ParametrableObservers<T>(parameters, new Set<IObserver<T>>([observer])));
    }

    public notifyObservers(): void {
        const data: T = this.getChangedData();

        this.m_sortedPriorities.forEach((priority: number) => {
            this.m_observersMap.get(priority)?.forEach((parametrableObservers: ParametrableObservers<T>) => {
                parametrableObservers.observers.forEach((observer: IObserver<T>) => {
                    observer.update(data)
                })
            });
        });
    }

    public removeObserver(observer: IObserver<T>): void {
        this.m_observersMap.forEach((parametrableObserversList: ParametrableObservers<T>[], priority: number) => {
            parametrableObserversList.forEach((parametrableObservers: ParametrableObservers<T>) => {
                parametrableObservers.observers.delete(observer);
            })
        });
        // TODO: m_sortedPriorities тоже удалять
        const emptyPriorities: number[] = [];
        const emptyParametrableObservers: ParametrableObservers<T>[] = [];
        this.m_observersMap.forEach((parametrableObserversList: ParametrableObservers<T>[], priority: number) => {
            parametrableObserversList.forEach((parametrableObservers: ParametrableObservers<T>) => {
                if (parametrableObservers.observers.size === 0)
                {
                    emptyParametrableObservers.push(parametrableObservers);
                }
            })
        });
        this.m_observersMap.forEach((parametrableObserversList: ParametrableObservers<T>[], priority: number) => {
            parametrableObserversList.
        })
        emptyPriorities.forEach((priority: number) => {
            this.m_observersMap.delete(priority);
        });
        this.m_sortedPriorities = this.m_sortedPriorities.filter((priority: number) => !emptyPriorities.includes(priority));
    }
};