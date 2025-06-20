import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExpandableForm from "../ExpandableForm";
import { StoryService } from "../../service/StoryService";
import Notifications from "../Notifications";
import List from "../List";
import { ProjectService } from "../../service/ProjectService";
import { Project } from "../Pages/Home";
import ReturnBtn from "../Buttons/ReturnBtn";

export interface Story {
  id: number;
  name: string;
  description: string;
  priority: number;
  projectId: number;
  state: number;
}

export default function ProjectDetails() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loadingStories, setLoadingStories] = useState(false);
  const [errorStories, setErrorStories] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [editingStory, setEditingStory] = useState<Story | null>(null);

  const { id: projectId } = useParams<{ id: string }>();

  const [project, setProject] = useState<Project | null>(null);
  const [loadingProject, setLoadingProject] = useState(false);
  const [projectError, setProjectError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;

    fetchProject();
    fetchStories();
  }, [projectId]);

  useEffect(() => {
    if (errorStories) {
      const timer = setTimeout(() => setErrorStories(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorStories]);

  useEffect(() => {
    if (submitError) {
      const timer = setTimeout(() => setSubmitError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [submitError]);

  useEffect(() => {
    if (projectError) {
      const timer = setTimeout(() => setProjectError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [projectError]);

  async function fetchStories() {
    if (!projectId) return;

    setLoadingStories(true);
    setErrorStories(null);

    try {
      const res = await StoryService.getByProjectId(projectId);
      setStories(res.data);
    } catch {
      setErrorStories("Failed to load stories.");
    } finally {
      setLoadingStories(false);
    }
  }

  async function fetchProject() {
    if (!projectId) return;

    setLoadingProject(true);
    setProjectError(null);

    try {
      const res = await ProjectService.getById(projectId);
      setProject(res.data);
    } catch {
      setProjectError("Failed to load project details.");
    } finally {
      setLoadingProject(false);
    }
  }

  const handleAddStory = async (data: Omit<Story, "id" | "projectId">) => {
    setSubmitError(null);

    try {
      if (!projectId) throw new Error("Missing projectId in URL");

      await StoryService.create({
        ...data,
        projectId: Number(projectId),
      });
      await fetchStories();
    } catch {
      setSubmitError("Failed to add story.");
    }
  };

  const handleEditSubmit = async (data: Omit<Story, "id">) => {
    if (!editingStory) return;

    try {
      await StoryService.update(editingStory.id.toString(), data);
      await fetchStories();
      setEditingStory(null);
    } catch {
      setSubmitError("Failed to update story.");
    }
  };

  const handleFormSubmit = async (data: Omit<Story, "id" | "projectId">) => {
    const transformedData = convertPriorityStateToNumber(data);

    if (editingStory) {
      await handleEditSubmit(transformedData as Omit<Story, "id">);
    } else {
      await handleAddStory(transformedData);
    }
  };

  const handleDeleteStory = async (id: number) => {
    try {
      await StoryService.delete(id.toString());
      await fetchStories();
    } catch {
      setErrorStories("Failed to delete story.");
    }
  };

  function convertPriorityStateToNumber(data: Omit<Story, "id" | "projectId">) {
    return {
      ...data,
      priority: Number(data.priority),
      state: Number(data.state),
    };
  }

  return (
    <>
      <ExpandableForm
        formType="story"
        onSubmit={handleFormSubmit}
        onCollapse={() => setEditingStory(null)}
        initialData={editingStory ?? undefined}
      />

      <div className="relative min-h-screen flex flex-col items-center justify-start bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-6 px-6 transition-all duration-500 ease-in-out">
        <ReturnBtn />
        <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-80 rounded-lg p-6 max-w-3xl shadow-md mb-6 text-left text-gray-900 dark:text-gray-100">
          {projectError && <p className="text-red-500">{projectError}</p>}

          {loadingProject && <p>Loading project details...</p>}

          {project && !loadingProject && (
            <>
              <p className="text-2xl font-bold text-indigo-600 text-center">
                {project.name}
              </p>
              <p className="text-base mt-2 text-gray-700 dark:text-gray-300 text-center">
                {project.description}
              </p>
            </>
          )}
        </div>

        {errorStories && (
          <Notifications messageType="error" message={errorStories} />
        )}
        {submitError && (
          <Notifications messageType="error" message={submitError} />
        )}

        {loadingStories && (
          <p className="text-gray-700 dark:text-gray-300">Loading stories...</p>
        )}

        {!loadingStories && !errorStories && (
          <List
            itemType="story"
            items={stories}
            title="Stories"
            onEdit={(id) => {
              const storyToEdit = stories.find((p) => p.id === id);
              if (storyToEdit) setEditingStory(storyToEdit);
            }}
            onDelete={handleDeleteStory}
          />
        )}
      </div>
    </>
  );
}
