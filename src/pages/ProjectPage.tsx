import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Story } from "../models/Story";
import { StoryService } from "../services/StoryService";
import styles from "./ProjectPage.module.css";
import StoryForm from "../components/StoryForm";
import StoryBoard from "../components/StoryBoard";

const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [stories, setStories] = useState<Story[]>([]);
  const [editingStory, setEditingStory] = useState<Story | null>(null);

  const fetchStories = async () => {
    if (id) {
      const allStories = await StoryService.getAll();
      const projectStories = allStories.filter((story) => story.project === id);
      setStories(projectStories);
    }
  };

  useEffect(() => {
    fetchStories();
  }, [id]);

  const handleSave = async () => {
    await fetchStories();
    setEditingStory(null);
  };

  const handleEdit = (story: Story) => {
    setEditingStory(story);
  };

  const handleDelete = async (storyId: string) => {
    await StoryService.delete(storyId);
    await fetchStories();
  };

  const handleStatusChange = async (updatedStory: Story) => {
    await StoryService.update(updatedStory.id, { state: updatedStory.state });
    await fetchStories();
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleViewDetails = (storyId: string) => {
    navigate(`/story/${storyId}`);
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
        <StoryBoard
          stories={stories}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          onViewDetails={handleViewDetails}
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
