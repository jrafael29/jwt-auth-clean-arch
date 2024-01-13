import { Request, Response, NextFunction } from "express";
import { LoginPayload } from "../../../application/types/LoginPayload";
import { LoginUseCase } from "../../../application/useCase/auth/LoginUseCase";
import { successResponse, errorResponse } from "../../../application/response";
import { responses } from "../../../application/response/HttpErrorResponses";
import inMemoryUserRepository from "../../repository/user/InMemoryUserRepository";

export class LoginController {
  static async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const requestBody: LoginPayload = req.body;

    if (!requestBody.credential || !requestBody.password)
      return errorResponse(
        res,
        responses.INVALID_FIELDS.message,
        responses.INVALID_FIELDS.statusCode
      );

    try {
      const loginUseCase = new LoginUseCase(inMemoryUserRepository);
      const result = await loginUseCase.execute(requestBody);

      return successResponse(res, { token: result }, 200);
    } catch (err: any) {
      return errorResponse(
        res,
        responses.INTERNAL_SERVER_ERROR.message,
        responses.INTERNAL_SERVER_ERROR.statusCode
      );
    }
  }
}
