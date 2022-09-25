import { IObserver, CObservable } from "./observer";

interface IWeatherInfo {
  temperature: number;
  humidity: number;
  pressure: number;
}

class CWeatherInfoStats {
  private temperatureStats: CStats;
  private humidityStats: CStats;
  private pressureStats: CStats

  constructor(temperatureStats: CStats, humidityStats: CStats, pressureStats: CStats) {
    this.temperatureStats = temperatureStats;
    this.humidityStats = humidityStats;
    this.pressureStats = pressureStats;
  }

  public updateStats(data: IWeatherInfo) {
    this.temperatureStats.updateStats(data.temperature);
    this.humidityStats.updateStats(data.humidity);
    this.pressureStats.updateStats(data.pressure);
  }

  public showStats() {
    this.temperatureStats.showStats();
    this.humidityStats.showStats();
    this.pressureStats.showStats();
  }
}

export class CDisplay implements IObserver<IWeatherInfo>
{
  /* Метод Update сделан приватным, чтобы ограничить возможность его вызова напрямую
      Классу CObservable он будет доступен все равно, т.к. в интерфейсе IObserver он
      остается публичным
  */

  public update(data: IWeatherInfo): void {
    console.log("Current Temp", data.temperature);
    console.log("Current Humidity", data.humidity);
    console.log("Current Pressure", data.pressure);
    console.log("----------");
  }
};

class CStats {
  private m_minValue: number = Number.MAX_SAFE_INTEGER;
  private m_maxValue: number = Number.MIN_SAFE_INTEGER;
  private m_accValue: number = 0;
  private m_countAcc: number = 0;
  private m_name: string = "";

  constructor(name: string) {
    this.m_name = name;
  }

  public updateStats(newValue: number) {
    if (this.m_minValue > newValue) {
      this.m_minValue = newValue;
    }
    if (this.m_maxValue < newValue) {
      this.m_maxValue = newValue;
    }
    this.m_accValue += newValue;
    ++this.m_countAcc;
  }

  public showStats() {
    console.log("Max", this.m_name, this.m_maxValue);
    console.log("Min", this.m_name, this.m_minValue);
    console.log("Average", this.m_name, this.m_accValue / this.m_countAcc);
    console.log("-----------");
  }
}

export class CStatsDisplay implements IObserver<IWeatherInfo>
{
  private m_infoStats: CWeatherInfoStats = new CWeatherInfoStats(new CStats("Temperature"), new CStats("Humidity"), new CStats("Pressure"));

  /* Метод Update сделан приватным, чтобы ограничить возможность его вызова напрямую
  Классу CObservable он будет доступен все равно, т.к. в интерфейсе IObserver он
  остается публичным
  */

  public update(data: IWeatherInfo): void {
    this.m_infoStats.updateStats(data);
    this.m_infoStats.showStats();
  }
};

export class CWeatherData extends CObservable<IWeatherInfo>
{
  private m_temperature: number = 0.0;
  private m_humidity: number = 0.0;
  private m_pressure: number = 760.0;

  protected getChangedData(): IWeatherInfo {
    return { temperature: this.getTemperature(), humidity: this.getHumidity(), pressure: this.getPressure() };
  }

  // Температура в градусах Цельсия
  public getTemperature(): number {
    return this.m_temperature;
  }

  // Относительная влажность (0...100)
  public getHumidity(): number {
    return this.m_humidity;
  }

  // Атмосферное давление (в мм.рт.ст)
  public getPressure(): number {
    return this.m_pressure;
  }

  public measurementsChanged(): void {
    this.notifyObservers();
  }

  public setMeasurements(temp: number, humidity: number, pressure: number): void {
    this.m_humidity = humidity;
    this.m_temperature = temp;
    this.m_pressure = pressure;

    this.measurementsChanged();
  }
};