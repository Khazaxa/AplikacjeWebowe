import { Project } from "../models/Project";

class ProjectService {
  private static readonly STORAGE_KEY = "projects";

  static getAllProjects(): Project[] {
    const projects = localStorage.getItem(this.STORAGE_KEY);
    return projects ? JSON.parse(projects) : [];
  }

  static getProjectById(id: string): Project | undefined {
    const projects = this.getAllProjects();
    return projects.find((project) => project.id === id);
  }

  static createProject(project: Project): void {
    const projects = this.getAllProjects();
    projects.push(project);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
  }

  static updateProject(updatedProject: Project): void {
    let projects = this.getAllProjects();
    projects = projects.map((project) =>
      project.id === updatedProject.id ? updatedProject : project
    );
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
  }

  static deleteProject(id: string): void {
    let projects = this.getAllProjects();
    projects = projects.filter((project) => project.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
  }
}

export default ProjectService;
