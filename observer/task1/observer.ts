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
  registerObserver(observer: IObserver<T>): void;
  notifyObservers(): void;
  removeObserver(observer: IObserver<T>): void;
};

// Реализация интерфейса IObservable

export abstract class CObservable<T> implements IObservable<T>
{
  private m_observers: Set<IObserver<T>> = new Set();

  // Классы-наследники должны перегрузить данный метод, 
  // в котором возвращать информацию об изменениях в объекте
  protected abstract getChangedData(): T;

  public registerObserver(observer: IObserver<T>): void {
    this.m_observers.add(observer);
  }

  public notifyObservers(): void {
    const data: T = this.getChangedData();
    this.m_observers.forEach((observer: IObserver<T>) => {observer.update(data);});
  }

  public removeObserver(observer: IObserver<T>): void {
    this.m_observers.delete(observer);
  }
};