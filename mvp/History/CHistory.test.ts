import { CMoveShapeCommand } from "../Command/CMoveShapeCommand";
import { ICommand } from "../Command/ICommand";
import { CFrame } from "../Frame/CFrame";
import { CPoint } from "../Point/CPoint";
import { CEllipse } from "../Shape/CEllipse";
import { IShape } from "../Shape/IShape";
import { CVector } from "../Vector/CVector";
import { CHistory } from "./CHistory";
import { CModel } from "../Model/CModel";

describe("test history", () => {
  test("History with 1 command. can undo -> true, can redo -> false", () => {
    const history: CHistory = new CHistory();
    const ellipse: IShape = new CEllipse(
      new CFrame(0, 0, 30, 30),
      new CPoint(20, 20),
      30,
      30
    );
    const delta: CVector = new CVector(1, 1);
    const moveShapeCommand: ICommand = new CMoveShapeCommand(
      new CModel(),
      ellipse,
      delta
    );

    history.addAndExecuteCommand(moveShapeCommand);

    expect(history.canUndo()).toBeTruthy();
    expect(history.canRedo()).toBeFalsy();
  });

  test("Empty history. can undo -> false, can redo -> false", () => {
    const history: CHistory = new CHistory();

    expect(history.canUndo()).toBeFalsy();
    expect(history.canRedo()).toBeFalsy();
  });

  test("History with 1 undone command. can undo -> false, can redo -> true", () => {
    const history: CHistory = new CHistory();
    const ellipse: IShape = new CEllipse(
      new CFrame(0, 0, 30, 30),
      new CPoint(20, 20),
      30,
      30
    );
    const delta: CVector = new CVector(1, 1);
    const moveShapeCommand: ICommand = new CMoveShapeCommand(
      new CModel(),
      ellipse,
      delta
    );

    history.addAndExecuteCommand(moveShapeCommand);
    history.undo();

    expect(history.canUndo()).toBeFalsy();
    expect(history.canRedo()).toBeTruthy();
  });

  test("History with 1 undone and redone command. can undo -> true, can redo -> false", () => {
    const history: CHistory = new CHistory();
    const ellipse: IShape = new CEllipse(
      new CFrame(0, 0, 30, 30),
      new CPoint(20, 20),
      30,
      30
    );
    const delta: CVector = new CVector(1, 1);
    const moveShapeCommand: ICommand = new CMoveShapeCommand(
      new CModel(),
      ellipse,
      delta
    );

    history.addAndExecuteCommand(moveShapeCommand);
    history.undo();
    history.redo();

    expect(history.canUndo()).toBeTruthy();
    expect(history.canRedo()).toBeFalsy();
  });

  test("History: 1 command + undone command + 1 command. can undo -> true, can redo -> false", () => {
    const history: CHistory = new CHistory();
    const ellipse: IShape = new CEllipse(
      new CFrame(0, 0, 30, 30),
      new CPoint(20, 20),
      30,
      30
    );
    const delta: CVector = new CVector(1, 1);
    const moveShapeCommand: ICommand = new CMoveShapeCommand(
      new CModel(),
      ellipse,
      delta
    );

    history.addAndExecuteCommand(moveShapeCommand);
    history.undo();
    history.addAndExecuteCommand(moveShapeCommand);

    expect(history.canUndo()).toBeTruthy();
    expect(history.canRedo()).toBeFalsy();
  });
});
