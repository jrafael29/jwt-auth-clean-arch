import { Request, Response, NextFunction } from "express";
import { RegisterPayload } from "../../../application/types/RegisterPayload";
import { RegisterUseCase } from "../../../application/useCase/auth/RegisterUseCase";
import { responses } from "../../../application/response/HttpErrorResponses";
import { errorResponse, successResponse } from "../../../application/response";
import inMemoryUserRepository from "../../repository/user/InMemoryUserRepository";

export class RegisterController {
  static async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const requestBody: RegisterPayload = req.body;

    if (
      !requestBody.name ||
      !requestBody.phonenumber ||
      !requestBody.password ||
      !requestBody.repeatPassword
    ) {
      return errorResponse(
        res,
        responses.INVALID_FIELDS.message,
        responses.INVALID_FIELDS.statusCode
      );
    }

    try {
      const registerUseCase = new RegisterUseCase(inMemoryUserRepository);
      const result = await registerUseCase.execute({
        ...requestBody,
      });

      return successResponse(res, {...result}, 201)
    } catch (err: any) {
      return errorResponse(
        res,
        responses.INTERNAL_SERVER_ERROR.message,
        responses.INTERNAL_SERVER_ERROR.statusCode
      )
    }
  }
}
