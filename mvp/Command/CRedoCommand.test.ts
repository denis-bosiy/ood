import { IModel } from "../Model/IModel";
import { IShape } from "../Shape/IShape";
import { CFrame } from "../Frame/CFrame";
import { IState } from "../State/IState";
import { CState } from "../State/CState";
import { IHistory } from "../History/IHistory";
import { CHistory } from "../History/CHistory";
import { IObserver } from "../Observer/IObserver";
import { CRedoCommand } from "./CRedoCommand";

const undoMockFunction = jest.fn(() => {});
const falsyCanUndoMockFunction = jest.fn(() => {
  return false;
});
const truthyCanUndoMockFunction = jest.fn(() => {
  return true;
});
const redoMockFunction = jest.fn(() => {});
const falsyCanRedoMockFunction = jest.fn(() => {
  return false;
});
const truthyCanRedoMockFunction = jest.fn(() => {
  return true;
});

class CFalsyMockModel implements IModel {
  public addShape(shape: IShape): void {}
  public clearHistory(): void {}
  public deleteShape(shape: IShape): void {}
  public changeShapeFrame(shape: IShape, frame: CFrame): void {}
  public canUndo(): boolean {
    return falsyCanUndoMockFunction();
  }
  public canRedo(): boolean {
    return falsyCanRedoMockFunction();
  }
  public undo(): void {
    undoMockFunction();
  }
  public redo(): void {
    redoMockFunction();
  }
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

class CFalsyTruthyMockModel implements IModel {
  public addShape(shape: IShape): void {}
  public clearHistory(): void {}
  public deleteShape(shape: IShape): void {}
  public changeShapeFrame(shape: IShape, frame: CFrame): void {}
  public canUndo(): boolean {
    return falsyCanUndoMockFunction();
  }
  public canRedo(): boolean {
    return truthyCanRedoMockFunction();
  }
  public undo(): void {
    undoMockFunction();
  }
  public redo(): void {
    redoMockFunction();
  }
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

class CTruthyFalsyMockModel implements IModel {
  public addShape(shape: IShape): void {}
  public clearHistory(): void {}
  public deleteShape(shape: IShape): void {}
  public changeShapeFrame(shape: IShape, frame: CFrame): void {}
  public canUndo(): boolean {
    return truthyCanUndoMockFunction();
  }
  public canRedo(): boolean {
    return falsyCanRedoMockFunction();
  }
  public undo(): void {
    undoMockFunction();
  }
  public redo(): void {
    redoMockFunction();
  }
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

class CTruthyMockModel implements IModel {
  public addShape(shape: IShape): void {}
  public clearHistory(): void {}
  public deleteShape(shape: IShape): void {}
  public changeShapeFrame(shape: IShape, frame: CFrame): void {}
  public canUndo(): boolean {
    return truthyCanUndoMockFunction();
  }
  public canRedo(): boolean {
    return truthyCanRedoMockFunction();
  }
  public undo(): void {
    undoMockFunction();
  }
  public redo(): void {
    redoMockFunction();
  }
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

describe("test CRedoCommand", () => {
  beforeEach(() => {
    undoMockFunction.mockClear();
    falsyCanUndoMockFunction.mockClear();
    truthyCanUndoMockFunction.mockClear();
    redoMockFunction.mockClear();
    falsyCanRedoMockFunction.mockClear();
    truthyCanRedoMockFunction.mockClear();
  });

  test("unexecute undo command with falsy can undo and redo", () => {
    const mockModel: IModel = new CFalsyMockModel();
    const redoCommand: CRedoCommand = new CRedoCommand(mockModel);

    expect(() => redoCommand.execute()).toThrowError("Can not redo command");
    expect(() => redoCommand.unexecute()).toThrowError(
      "Can not unexecute redo command"
    );
    expect(falsyCanUndoMockFunction).toHaveBeenCalledTimes(1);
    expect(undoMockFunction).toHaveBeenCalledTimes(0);
    expect(falsyCanRedoMockFunction).toHaveBeenCalledTimes(1);
    expect(redoMockFunction).toHaveBeenCalledTimes(0);
  });

  test("unexecute undo command with falsy can undo and truthy can redo", () => {
    const mockModel: IModel = new CFalsyTruthyMockModel();
    const redoCommand: CRedoCommand = new CRedoCommand(mockModel);

    redoCommand.execute();
    expect(() => redoCommand.unexecute()).toThrowError(
      "Can not unexecute redo command"
    );
    expect(falsyCanUndoMockFunction).toHaveBeenCalledTimes(1);
    expect(undoMockFunction).toHaveBeenCalledTimes(0);
    expect(truthyCanRedoMockFunction).toHaveBeenCalledTimes(1);
    expect(redoMockFunction).toHaveBeenCalledTimes(1);
  });

  test("execute undo command with truthy can undo and falsy can redo", () => {
    const mockModel: IModel = new CTruthyFalsyMockModel();
    const redoCommand: CRedoCommand = new CRedoCommand(mockModel);

    expect(() => redoCommand.execute()).toThrowError("Can not redo command");
    expect(truthyCanUndoMockFunction).toHaveBeenCalledTimes(0);
    expect(undoMockFunction).toHaveBeenCalledTimes(0);
    expect(falsyCanRedoMockFunction).toHaveBeenCalledTimes(1);
    expect(redoMockFunction).toHaveBeenCalledTimes(0);
  });

  test("execute undo command with truthy can undo and redo", () => {
    const mockModel: IModel = new CTruthyMockModel();
    const redoCommand: CRedoCommand = new CRedoCommand(mockModel);

    redoCommand.execute();

    expect(truthyCanUndoMockFunction).toHaveBeenCalledTimes(0);
    expect(undoMockFunction).toHaveBeenCalledTimes(0);
    expect(truthyCanRedoMockFunction).toHaveBeenCalledTimes(1);
    expect(redoMockFunction).toHaveBeenCalledTimes(1);
  });
});
