import { Story } from "../models/Story";

const STORAGE_KEY = "stories";

export class StoryService {
  static getAll(): Story[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  static getById(id: string): Story | undefined {
    const stories = this.getAll();
    return stories.find((story) => story.id === id);
  }

  static add(story: Story): void {
    const stories = this.getAll();
    stories.push(story);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
  }

  static update(id: string, updatedStory: Partial<Story>): void {
    const stories = this.getAll();
    const index = stories.findIndex((story) => story.id === id);
    if (index !== -1) {
      stories[index] = { ...stories[index], ...updatedStory };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
    }
  }

  static delete(id: string): void {
    const stories = this.getAll();
    const filteredStories = stories.filter((story) => story.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredStories));
  }
}
