import Repository from "./UserRepository";
// import { RegisterData } from "../../types/RegisterData";

export default class MysqlUserRepository implements Repository {

    private tableName = 'users';

    async get(): Promise<any> {
        const query = `
            SELECT * FROM ${this.tableName};
        `
    }
    async getByEmail(email: number): Promise<any> {
        const query = `
            SELECT * FROM ${this.tableName} WHERE email = ${email};
        `
    }
    async getById(id: number): Promise<any> {
        const query = `
            SELECT * FROM ${this.tableName} WHERE id = ${id};
        `
    }
    async getByPhone(phone: number): Promise<any> {
        const query = `
            SELECT * FROM ${this.tableName} WHERE phone = ${phone}
        `
    }

    async create(userData: any): Promise<any> {
        
    }
}
