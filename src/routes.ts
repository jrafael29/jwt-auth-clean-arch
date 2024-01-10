import { RegisterPayload } from "./application/types/RegisterPayload";
import { Router, Request, Response, NextFunction } from "express";
import { RegisterUseCase } from "./application/useCase/auth/RegisterUseCase";
import { InMemoryUserRepository } from "./infra/repository/user/InMemoryUserRepository";
const router = Router();

const userRepository = new InMemoryUserRepository();

router.get("/login", (req: Request, res: Response) => {});

router.post("/register", async (req: Request, res: Response) => {
  const requestBody: RegisterPayload = req.body;
  console.log("requestBody: ", requestBody);

  if (
    !requestBody.name ||
    !requestBody.phonenumber ||
    !requestBody.password ||
    !requestBody.repeatPassword
  ) {
    return res
      .status(400)
      .json({ success: false, message: "invalid parameters" })
      .end();
  }

  try {
    const registerUseCase = new RegisterUseCase(userRepository);
    const result = await registerUseCase.execute({
      ...requestBody,
    });

    return res.json({ success: true, data: result }).end();
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message }).end();
  }
});

router.use((req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({ msg: "unauthorized" }).end();
  console.log("authorization", authorization);
  next();
});

router.get("/", (req: Request, res: Response): Response => {
  return res.json({ msg: "heheh" }).end();
});

export { router as routes };
