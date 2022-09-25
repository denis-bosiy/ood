import { CWeatherData, CDisplay, CStatsDisplay } from "./weatherData";

describe("priorities work properly for observers", () => {
  const log = console.log;

  beforeEach(() => {
    console.log = jest.fn();
  });

  afterAll(() => {
    console.log = log;
  });

  test("Empty observers should be executed with no console logs", () => {
    const wd: CWeatherData = new CWeatherData();

    wd.setMeasurements(3, 0.7, 760);

    expect(console.log).not.toHaveBeenCalled();
  });

  test("1 observer", () => {
    const wd: CWeatherData = new CWeatherData();
    const display: CDisplay = new CDisplay();
    wd.registerObserver(display, 1);

    wd.setMeasurements(3, 0.7, 760);

    expect((console.log as jest.Mock).mock.calls[0][1]).toBe(3);
    expect((console.log as jest.Mock).mock.calls[1][1]).toBe(0.7);
    expect((console.log as jest.Mock).mock.calls[2][1]).toBe(760);
  });

  test("2 observers in reverse order", () => {
    const wd: CWeatherData = new CWeatherData();
    const display1: CDisplay = new CDisplay();
    const display2: CStatsDisplay = new CStatsDisplay();
    wd.registerObserver(display1, 1);
    wd.registerObserver(display2, 2);

    wd.setMeasurements(3, 0.7, 760);

    expect((console.log as jest.Mock).mock.calls[0][2]).toBe(3);
    expect((console.log as jest.Mock).mock.calls[1][2]).toBe(3);
    expect((console.log as jest.Mock).mock.calls[2][2]).toBe(3);
    expect((console.log as jest.Mock).mock.calls[4][2]).toBe(0.7);
    expect((console.log as jest.Mock).mock.calls[5][2]).toBe(0.7);
    expect((console.log as jest.Mock).mock.calls[6][2]).toBe(0.7);
    expect((console.log as jest.Mock).mock.calls[8][2]).toBe(760);
    expect((console.log as jest.Mock).mock.calls[9][2]).toBe(760);
    expect((console.log as jest.Mock).mock.calls[10][2]).toBe(760);
    expect((console.log as jest.Mock).mock.calls[12][1]).toBe(3);
    expect((console.log as jest.Mock).mock.calls[13][1]).toBe(0.7);
    expect((console.log as jest.Mock).mock.calls[14][1]).toBe(760);
  });

  test("2 observers in direct order", () => {
    const wd: CWeatherData = new CWeatherData();
    const display1: CDisplay = new CDisplay();
    const display2: CStatsDisplay = new CStatsDisplay();
    wd.registerObserver(display1, 1);
    wd.registerObserver(display2, -2);

    wd.setMeasurements(3, 0.7, 760);

    expect((console.log as jest.Mock).mock.calls[0][1]).toBe(3);
    expect((console.log as jest.Mock).mock.calls[1][1]).toBe(0.7);
    expect((console.log as jest.Mock).mock.calls[2][1]).toBe(760);
    expect((console.log as jest.Mock).mock.calls[4][2]).toBe(3);
    expect((console.log as jest.Mock).mock.calls[5][2]).toBe(3);
    expect((console.log as jest.Mock).mock.calls[6][2]).toBe(3);
    expect((console.log as jest.Mock).mock.calls[8][2]).toBe(0.7);
    expect((console.log as jest.Mock).mock.calls[9][2]).toBe(0.7);
    expect((console.log as jest.Mock).mock.calls[10][2]).toBe(0.7);
    expect((console.log as jest.Mock).mock.calls[12][2]).toBe(760);
    expect((console.log as jest.Mock).mock.calls[13][2]).toBe(760);
    expect((console.log as jest.Mock).mock.calls[14][2]).toBe(760);
  });

  test("2 observer with the same order", () => {
    const wd: CWeatherData = new CWeatherData();
    const display1: CDisplay = new CDisplay();
    const display2: CStatsDisplay = new CStatsDisplay();
    wd.registerObserver(display1, 1);
    wd.registerObserver(display2, 1);

    wd.setMeasurements(3, 0.7, 760);

    expect((console.log as jest.Mock).mock.calls[0][1]).toBe(3);
    expect((console.log as jest.Mock).mock.calls[1][1]).toBe(0.7);
    expect((console.log as jest.Mock).mock.calls[2][1]).toBe(760);
    expect((console.log as jest.Mock).mock.calls[4][2]).toBe(3);
    expect((console.log as jest.Mock).mock.calls[5][2]).toBe(3);
    expect((console.log as jest.Mock).mock.calls[6][2]).toBe(3);
    expect((console.log as jest.Mock).mock.calls[8][2]).toBe(0.7);
    expect((console.log as jest.Mock).mock.calls[9][2]).toBe(0.7);
    expect((console.log as jest.Mock).mock.calls[10][2]).toBe(0.7);
    expect((console.log as jest.Mock).mock.calls[12][2]).toBe(760);
    expect((console.log as jest.Mock).mock.calls[13][2]).toBe(760);
    expect((console.log as jest.Mock).mock.calls[14][2]).toBe(760);
  });

  test("2 observer with very big priority value", () => {
    const wd: CWeatherData = new CWeatherData();
    const display1: CDisplay = new CDisplay();
    const display2: CStatsDisplay = new CStatsDisplay();
    wd.registerObserver(display1, Number.MAX_SAFE_INTEGER * 1000);
    wd.registerObserver(display2, Number.MAX_SAFE_INTEGER * 1000 + 1);

    wd.setMeasurements(3, 0.7, 760);

    expect((console.log as jest.Mock).mock.calls[0][1]).toBe(3);
    expect((console.log as jest.Mock).mock.calls[1][1]).toBe(0.7);
    expect((console.log as jest.Mock).mock.calls[2][1]).toBe(760);
    expect((console.log as jest.Mock).mock.calls[4][2]).toBe(3);
    expect((console.log as jest.Mock).mock.calls[5][2]).toBe(3);
    expect((console.log as jest.Mock).mock.calls[6][2]).toBe(3);
    expect((console.log as jest.Mock).mock.calls[8][2]).toBe(0.7);
    expect((console.log as jest.Mock).mock.calls[9][2]).toBe(0.7);
    expect((console.log as jest.Mock).mock.calls[10][2]).toBe(0.7);
    expect((console.log as jest.Mock).mock.calls[12][2]).toBe(760);
    expect((console.log as jest.Mock).mock.calls[13][2]).toBe(760);
    expect((console.log as jest.Mock).mock.calls[14][2]).toBe(760);
  });
});