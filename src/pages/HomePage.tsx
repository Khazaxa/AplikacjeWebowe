import React, { useState, useEffect } from "react";
import ProjectService from "../services/ProjectService";
import ProjectList from "../components/ProjectList";
import ProjectForm from "../components/ProjectForm";
import { Project } from "../models/Project";
import styles from "./HomePage.module.css";

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
    <div className={styles.container}>
      <h1>Project Management</h1>
      <div className={styles["project-list"]}>
        <ProjectList
          projects={projects}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      <h2>{editingProject ? "Edit Project" : "Add Project"}</h2>
      <div className={styles["project-form"]}>
        <ProjectForm
          project={editingProject || undefined}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default HomePage;
