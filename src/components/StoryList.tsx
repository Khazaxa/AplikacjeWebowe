import React from "react";
import { useNavigate } from "react-router-dom";
import { Story } from "../models/Story";
import styles from "./StoryList.module.css";

interface StoryListProps {
  stories: Story[];
  onEdit: (story: Story) => void;
  onDelete: (id: string) => void;
}

const StoryList: React.FC<StoryListProps> = ({ stories, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleViewDetails = (projectId: string, storyId: string) => {
    navigate(`/project/${projectId}/story/${storyId}`);
  };

  return (
    <div className={styles["story-list"]}>
      {stories.map((story) => (
        <div key={story.id} className={styles["story-item"]}>
          <h3>{story.name}</h3>
          <p>{story.description}</p>
          <button onClick={() => handleViewDetails(story.project, story.id)}>
            View Details
          </button>
          <button onClick={() => onEdit(story)}>Edit</button>
          <button onClick={() => onDelete(story.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default StoryList;
