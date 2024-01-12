import { Request, Response, NextFunction } from "express";
import { LoginPayload } from "../../../application/types/LoginPayload";
import { LoginUseCase } from "../../../application/useCase/auth/LoginUseCase";
import inMemoryUserRepository from "../../repository/user/InMemoryUserRepository";


export class LoginController {

    static async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const requestBody: LoginPayload = req.body;
        console.log("requestBody: ", requestBody);
      
        if (!requestBody.credential || !requestBody.password) {
          return res
            .status(400)
            .json({ success: false, message: "invalid parameters" })
            .end();
        }
      
        try {
          const loginUseCase = new LoginUseCase(inMemoryUserRepository);
          const result = await loginUseCase.execute(requestBody);
      
          return res.json({ success: true, token: result }).end();
        } catch (err: any) {
          return res.status(500).json({ success: false, message: err.message }).end();
        }
      }

}