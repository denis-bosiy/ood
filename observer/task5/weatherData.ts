import { IObserver, CObservable } from "./observer";

interface SWindInfo {
  speed: number;
  direction: number;
}

interface IWeatherInfo {
  temperature: number;
  humidity: number;
  pressure: number;
  windInfo: SWindInfo;
}

class IWeatherInfoStats {
  private temperatureStats: Stats;
  private humidityStats: Stats;
  private pressureStats: Stats;
  private windInfoSpeedStats: Stats;
  private windInfoDirec

  constructor(temperatureStats: Stats, humidityStats: Stats, pressureStats: Stats) {
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

  public update(weatherDataType: WeatherDataType, data: IWeatherInfo): void {
    console.log("Weather data type", weatherDataType);
    console.log("Current Temp", data.temperature);
    console.log("Current Humidity", data.humidity);
    console.log("Current Pressure", data.pressure);
    console.log("----------");
  }
};

class Stats {
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
  private m_infoStats: IWeatherInfoStats = new IWeatherInfoStats(new Stats("Temperature"), new Stats("Humidity"), new Stats("Pressure"));

  /* Метод Update сделан приватным, чтобы ограничить возможность его вызова напрямую
  Классу CObservable он будет доступен все равно, т.к. в интерфейсе IObserver он
  остается публичным
  */

  public update(weatherDatType: WeatherDataType, data: IWeatherInfo): void {
    console.log("Weather data type", weatherDatType);
    this.m_infoStats.updateStats(data);
    this.m_infoStats.showStats();
  }
};

export enum WeatherDataType
{
  Outdoor = "outdoor",
  Indoor = "indoor"
};

export class CWeatherData extends CObservable<IWeatherInfo>
{
  private m_temperature: number = 0.0;
  private m_humidity: number = 0.0;
  private m_pressure: number = 760.0;

  constructor(observableName?: string)
  {
    super(observableName);
  }

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