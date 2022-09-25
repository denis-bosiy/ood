import { CWeatherData, CDisplay, WeatherDataType } from "./weatherData";

const outdoorWeatherData: CWeatherData = new CWeatherData(WeatherDataType.Outdoor);
const indoorWeatherData: CWeatherData = new CWeatherData(WeatherDataType.Indoor);
const outdoorDisplay: CDisplay = new CDisplay();
const indoorDisplay: CDisplay = new CDisplay();

outdoorWeatherData.registerObserver(outdoorDisplay, 1);
indoorWeatherData.registerObserver(indoorDisplay, 2);

outdoorWeatherData.setMeasurements(4, 0.8, 761);
indoorWeatherData.setMeasurements(3, 0.15, 770);