import { CWeatherData, CDisplay, WeatherDataType } from "./weatherData";

describe("subject's notifiers names work properly", () => {
    const log = console.log;
  
    beforeEach(() => {
      console.log = jest.fn();
    });
  
    afterAll(() => {
      console.log = log;
    });
  
    test("Empty observers", () => {
      const wd: CWeatherData = new CWeatherData();
  
      wd.setMeasurements(3, 0.7, 760);
  
      expect(console.log).not.toHaveBeenCalled();
    });
  
    test("1 observerable without name", () => {
      const wd: CWeatherData = new CWeatherData();
      const display: CDisplay = new CDisplay();
      wd.registerObserver(display, 1);
  
      wd.setMeasurements(3, 0.7, 760);
  
      expect((console.log as jest.Mock).mock.calls[0][1]).toBe("Unnamed");
      expect((console.log as jest.Mock).mock.calls[1][1]).toBe(3);
      expect((console.log as jest.Mock).mock.calls[2][1]).toBe(0.7);
      expect((console.log as jest.Mock).mock.calls[3][1]).toBe(760);
    });

    test("1 observerable with name", () => {
      const wd: CWeatherData = new CWeatherData(WeatherDataType.Indoor);
      const display: CDisplay = new CDisplay();
      wd.registerObserver(display, 1);
  
      wd.setMeasurements(3, 0.7, 760);
  
      expect((console.log as jest.Mock).mock.calls[0][1]).toBe(WeatherDataType.Indoor);
      expect((console.log as jest.Mock).mock.calls[1][1]).toBe(3);
      expect((console.log as jest.Mock).mock.calls[2][1]).toBe(0.7);
      expect((console.log as jest.Mock).mock.calls[3][1]).toBe(760);
    });

    test("2 observerables with names for each", () => {
      const indoorWd: CWeatherData = new CWeatherData(WeatherDataType.Indoor);
      const outdoorWd: CWeatherData = new CWeatherData(WeatherDataType.Outdoor);
      const display: CDisplay = new CDisplay();
      indoorWd.registerObserver(display, 1);
      outdoorWd.registerObserver(display, 1);
  
      indoorWd.setMeasurements(3, 0.7, 760);
      outdoorWd.setMeasurements(2, 0.8, 690);
  
      expect((console.log as jest.Mock).mock.calls[0][1]).toBe(WeatherDataType.Indoor);
      expect((console.log as jest.Mock).mock.calls[1][1]).toBe(3);
      expect((console.log as jest.Mock).mock.calls[2][1]).toBe(0.7);
      expect((console.log as jest.Mock).mock.calls[3][1]).toBe(760);
      expect((console.log as jest.Mock).mock.calls[5][1]).toBe(WeatherDataType.Outdoor);
      expect((console.log as jest.Mock).mock.calls[6][1]).toBe(2);
      expect((console.log as jest.Mock).mock.calls[7][1]).toBe(0.8);
      expect((console.log as jest.Mock).mock.calls[8][1]).toBe(690);
    });
});