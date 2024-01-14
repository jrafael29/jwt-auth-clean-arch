import { Request, Response, NextFunction } from "express";
import { JwtService } from "../../application/services/auth/JwtService";

import { asyncStorage } from "../storage/AsyncStorage";
import { errorResponse } from "../../application/response";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  
  if (!authorization) return errorResponse(res, 'unauthorized', 401);

  // verificar se o token é valido
  const result: any = JwtService.verify(authorization);

  if (result.user) {
    asyncStorage.enterWith({ ...result });
    return next();
  }
  
  return errorResponse(res, 'invalid token', 401);
};
