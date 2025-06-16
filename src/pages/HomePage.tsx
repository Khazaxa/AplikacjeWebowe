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
  const [loggedUser, setLoggedUser] = useState<User | null | undefined>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      const projectsData = await ProjectService.getAllProjects();
      setProjects(projectsData);

      const storedUserId = localStorage.getItem("loggedUser");
      let user: User | null | undefined = null;
      if (storedUserId) {
        user = await UserService.getById(storedUserId);
      }
      setLoggedUser(user);

      const usersData = await UserService.getAll();
      setAllUsers(usersData);
    }

    fetchData();
  }, []);

  const handleSave = async () => {
    const projectsData = await ProjectService.getAllProjects();
    setProjects(projectsData);
    setEditingProject(null);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
  };

  const handleDelete = async (id: string) => {
    await ProjectService.deleteProject(id);
    const projectsData = await ProjectService.getAllProjects();
    setProjects(projectsData);
  };

  const handleUserChange = async (userId: string) => {
    const user = await UserService.getById(userId);
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
