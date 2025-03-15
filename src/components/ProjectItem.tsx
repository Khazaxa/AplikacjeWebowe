import React from "react";
import { Project } from "../models/Project";

interface ProjectItemProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  project,
  onEdit,
  onDelete,
}) => {
  return (
    <div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <button onClick={() => onEdit(project)}>Edit</button>
      <button onClick={() => onDelete(project.id)}>Delete</button>
    </div>
  );
};

export default ProjectItem;
