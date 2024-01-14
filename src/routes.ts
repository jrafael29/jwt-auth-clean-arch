import { Router, Request, Response, NextFunction } from "express";
import { LoginController } from "./infra/controller/auth/LoginController";
import { RegisterController } from "./infra/controller/auth/RegisterController";
import { authMiddleware } from "./infra/middleware/AuthMiddleware";
import { asyncStorage } from "./infra/storage/AsyncStorage";
import { successResponse } from "./application/response";

const router = Router();

router.get("/", (req: Request, res: Response): Response => {
  return successResponse(res, { msg: "hellooo!!" }, 200);
});

// public routes.
router.post("/register", RegisterController.handle);
router.post("/login", LoginController.handle);

// middleware auth.
router.use(authMiddleware);

// private routes
router.get("/pvt", (req: Request, res: Response): Response => {
  const resultStorage = asyncStorage.getStore();
  return successResponse(res, {
    msg: "rota privada acessada com successo:",
    data: resultStorage}, 200);
});

export { router as routes };
