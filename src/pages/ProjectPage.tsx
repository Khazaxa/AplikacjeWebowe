import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Story } from "../models/Story";
import { StoryService } from "../services/StoryService";
import styles from "./ProjectPage.module.css";
import StoryList from "../components/StoryList";
import StoryForm from "../components/StoryForm";

const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [stories, setStories] = useState<Story[]>([]);
  const [editingStory, setEditingStory] = useState<Story | null>(null);

  useEffect(() => {
    if (id) {
      const projectStories = StoryService.getAll().filter(
        (story) => story.project === id
      );
      setStories(projectStories);
    }
  }, [id]);

  const handleSave = () => {
    if (id) {
      const projectStories = StoryService.getAll().filter(
        (story) => story.project === id
      );
      setStories(projectStories);
      setEditingStory(null);
    }
  };

  const handleEdit = (story: Story) => {
    setEditingStory(story);
  };

  const handleDelete = (storyId: string) => {
    StoryService.delete(storyId);
    if (id) {
      const projectStories = StoryService.getAll().filter(
        (story) => story.project === id
      );
      setStories(projectStories);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Project Details</h1>
        <p>Details about the selected project.</p>
      </div>
      <div className={styles.details}>
        <h2>Project ID: {id}</h2>
        <p>Here you can manage stories for this project.</p>
      </div>
      <div className={styles.actions}>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
      <h1>Story Management</h1>
      <div className={styles["story-list"]}>
        <StoryList
          stories={stories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      <h2>{editingStory ? "Edit Story" : "Add Story"}</h2>
      <div className={styles["story-form"]}>
        <StoryForm
          story={editingStory || undefined}
          projectId={id || ""}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default ProjectPage;
