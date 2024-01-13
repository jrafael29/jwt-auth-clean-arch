
import crypto, { scrypt } from 'node:crypto'
import { promisify } from 'node:util';


export class PasswordService {
    static async hashPassword(password: string) {
        const salt = crypto.randomBytes(16).toString("hex");
        const scryptAsync = promisify(scrypt);
        const buf = (await scryptAsync(password, salt, 64)) as Buffer;
        return `${buf.toString("hex")}.${salt}`;
      }
    
      static async comparePassword(
        storedPassword: string,
        suppliedPassword: string
      ): Promise<boolean> {
        // split() returns array
        const scryptAsync = promisify(scrypt);

        const [hashedPassword, salt] = storedPassword.split(".");
        // we need to pass buffer values to timingSafeEqual
        const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
        // we hash the new sign-in password
        const suppliedPasswordBuf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
        // compare the new supplied password with the stored hashed password
        return crypto.timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
      }
}
