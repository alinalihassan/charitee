import { HttpException, HttpStatus } from "@nestjs/common";
import { JSendErrorObject, JSendErrorObjectwithData, JSendFailureObject, JSendFailureObjectwithData, JSendSuccessObject } from "../interfaces/response.interface";


export const success = <T extends object | null>(
  data?: T, message?: string
): JSendSuccessObject<T> => {
  return {
    status: "success",
    message,
    data,
  };
};

export const fail = <T extends object>(
  message: string | { message: string; data?: T }, code?: HttpStatus
): JSendFailureObject | JSendFailureObjectwithData<T> => {
  throw new HttpException({
    status: "fail",
    message: typeof message === "string" ? message : message.message,
    ...(typeof message !== "string" && { data: message.data }),
  }, code ? code : HttpStatus.BAD_REQUEST);
};

export const error = <T extends object>(
  message: string | { message: string; data?: T }, code?: HttpStatus
): JSendErrorObject | JSendErrorObjectwithData<T> => {
  throw new HttpException({
    status: "error",
    message: typeof message === "string" ? message : message.message,
    ...(typeof message !== "string" && { data: message.data }),
  }, code ? code : HttpStatus.INTERNAL_SERVER_ERROR);
};