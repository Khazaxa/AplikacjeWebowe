import React from "react";
import { useParams } from "react-router-dom";
import ProjectService from "../services/ProjectService";

const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = ProjectService.getProjectById(id!);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
    </div>
  );
};

export default ProjectPage;
