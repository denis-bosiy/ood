import { IObserver, CObservable } from "./observer";

const MAX_ANGLE_DEGREE: number = 360;

interface IWeatherInfo {
    temperature: number;
    humidity: number;
    pressure: number;
}

interface IProWeatherInfo extends IWeatherInfo {
    windSpeed: number;
    windDirection: number;
}

class CWeatherInfoStats {
    protected temperatureStats: CStats;
    protected humidityStats: CStats;
    protected pressureStats: CStats

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

class CProWeatherInfoStats extends CWeatherInfoStats {
    protected windSpeedStats: CStats;
    protected windDirectionStats: CStats;

    constructor(temperatureStats: CStats, humidityStats: CStats, pressureStats: CStats, windSpeedStats: CStats, windDirectionStats: CStats) {
        super(temperatureStats, humidityStats, pressureStats);
        this.windSpeedStats = windSpeedStats;
        this.windDirectionStats = windDirectionStats;
    }

    public updateStats(data: IProWeatherInfo) {
        this.temperatureStats.updateStats(data.temperature);
        this.humidityStats.updateStats(data.humidity);
        this.pressureStats.updateStats(data.pressure);
        this.windSpeedStats.updateStats(data.windSpeed);
        this.windDirectionStats.updateStats(data.windDirection);
    }

    public showStats() {
        this.temperatureStats.showStats();
        this.humidityStats.showStats();
        this.pressureStats.showStats();
        this.windSpeedStats.showStats();
        this.windDirectionStats.showStats();
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

export class CProDisplay implements IObserver<IProWeatherInfo> {
    public update(data: IProWeatherInfo): void {
        console.log("Current Temp", data.temperature);
        console.log("Current Humidity", data.humidity);
        console.log("Current Pressure", data.pressure);
        console.log("Current wind speed", data.windSpeed);
        console.log("Current wind direction", data.windDirection);
        console.log("----------");
    }
}

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

export class CProStatsDisplay implements IObserver<IProWeatherInfo>
{
    private m_infoStats: CProWeatherInfoStats = new CProWeatherInfoStats(new CStats("Temperature"), new CStats("Humidity"), new CStats("Pressure"), new CStats("Wind speed"), new CStats("Wind direction"));

    public update(data: IProWeatherInfo): void {
        this.m_infoStats.updateStats(data);
        this.m_infoStats.showStats();
    }
}

export class CWeatherData extends CObservable<IWeatherInfo>
{
    private m_weatherInfo: IWeatherInfo = {} as IWeatherInfo;

    protected getChangedData(): IWeatherInfo {
        return { temperature: this.getTemperature(), humidity: this.getHumidity(), pressure: this.getPressure() };
    }

    // Температура в градусах Цельсия
    public getTemperature(): number {
        return this.m_weatherInfo.temperature;
    }

    // Относительная влажность (0...100)
    public getHumidity(): number {
        return this.m_weatherInfo.humidity;
    }

    // Атмосферное давление (в мм.рт.ст)
    public getPressure(): number {
        return this.m_weatherInfo.pressure;
    }

    public measurementsChanged(): void {
        this.notifyObservers();
    }

    public setMeasurements(temp: number, humidity: number, pressure: number): void {
        this.m_weatherInfo.humidity = humidity;
        this.m_weatherInfo.temperature = temp;
        this.m_weatherInfo.pressure = pressure;

        this.measurementsChanged();
    }
};

export class CProWeatherData extends CObservable<IProWeatherInfo>
{
    private m_weatherInfo: IProWeatherInfo = {} as IProWeatherInfo;

    protected getChangedData(): IProWeatherInfo {
        return { temperature: this.getTemperature(), humidity: this.getHumidity(), pressure: this.getPressure(), windSpeed: this.getWindSpeed(), windDirection: this.getWindDirection() };
    }

    // Температура в градусах Цельсия
    public getTemperature(): number {
        return this.m_weatherInfo.temperature;
    }

    // Относительная влажность (0...100)
    public getHumidity(): number {
        return this.m_weatherInfo.humidity;
    }

    // Атмосферное давление (в мм.рт.ст)
    public getPressure(): number {
        return this.m_weatherInfo.pressure;
    }

    // Скорость ветра (в м/с)
    public getWindSpeed(): number {
        return this.m_weatherInfo.windSpeed;
    }

    // Направление движения ветра (в градусах)
    public getWindDirection(): number {
        return this.m_weatherInfo.windDirection;
    }

    public measurementsChanged(): void {
        this.notifyObservers();
    }

    public setMeasurements(temp: number, humidity: number, pressure: number, windSpeed: number, windDirection: number): void {
        this.m_weatherInfo.humidity = humidity;
        this.m_weatherInfo.temperature = temp;
        this.m_weatherInfo.pressure = pressure;
        this.m_weatherInfo.windSpeed = windSpeed;
        this.m_weatherInfo.windDirection = windDirection % MAX_ANGLE_DEGREE;

        this.measurementsChanged();
    }
}