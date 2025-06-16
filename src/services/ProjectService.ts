import { Project } from "../models/Project";
import ApiClient from "../api/ApiClient";

const api = new ApiClient("myapp");

class ProjectService {
  static getAllProjects = async (): Promise<Project[]> => {
    return api.get<Project[]>("projects");
  };

  static getProjectById = async (id: string): Promise<Project | undefined> => {
    const all = await api.get<Project[]>("projects");
    return all.find((p) => p.id === id);
  };

  static createProject = async (project: Project): Promise<Project> => {
    return api.post<Project>("projects", project);
  };

  static updateProject = async (project: Project): Promise<Project> => {
    return api.put<Project>("projects", project.id, project);
  };

  static deleteProject = async (id: string): Promise<void> => {
    return api.delete<void>("projects", id);
  };
}

export default ProjectService;
