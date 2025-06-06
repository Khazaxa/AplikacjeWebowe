import React, { useState } from "react";
import { Story } from "../models/Story";
import { StoryService } from "../services/StoryService";
import styles from "./StoryForm.module.css";

interface StoryFormProps {
  story?: Story;
  projectId: string;
  onSave: () => void;
}

const StoryForm: React.FC<StoryFormProps> = ({ story, projectId, onSave }) => {
  const [name, setName] = useState(story?.name || "");
  const [description, setDescription] = useState(story?.description || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStory: Story = {
      id: story?.id || Date.now().toString(),
      name,
      description,
      priority: "medium",
      project: projectId,
      creationDate: new Date(),
      state: "to-do",
      owner: "1",
    };

    if (story) {
      StoryService.update(story.id, newStory);
    } else {
      StoryService.add(newStory);
    }

    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className={styles["story-form"]}>
      <div>
        <label className={styles.label}>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div>
        <label className={styles.label}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className={styles.textarea}
        />
      </div>
      <button type="submit" className={styles.button}>
        Save
      </button>
    </form>
  );
};

export default StoryForm;
