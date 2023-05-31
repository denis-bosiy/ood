import { IModel } from "../Model/IModel";
import { IShape } from "../Shape/IShape";
import { CState } from "../State/CState";
import { IState } from "../State/IState";
import { IHistory } from "../History/IHistory";
import { CHistory } from "../History/CHistory";
import { CFrame } from "../Frame/CFrame";
import { IObserver } from "../Observer/IObserver";
import { ICommand } from "./ICommand";
import { CAddShapeCommand } from "./CAddShapeCommand";
import { CRectangle } from "../Shape/CRectangle";
import { CPoint } from "../Point/CPoint";

const mockAddShape = jest.fn((shape: IShape) => {});
const mockDeleteShape = jest.fn((shape: IShape) => {});

class CMockModel implements IModel {
  public addShape(shape: IShape) {
    mockAddShape(shape);
  }
  public clearHistory(): void {}
  public deleteShape(shape: IShape): void {
    mockDeleteShape(shape);
  }
  public changeShapeFrame(shape: IShape, frame: CFrame): void {}
  public canUndo(): boolean {
    return true;
  }
  public canRedo(): boolean {
    return false;
  }
  public undo(): void {}
  public redo(): void {}
  public setCurrentShape(shape: IShape | null): void {}
  public getCurrentShape(): IShape | null {
    return null;
  }
  public getState(): IState {
    return new CState();
  }
  public setState(state: IState): void {}
  public getHistory(): IHistory {
    return new CHistory();
  }
  public setHistory(history: IHistory): void {}
  public registerObserver(o: IObserver): void {}
  public removeObserver(o: IObserver): void {}
  public notifyObservers(): void {}
}

describe("test CAddShapeCommand", () => {
  beforeEach(() => {
    mockAddShape.mockClear();
    mockDeleteShape.mockClear();
  });

  test("Executing should invoke addShape method of the model", () => {
    const frame: CFrame = new CFrame(0, 0, 20, 20);
    const leftTopPoint: CPoint = new CPoint(20, 30);
    const shape: IShape = new CRectangle(frame, leftTopPoint, 20, 30);
    const addShapeCommand: ICommand = new CAddShapeCommand(shape, new CMockModel());

    addShapeCommand.execute();

    expect(mockAddShape).toBeCalledTimes(1);
    expect(mockDeleteShape).toBeCalledTimes(0);
    expect(mockAddShape.mock.calls[0][0]).toBe(shape);
  });

  test("Executing should invoke addShape method of the model", () => {
    const frame: CFrame = new CFrame(0, 0, 20, 20);
    const leftTopPoint: CPoint = new CPoint(20, 30);
    const shape: IShape = new CRectangle(frame, leftTopPoint, 20, 30);
    const addShapeCommand: ICommand = new CAddShapeCommand(shape, new CMockModel());

    addShapeCommand.execute();
    addShapeCommand.unexecute();

    expect(mockDeleteShape).toBeCalledTimes(1);
    expect(mockAddShape).toBeCalledTimes(1);
    expect(mockDeleteShape.mock.calls[0][0]).toBe(shape);
    expect(mockAddShape.mock.calls[0][0]).toBe(shape);
  });
});
