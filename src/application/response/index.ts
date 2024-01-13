import { Response } from "express";

export const successResponse = (
  response: Response,
  data: object,
  status: number = 200
) => {
  return response
    .status(status)
    .json({
      success: true,
      data: data,
    })
    .end();
};

export const errorResponse = (
  response: Response,
  message: string,
  status: number = 500
) => {
  return response
    .status(status)
    .json({
      success: false,
      error: {
        message: message,
        statusCode: status,
      },
    })
    .end();
};
