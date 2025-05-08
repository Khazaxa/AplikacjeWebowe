import React from "react";
import { Project } from "../models/Project";
import styles from "./ProjectList.module.css";

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={styles["project-list"]}>
      {projects.map((project) => (
        <div key={project.id} className={styles["project-item"]}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <button onClick={() => onEdit(project)}>Edit</button>
          <button onClick={() => onDelete(project.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
