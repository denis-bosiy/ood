import { CWeatherData, CDisplay, CStatsDisplay } from "./weatherData";

const wd: CWeatherData = new CWeatherData();

const display: CDisplay = new CDisplay();
wd.registerObserver(display, 1);

const statsDisplay: CStatsDisplay = new CStatsDisplay();
wd.registerObserver(statsDisplay, -2);

wd.setMeasurements(3, 0.7, 760);