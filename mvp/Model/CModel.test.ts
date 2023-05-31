import { CModel } from "./CModel";
import { IModel } from "./IModel";
import { CFrame } from "../Frame/CFrame";
import { IShape } from "../Shape/IShape";
import { CPoint } from "../Point/CPoint";
import { CEllipse } from "../Shape/CEllipse";
import { IObserver } from "../Observer/IObserver";
import { ICommand } from "../Command/ICommand";
import { CAddShapeCommand } from "../Command/CAddShapeCommand";
import { IState } from "../State/IState";
import { CState } from "../State/CState";
import { IHistory } from "../History/IHistory";
import { CHistory } from "../History/CHistory";

const mockUpdate = jest.fn(() => {});

class CMockObserver implements IObserver {
    public update(): void {
        mockUpdate();
    }
}

describe("test CModel", () => {
    beforeEach(() => {
        mockUpdate.mockClear();
    });

    test("default currentShape should be null, state should be empty, history should be empty", () => {
        const model: IModel = new CModel();

        expect(model.getCurrentShape()).toBeNull();
        expect(model.getState().getShapes().length).toBe(0);
        expect(model.getHistory().canRedo()).toBeFalsy();
        expect(model.getHistory().canUndo()).toBeFalsy();
    });

    test("addShape should change state(add another shape to state.shapes) and should notify observers(mock observer with mock method)", () => {
        const model: IModel = new CModel();
        const observer: IObserver = new CMockObserver();
        model.registerObserver(observer);
        const frame: CFrame = new CFrame(20, 30, 40, 50);
        const ellipse: IShape = new CEllipse(frame, new CPoint(40, 55), 20, 25);

        model.addShape(ellipse);

        expect(model.getState().getShapes().length).toBe(1);
        expect(model.getState().getShapes()[0]).toBe(ellipse);
        expect(mockUpdate).toBeCalledTimes(1);
    });

    test("clearHistory should make history empty", () => {
        const model: IModel = new CModel();
        const frame: CFrame = new CFrame(20, 30, 40, 50);
        const ellipse: IShape = new CEllipse(frame, new CPoint(40, 55), 20, 25);
        const addShapeCommand: ICommand = new CAddShapeCommand(ellipse, model);
        model.getHistory().addAndExecuteCommand(addShapeCommand);

        model.clearHistory();

        expect(model.getHistory().canUndo()).toBeFalsy();
        expect(model.getHistory().canRedo()).toBeFalsy();
    });

    test("deleteShape should change state's state(delete shape from state.shapes) and should notify observers", () => {
        const model: IModel = new CModel();
        const observer: IObserver = new CMockObserver();
        model.registerObserver(observer);
        const frame: CFrame = new CFrame(20, 30, 40, 50);
        const ellipse: IShape = new CEllipse(frame, new CPoint(40, 55), 20, 25);
        model.addShape(ellipse);

        model.deleteShape(ellipse);

        expect(model.getState().getShapes().length).toBe(0);
        expect(mockUpdate).toBeCalledTimes(2);
    });

    test("deleteShape with shape, that does not exist in model, should not delete any shape and should not notify observers", () => {
        const model: IModel = new CModel();
        const observer: IObserver = new CMockObserver();
        model.registerObserver(observer);
        const frame: CFrame = new CFrame(20, 30, 40, 50);
        const ellipse0: IShape = new CEllipse(frame, new CPoint(40, 55), 20, 25);
        const ellipse1: IShape = new CEllipse(frame, new CPoint(40, 55), 20, 25);
        model.addShape(ellipse0);

        model.deleteShape(ellipse1);

        expect(model.getState().getShapes().length).toBe(1);
        expect(mockUpdate).toBeCalledTimes(1);
    });

    test("canUndo should return mockHistory.canUndo value and should not notify observers", () => {
        const model: IModel = new CModel();
        const observer: IObserver = new CMockObserver();
        model.registerObserver(observer);

        const canUndoValue: boolean = model.canUndo();

        expect(canUndoValue).toBe(model.getHistory().canUndo());
        expect(mockUpdate).toBeCalledTimes(0);
    });

    test("canRedo should return mockHistory.canRedo value and should not notify observers", () => {
        const model: IModel = new CModel();
        const observer: IObserver = new CMockObserver();
        model.registerObserver(observer);

        const canRedoValue: boolean = model.canRedo();

        expect(canRedoValue).toBe(model.getHistory().canRedo());
        expect(mockUpdate).toBeCalledTimes(0);
    });

    test("undo should invoke history.undo and should not notify observers", () => {
        const model: IModel = new CModel();
        const frame: CFrame = new CFrame(20, 30, 40, 50);
        const ellipse: IShape = new CEllipse(frame, new CPoint(40, 55), 20, 25);
        const addShapeCommand: ICommand = new CAddShapeCommand(ellipse, model);
        model.getHistory().addAndExecuteCommand(addShapeCommand);

        model.undo();

        expect(model.canUndo()).toBeFalsy();
        expect(model.canRedo()).toBeTruthy();
        expect(mockUpdate).toBeCalledTimes(0);
    });

    test("undo should invoke history.undo and should not notify observers", () => {
        const model: IModel = new CModel();
        const frame: CFrame = new CFrame(20, 30, 40, 50);
        const ellipse: IShape = new CEllipse(frame, new CPoint(40, 55), 20, 25);
        const addShapeCommand: ICommand = new CAddShapeCommand(ellipse, model);
        model.getHistory().addAndExecuteCommand(addShapeCommand);
        model.undo();

        model.redo();

        expect(model.canUndo()).toBeTruthy();
        expect(model.canRedo()).toBeFalsy();
        expect(mockUpdate).toBeCalledTimes(0);
    });

    test("setCurrentShape should change currentShape of the model and notify observers", () => {
        const model: IModel = new CModel();
        const observer: IObserver = new CMockObserver();
        model.registerObserver(observer);
        const frame: CFrame = new CFrame(20, 30, 40, 50);
        const ellipse: IShape = new CEllipse(frame, new CPoint(40, 55), 20, 25);

        model.setCurrentShape(ellipse);

        expect(model.getCurrentShape()).toBe(ellipse);
        expect(mockUpdate).toBeCalledTimes(1);
    });

    test("getCurrentShape should return currentShape of the model", () => {
        const model: IModel = new CModel();
        const frame: CFrame = new CFrame(20, 30, 40, 50);
        const ellipse: IShape = new CEllipse(frame, new CPoint(40, 55), 20, 25);
        model.setCurrentShape(ellipse);

        const currentShape: IShape | null = model.getCurrentShape();

        expect(currentShape).toBe(ellipse);
        expect(mockUpdate).toBeCalledTimes(0);
    });

    test("getState should return state of the model", () => {
        const model: IModel = new CModel();
        const frame: CFrame = new CFrame(20, 30, 40, 50);
        const ellipse: IShape = new CEllipse(frame, new CPoint(40, 55), 20, 25);
        model.addShape(ellipse);

        const state: IState = model.getState();

        expect(state.getShapes().length).toBe(1);
        expect(state.getShapes()[0]).toBe(ellipse);
        expect(mockUpdate).toBeCalledTimes(0);
    });

    test("setState should change state of the model and notify observers", () => {
        const model: IModel = new CModel();
        const observer: IObserver = new CMockObserver();
        model.registerObserver(observer);
        model.registerObserver(observer);
        const newState: IState = new CState();

        model.setState(newState);

        expect(model.getState()).toBe(newState);
        expect(mockUpdate).toBeCalledTimes(2);
    });

    test("getHistory should return history of the model", () => {
        const model: IModel = new CModel();

        const history: IHistory = model.getHistory();

        expect(history.canUndo()).toBeFalsy();
        expect(history.canRedo()).toBeFalsy();
        expect(mockUpdate).toBeCalledTimes(0);
    });

    test("setHistory should change history of the model and notify observers", () => {
        const model: IModel = new CModel();
        const observer: IObserver = new CMockObserver();
        model.registerObserver(observer);
        const history: IHistory = new CHistory();
        const frame: CFrame = new CFrame(20, 30, 40, 50);
        const ellipse: IShape = new CEllipse(frame, new CPoint(40, 55), 20, 25);
        const addShapeCommand: ICommand = new CAddShapeCommand(ellipse, model);
        history.addAndExecuteCommand(addShapeCommand);

        model.setHistory(history);

        expect(model.getHistory()).toBe(history);
        expect(mockUpdate).toBeCalledTimes(2);
    });

    test("registerObserver should add observer to this.m_observers", () => {
        const model: IModel = new CModel();
        const observer: IObserver = new CMockObserver();

        model.registerObserver(observer);

        model.notifyObservers();
        expect(mockUpdate).toBeCalledTimes(1);
    });

    test("removeObserver should remove observer from this.m_observers", () => {
        const model: IModel = new CModel();
        const observer: IObserver = new CMockObserver();
        model.registerObserver(observer);

        model.removeObserver(observer);

        model.notifyObservers();
        expect(mockUpdate).toBeCalledTimes(0);
    });

    test("removeObserver should not throw any error while removing unobserverer observer", () => {
        const model: IModel = new CModel();
        const observer: IObserver = new CMockObserver();

        model.removeObserver(observer);

        model.notifyObservers();
        expect(mockUpdate).toBeCalledTimes(0);
    });

    test("notifyObservers should invoke update method of all this.m_observers", () => {
        const model: IModel = new CModel();
        const observer1: IObserver = new CMockObserver();
        const observer2: IObserver = new CMockObserver();
        model.registerObserver(observer1);
        model.registerObserver(observer2);

        model.notifyObservers();

        expect(mockUpdate).toBeCalledTimes(2);
    });
});