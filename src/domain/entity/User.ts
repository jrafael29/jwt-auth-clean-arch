
export type UserInput = {
    id: number;
    name: string;
    phonenumber: string;
    password: string;
    created_at: Date;
}

export class User {
    private id: number;
    private name: string;
    private phonenumber: string;
    private password: string;
    private created_at: Date;

    constructor(data: UserInput) {
        this.id = data.id;
        this.name = data.name;
        this.phonenumber = data.phonenumber;
        this.password = data.password;
        this.created_at = data.created_at || new Date(); 
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getPassword(): string {
        return this.password;
    }

    public getPhone(): string {
        return this.phonenumber
    }

    public createdAt(): Date {
        return this.created_at
    }

}
