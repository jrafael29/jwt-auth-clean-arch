import { Request, Response, NextFunction } from "express";
import { JwtService } from "../../application/services/auth/JwtService";

import { asyncStorage } from "../storage/AsyncStorage";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ msg: "unauthorized" }).end();

  // verificar se o token é valido
  const result: any = JwtService.verify(authorization);

  if (result.user) {
    asyncStorage.enterWith({ ...result });
    return next();
  }

  return res.status(421).json({ msg: "invalid token" }).end();
};
