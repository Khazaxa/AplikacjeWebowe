import { Story } from "../models/Story";
import ApiClient from "../api/ApiClient";

const api = new ApiClient("myapp");

export class StoryService {
  static getAll = async (): Promise<Story[]> => {
    return api.get<Story[]>("stories");
  };

  static getById = async (id: string): Promise<Story | undefined> => {
    const all = await api.get<Story[]>("stories");
    return all.find((s) => s.id === id);
  };

  static add = async (story: Story): Promise<Story> => {
    return api.post<Story>("stories", story);
  };

  static update = async (
    id: string,
    updatedStory: Partial<Story>
  ): Promise<Story> => {
    const all = await api.get<Story[]>("stories");
    const story = all.find((s) => s.id === id);
    if (!story) throw new Error("Story not found");

    const updated = { ...story, ...updatedStory };
    return api.put<Story>("stories", id, updated);
  };

  static delete = async (id: string): Promise<void> => {
    return api.delete<void>("stories", id);
  };
}
