import React, { useState, useEffect } from "react";
import ProjectService from "../services/ProjectService";
import ProjectList from "../components/ProjectList";
import ProjectForm from "../components/ProjectForm";
import { Project } from "../models/Project";
import { User } from "../models/User";
import { UserService } from "../services/UserService";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    setProjects(ProjectService.getAllProjects());

    const storedUserId = localStorage.getItem("loggedUser");
    const user = storedUserId ? UserService.getById(storedUserId) : null;
    setLoggedUser(user || null);

    setAllUsers(UserService.getAll());
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

  const handleUserChange = (userId: string) => {
    const user = UserService.getById(userId);
    if (user) {
      localStorage.setItem("loggedUser", userId);
      setLoggedUser(user);
    }
  };

  return (
    <div className={styles.container}>
      <div id="loggedUser">
        <h4>
          Logged User:{" "}
          {loggedUser ? `${loggedUser.name} ${loggedUser.surname}` : "None"}
        </h4>
        <select
          onChange={(e) => handleUserChange(e.target.value)}
          value={loggedUser?.id || ""}
        >
          <option value="" disabled>
            Select User
          </option>
          {allUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} {user.surname} ({user.role})
            </option>
          ))}
        </select>
      </div>
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
