

export default interface UserRepository {
    getById(id: number): Promise<any>;
    getByEmail(email: number): Promise<any>;
    getByPhone(phone: number): Promise<any>;
    get(): Promise<any>;
    create(userData: any): Promise<any>
}