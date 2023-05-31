import { CFrame } from "./Frame/CFrame";
import { CHistory } from "./History/CHistory";
import { IHistory } from "./History/IHistory";
import { CModel } from "./Model/CModel";
import { IModel } from "./Model/IModel";
import { IObserver } from "./Observer/IObserver";
import { CPoint } from "./Point/CPoint";
import { CPresenter } from "./presenter";
import { CEllipse } from "./Shape/CEllipse";
import { IShape } from "./Shape/IShape";
import { ShapeType } from "./shapeType";
import { CState } from "./State/CState";
import { IState } from "./State/IState";
import { CVector } from "./Vector/CVector";

const mockSetCurrentShape = jest.fn((shape: IShape | null) => { });
const mockUndo = jest.fn(() => {});
const mockRedo = jest.fn(() => {});

class CMockModel implements IModel {
  private canUndoVar: boolean;
  private canRedoVar: boolean;

  constructor(canUndo: boolean = true, canRedo: boolean = true) {
    this.canUndoVar = canUndo;
    this.canRedoVar = canRedo;
  }

  public addShape(shape: IShape) { }
  public clearHistory(): void { }
  public deleteShape(shape: IShape): void { }
  public changeShapeFrame(shape: IShape, frame: CFrame): void { }
  public canUndo(): boolean {
    return this.canUndoVar;
  }
  public canRedo(): boolean {
    return this.canRedoVar;
  }
  public undo(): void {
    mockUndo();
  }
  public redo(): void {
    mockRedo();
  }
  public setCurrentShape(shape: IShape | null): void {
    mockSetCurrentShape(shape);
  }
  public getCurrentShape(): IShape | null {
    return null;
  }
  public getState(): IState {
    return new CState();
  }
  public setState(state: IState): void { }
  public getHistory(): IHistory {
    return new CHistory();
  }
  public setHistory(history: IHistory): void { }
  public registerObserver(o: IObserver): void { }
  public removeObserver(o: IObserver): void { }
  public notifyObservers(): void { }
}

describe("test CPresenter", () => {
  const windowAlert = window.alert;
  window.alert = () => {};

  beforeEach(() => {
    mockSetCurrentShape.mockClear();
    mockUndo.mockClear();
    mockRedo.mockClear();
  });

  afterAll(() => {
    window.alert = windowAlert;
  });

  test("getHistory should return history, that contains in this.m_model", () => {
    const model: IModel = new CModel();
    const presenter: CPresenter = new CPresenter(model);

    const history: IHistory = presenter.getHistory();

    expect(history).toBe(model.getHistory());
  });

  test("getState should return state, that contains in this.m_model", () => {
    const model: IModel = new CModel();
    const presenter: CPresenter = new CPresenter(model);

    const state: IState = presenter.getState();

    expect(state).toBe(model.getState());
  });

  test("getCurrentShape should return currentShape, that contains in this.m_model", () => {
    const model: IModel = new CModel();
    const presenter: CPresenter = new CPresenter(model);

    const currentShape: IShape | null = presenter.getCurrentShape();

    expect(currentShape).toBe(model.getCurrentShape());
  });

  test("setCurrentShape should invoke setCurrentShape of the model", () => {
    const model: IModel = new CMockModel();
    const presenter: CPresenter = new CPresenter(model);
    const frame: CFrame = new CFrame(20, 30, 40, 50);
    const ellipse: IShape = new CEllipse(frame, new CPoint(40, 55), 20, 25);

    presenter.setCurrentShape(ellipse);

    expect(mockSetCurrentShape).toBeCalledTimes(1);
    expect(mockSetCurrentShape.mock.calls[0][0]).toBe(ellipse);
  });

  test("undoLastCommand should invoke undo command of the model if there are some undoable commands in the history", () => {
    const model: IModel = new CMockModel();
    const presenter: CPresenter = new CPresenter(model);

    presenter.undoLastCommand();

    expect(mockUndo).toBeCalledTimes(1);
  });

  test("undoLastCommand should not execute undo method of the model", () => {
    const model: IModel = new CMockModel(false);
    const presenter: CPresenter = new CPresenter(model);

    presenter.undoLastCommand();

    expect(mockUndo).toBeCalledTimes(0);
  });

  test("redoLastCommand should invoke redo command of the model if there are some redoable commands in the history", () => {
    const model: IModel = new CMockModel();
    const presenter: CPresenter = new CPresenter(model);

    presenter.redoLastCommand();

    expect(mockRedo).toBeCalledTimes(1);
  });

  test("redoLastCommand should not execute redo method of the model", () => {
    const model: IModel = new CMockModel(true, false);
    const presenter: CPresenter = new CPresenter(model);

    presenter.redoLastCommand();

    expect(mockRedo).toBeCalledTimes(0);
  });

  test("addShape should add addCommand to history", () => {
    const model: IModel = new CModel();
    const presenter: CPresenter = new CPresenter(model);

    presenter.addShape(ShapeType.Rectangle);

    expect(model.getHistory().canUndo()).toBeTruthy();
    expect(model.getHistory().canRedo()).toBeFalsy();
    expect(model.getState().getShapes().length).toBe(1);
  });

  test("deleteShape should add deleteCommand to history", () => {
    const model: IModel = new CModel();
    const presenter: CPresenter = new CPresenter(model);
    presenter.addShape(ShapeType.Rectangle);
    const shape: IShape = presenter.getState().getShapes()[0];

    presenter.deleteShape(shape);

    expect(model.getHistory().canUndo()).toBeTruthy();
    expect(model.getHistory().canRedo()).toBeFalsy();
    expect(model.getState().getShapes().length).toBe(0);
  });

  test("deleteCurrentShape should add deleteCommand with right parameters to history and set current shape to null", () => {
    const model: IModel = new CModel();
    const presenter: CPresenter = new CPresenter(model);
    presenter.addShape(ShapeType.Rectangle);
    const shape: IShape = presenter.getState().getShapes()[0];
    presenter.setCurrentShape(shape);

    presenter.deleteCurrentShape();

    expect(model.getHistory().canUndo()).toBeTruthy();
    expect(model.getHistory().canRedo()).toBeFalsy();
    expect(model.getState().getShapes().length).toBe(0);
    expect(model.getCurrentShape()).toBeNull();
  });

  test("moveShape should move shape correctly", () => {
    const model: IModel = new CModel();
    const presenter: CPresenter = new CPresenter(model);
    presenter.addShape(ShapeType.Rectangle);
    const shape: IShape = presenter.getState().getShapes()[0];

    presenter.moveShape(shape, new CVector(3, 3));

    expect(model.getState().getShapes()[0].getFrame().x).toBe(303);
    expect(model.getState().getShapes()[0].getFrame().y).toBe(203);
  });
});