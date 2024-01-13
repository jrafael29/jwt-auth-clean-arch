import { UserRepository } from "../../../domain/repository/UserRepository";

import { User } from "../../../domain/entity/User";

// singleton instance

export default new (class InMemoryUserRepository implements UserRepository {
  private userList: User[] = [];
  private id: number = 1;

  async create(userData: {
    name: string;
    phonenumber: string;
    password: string;
  }): Promise<User | undefined> {
    const newUser: User = {
      id: this.id++,
      ...userData,
      created_at: new Date(),
    };
    this.userList.push(newUser);
    return newUser;
  }

  async getByPhone(value: string): Promise<User | undefined> {
    const user = this.userList.find((user) => user.phonenumber === value);
    return user;
  }
})();
