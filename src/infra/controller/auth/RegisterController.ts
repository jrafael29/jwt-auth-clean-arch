import { Request, Response, NextFunction } from "express";
import inMemoryUserRepository from "../../repository/user/InMemoryUserRepository";
import { RegisterPayload } from "../../../application/types/RegisterPayload";
import { RegisterUseCase } from "../../../application/useCase/auth/RegisterUseCase";



export class RegisterController {

    static async handle(req: Request, res: Response, next: NextFunction): Promise<Response>{
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
          const registerUseCase = new RegisterUseCase(inMemoryUserRepository);
          const result = await registerUseCase.execute({
            ...requestBody,
          });
      
          return res.json({ success: true, data: result }).end();
        } catch (err: any) {
          return res.status(500).json({ success: false, message: err.message }).end();
        }
      }
}