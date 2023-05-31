import { IModel } from "../Model/IModel";
import { IShape } from "../Shape/IShape";
import { CState } from "../State/CState";
import { IState } from "../State/IState";
import { IHistory } from "../History/IHistory";
import { CHistory } from "../History/CHistory";
import { CFrame } from "../Frame/CFrame";
import { IObserver } from "../Observer/IObserver";
import { ICommand } from "./ICommand";
import { CMoveShapeCommand } from "./CMoveShapeCommand";
import { CRectangle } from "../Shape/CRectangle";
import { CPoint } from "../Point/CPoint";
import { CVector } from "../Vector/CVector";

const mockChangeShapeFrame = jest.fn((shape: IShape, frame: CFrame) => {});

class CMockModel implements IModel {
  public addShape(shape: IShape) {}
  public clearHistory(): void {}
  public deleteShape(shape: IShape): void {}
  public changeShapeFrame(shape: IShape, frame: CFrame): void {
    mockChangeShapeFrame(shape, frame);
    shape.setFrame(new CFrame(frame.x, frame.y, frame.width, frame.height));
  }
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

describe("test CMoveShapeCommand", () => {
  beforeEach(() => {
    mockChangeShapeFrame.mockClear();
  });

  test("Executing should invoke changeShapeFrame with oldFrame.x + delta.x, oldFrame.x + delta.y ...", () => {
    const frame: CFrame = new CFrame(0, 0, 20, 20);
    const leftTopPoint: CPoint = new CPoint(20, 30);
    const shape: IShape = new CRectangle(frame, leftTopPoint, 20, 30);
    const delta: CVector = new CVector(3, 3);
    const moveShapeCommand: ICommand = new CMoveShapeCommand(new CMockModel(), shape, delta);

    moveShapeCommand.execute();

    expect(mockChangeShapeFrame).toBeCalledTimes(1);
    expect(mockChangeShapeFrame.mock.calls[0][0]).toBe(shape);
    expect(mockChangeShapeFrame.mock.calls[0][1].x).toBe(frame.x + delta.x);
    expect(mockChangeShapeFrame.mock.calls[0][1].y).toBe(frame.y + delta.y);
    expect(mockChangeShapeFrame.mock.calls[0][1].width).toBe(frame.width);
    expect(mockChangeShapeFrame.mock.calls[0][1].height).toBe(frame.height);
  });

  test("Unexecuting should invoke changeShapeFrame with oldFrame.x, oldFrame.x ...", () => {
    const frame: CFrame = new CFrame(0, 0, 20, 20);
    const leftTopPoint: CPoint = new CPoint(20, 30);
    const shape: IShape = new CRectangle(frame, leftTopPoint, 20, 30);
    const delta: CVector = new CVector(3, 3);
    const moveShapeCommand: ICommand = new CMoveShapeCommand(new CMockModel(), shape, delta);

    moveShapeCommand.execute();
    moveShapeCommand.unexecute();

    expect(mockChangeShapeFrame).toBeCalledTimes(2);
    expect(mockChangeShapeFrame.mock.calls[0][0]).toBe(shape);
    expect(mockChangeShapeFrame.mock.calls[0][1].x).toBe(frame.x + delta.x);
    expect(mockChangeShapeFrame.mock.calls[0][1].y).toBe(frame.y + delta.y);
    expect(mockChangeShapeFrame.mock.calls[0][1].width).toBe(frame.width);
    expect(mockChangeShapeFrame.mock.calls[0][1].height).toBe(frame.height);
    expect(mockChangeShapeFrame.mock.calls[1][0]).toBe(shape);
    expect(mockChangeShapeFrame.mock.calls[1][1].x).toBe(frame.x);
    expect(mockChangeShapeFrame.mock.calls[1][1].y).toBe(frame.y);
    expect(mockChangeShapeFrame.mock.calls[1][1].width).toBe(frame.width);
    expect(mockChangeShapeFrame.mock.calls[1][1].height).toBe(frame.height);
  });
});
