import { IObservable } from "../Observable/IObservable";
import { IShape } from "../Shape/IShape";
import { CFrame } from "../Frame/CFrame";
import { IState } from "../State/IState";
import { IHistory } from "../History/IHistory";

export interface IModel extends IObservable {
  addShape(shape: IShape): void;
  clearHistory(): void;
  deleteShape(shape: IShape): void;
  changeShapeFrame(shape: IShape, frame: CFrame): void;
  canUndo(): boolean;
  canRedo(): boolean;
  undo(): void;
  redo(): void;
  setCurrentShape(shape: IShape | null): void;
  getCurrentShape(): IShape | null;
  getState(): IState;
  setState(state: IState): void;
  getHistory(): IHistory;
  setHistory(history: IHistory): void;
}
