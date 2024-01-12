import { LoginPayload } from "../../../application/types/LoginPayload";


export interface Login {
    execute(data: LoginPayload): Promise<string | undefined>
}