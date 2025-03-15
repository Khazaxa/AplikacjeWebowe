import React, { useState } from "react";
import { Project } from "../models/Project";
import ProjectService from "../services/ProjectService";

interface ProjectFormProps {
  project?: Project;
  onSave: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSave }) => {
  const [name, setName] = useState(project?.name || "");
  const [description, setDescription] = useState(project?.description || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      id: project?.id || Date.now().toString(),
      name,
      description,
    };

    if (project) {
      ProjectService.updateProject(newProject);
    } else {
      ProjectService.createProject(newProject);
    }

    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default ProjectForm;
