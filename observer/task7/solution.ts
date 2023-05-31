import { CProWeatherData, CProStatsDisplay } from "./weatherData";

const wd: CProWeatherData = new CProWeatherData();

const proStatsDisplay: CProStatsDisplay = new CProStatsDisplay();
wd.registerObserver(proStatsDisplay, 1);

wd.setMeasurements(3, 0.7, 760, 20, 30);
wd.setMeasurements(3, 0.7, 760, 50, 720);