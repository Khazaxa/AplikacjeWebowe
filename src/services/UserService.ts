import { User } from "../models/User";

const STORAGE_KEY = "users";

export class UserService {
  static getAll(): User[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  static getById(id: string): User | undefined {
    const users = this.getAll();
    return users.find((user) => user.id === id);
  }

  static add(user: User): void {
    const users = this.getAll();
    users.push(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }

  static update(id: string, updatedUser: Partial<User>): void {
    const users = this.getAll();
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedUser };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }
  }

  static delete(id: string): void {
    const users = this.getAll();
    const filteredUsers = users.filter((user) => user.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredUsers));
  }
}
