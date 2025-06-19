import { useEffect, useState } from "react";
import ExpandableForm from "./ExpandableForm";
import List from "./List";
import Notifications from "./Notifications";
import { ProjectService } from "../service/ProjectService";

interface Project {
  id: number;
  name: string;
  description: string;
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const fetchProjects = () => {
    setLoading(true);
    setError(null);

    ProjectService.getAll()
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load projects.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (submitError) {
      const timer = setTimeout(() => setSubmitError(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [submitError]);

  const handleAddProject = async (data: Omit<Project, "id">) => {
    setSubmitError(null);

    try {
      await ProjectService.create(data);
      fetchProjects();
    } catch (err) {
      console.error(err);
      setSubmitError("Failed to add project.");
    }
  };

  const handleEditSubmit = async (data: Omit<Project, "id">) => {
    if (!editingProject) return;

    try {
      await ProjectService.update(editingProject.id.toString(), data);
      fetchProjects();
      setEditingProject(null);
    } catch (err) {
      console.error(err);
      setSubmitError("Failed to update project.");
    }
  };
  const handleFormSubmit = async (data: Omit<Project, "id">) => {
    if (editingProject) {
      await handleEditSubmit(data);
    } else {
      await handleAddProject(data);
    }
  };
  return (
    <>
      <ExpandableForm
        formType="project"
        onSubmit={handleFormSubmit}
        onCollapse={() => setEditingProject(null)}
        initialData={editingProject ?? undefined}
      />

      <div className="relative min-h-screen flex flex-col items-center justify-start bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-6 px-6 transition-all duration-500 ease-in-out">
        <div className="bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-70 rounded-lg p-8 max-w-3xl shadow-lg text-center overflow-hidden transition-all duration-500 ease-in-out">
          <h1 className="text-4xl font-bold mb-4">ManageMe</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Choose your project
          </p>

          {loading && <p>Loading projects...</p>}

          {error && <Notifications messageType="error" message={error} />}
          {submitError && (
            <Notifications messageType="error" message={submitError} />
          )}

          {!loading && !error && (
            <List
              itemType="project"
              items={projects}
              title="Projects"
              onEdit={(id) => {
                const projectToEdit = projects.find((p) => p.id === id);
                if (projectToEdit) {
                  setEditingProject(projectToEdit);
                }
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
