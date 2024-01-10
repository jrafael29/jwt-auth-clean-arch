import { Connection } from "mysql2";
import UserRepository from "../../../domain/repository/UserRepository";
// import { RegisterData } from "../../types/RegisterData";
import { connection } from "../../db/mysql2";

export default class MysqlUserRepository implements UserRepository {

    private tableName = 'users';
    private conn: Connection
    constructor(){
        this.conn = connection;
    }

    // async get(): Promise<any> {
    //     const query = `
    //         SELECT * FROM ${this.tableName};
    //     `
    //     const resultQuery = await this.conn.promise().query(query)
    //     console.log("resultQuery", resultQuery);
    // }

    // async getByEmail(email: number): Promise<any> {
    //     const query = `
    //         SELECT * FROM ${this.tableName} WHERE email = ${email};
    //     `
    // }
    // async getById(id: number): Promise<any> {
    //     const query = `
    //         SELECT * FROM ${this.tableName} WHERE id = ${id};
    //     `
    // }
    // async getByPhone(phone: number): Promise<any> {
    //     const query = `
    //         SELECT * FROM ${this.tableName} WHERE phone = ${phone}
    //     `
    // }
    async create(userData: any): Promise<any> {
        
    }
}
