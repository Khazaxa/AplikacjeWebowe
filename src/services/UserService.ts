import { User } from "../models/User";
import ApiClient from "../api/ApiClient";

const api = new ApiClient("myapp");

export class UserService {
  static getAll = async (): Promise<User[]> => {
    return api.get<User[]>("users");
  };

  static getById = async (id: string): Promise<User | undefined> => {
    const all = await api.get<User[]>("users");
    return all.find((u) => u.id === id);
  };

  static add = async (user: User): Promise<User> => {
    return api.post<User>("users", user);
  };

  static update = async (
    id: string,
    updatedUser: Partial<User>
  ): Promise<User> => {
    const all = await api.get<User[]>("users");
    const user = all.find((u) => u.id === id);
    if (!user) throw new Error("User not found");

    const updated = { ...user, ...updatedUser };
    return api.put<User>("users", id, updated);
  };

  static delete = async (id: string): Promise<void> => {
    return api.delete<void>("users", id);
  };
}
