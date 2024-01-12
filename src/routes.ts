import { Router, Request, Response, NextFunction } from "express";
import { LoginController } from "./infra/controller/auth/LoginController";
import { RegisterController } from "./infra/controller/auth/RegisterController";
import { authMiddleware } from "./infra/middleware/AuthMiddleware";
import { asyncStorage } from "./infra/storage/AsyncStorage";

const router = Router();


router.post("/login", LoginController.handle);
router.post("/register", RegisterController.handle);

// middleware auth.
router.use(authMiddleware);

router.get("/", (req: Request, res: Response): Response => {
  const resultStorage = asyncStorage.getStore();
  console.log("resultStorage:", resultStorage)

  return res.json({ msg: "heheh" }).end();
});

export { router as routes };
