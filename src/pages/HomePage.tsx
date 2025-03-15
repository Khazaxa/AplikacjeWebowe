import React, { useState, useEffect } from "react";
import ProjectService from "../services/ProjectService";
import ProjectList from "../components/ProjectList";
import ProjectForm from "../components/ProjectForm";
import { Project } from "../models/Project";

const HomePage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    setProjects(ProjectService.getAllProjects());
  }, []);

  const handleSave = () => {
    setProjects(ProjectService.getAllProjects());
    setEditingProject(null);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
  };

  const handleDelete = (id: string) => {
    ProjectService.deleteProject(id);
    setProjects(ProjectService.getAllProjects());
  };

  return (
    <div>
      <h1>Project Management</h1>
      <ProjectList
        projects={projects}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <h2>{editingProject ? "Edit Project" : "Add Project"}</h2>
      <ProjectForm project={editingProject || undefined} onSave={handleSave} />
    </div>
  );
};

export default HomePage;
