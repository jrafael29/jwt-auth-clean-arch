import { RegisterPayload } from "../../../application/types/RegisterPayload";
import { User } from "../../entity/User";


export interface Register {
    execute(data: RegisterPayload): Promise<User | undefined>
}