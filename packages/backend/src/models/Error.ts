import { ErrorMsg } from "./Interfaces";

export class CustomError extends Error {
  public response: ErrorMsg;

  constructor(error: { status: number, message: string }, detail: string = undefined, ...args: any[]) {
    super(...args);
    this.response = { status: error.status, message: error.message, detail: detail };
  }
}