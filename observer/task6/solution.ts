import { CWeatherData, CDisplay, WeatherDataType, CProDisplay, CProWeatherData } from "./weatherData";

const outdoorWeatherData: CProWeatherData = new CProWeatherData(WeatherDataType.Outdoor);
const indoorWeatherData: CWeatherData = new CWeatherData(WeatherDataType.Indoor);
const outdoorDisplay: CProDisplay = new CProDisplay();
const indoorDisplay: CDisplay = new CDisplay();

outdoorWeatherData.registerObserver(outdoorDisplay, 1);
indoorWeatherData.registerObserver(indoorDisplay, 2);

outdoorWeatherData.setMeasurements(4, 0.8, 761, 20, 30);
indoorWeatherData.setMeasurements(3, 0.15, 770);