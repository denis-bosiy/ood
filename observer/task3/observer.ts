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
  registerObserver(observer: IObserver<T>, priority: number): void;
  notifyObservers(): void;
  removeObserver(observer: IObserver<T>): void;
};

// Реализация интерфейса IObservable

export abstract class CObservable<T> implements IObservable<T>
{
  private m_observersMap: Map<number, Set<IObserver<T>>> = new Map();
  private m_sortedPriorities: Array<number> = [];

  private addPriority(priority): void {
    this.m_observersMap.set(priority, new Set<IObserver<T>>());

    let indexForInsertion = 0;
    while(this.m_sortedPriorities && this.m_sortedPriorities[indexForInsertion] > priority)
    {
      indexForInsertion++;
    }
    this.m_sortedPriorities.splice(indexForInsertion, 0, priority)
  }

  // Классы-наследники должны перегрузить данный метод, 
  // в котором возвращать информацию об изменениях в объекте
  protected abstract getChangedData(): T;

  public registerObserver(observer: IObserver<T>, priority: number): void {
    if (!this.m_observersMap.has(priority)) {
      this.addPriority(priority);
    }
    this.m_observersMap.get(priority)?.add(observer);
  }

  public notifyObservers(): void {
    const data: T = this.getChangedData();

    this.m_sortedPriorities.forEach((priority: number) => {
      this.m_observersMap.get(priority)?.forEach((observer: IObserver<T>) => {
        observer.update(data);
      });
    });
  }

  public removeObserver(observer: IObserver<T>): void {
    this.m_observersMap.forEach((observers: Set<IObserver<T>>) => observers.has(observer) ? observers.delete(observer) : {})
  }
};