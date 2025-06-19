import { useEffect, useState } from "react";
import ExpandableForm from "./ExpandableForm";
import List from "./List";
import api from "../config/ApiConfig";

interface Project {
  id: number;
  name: string;
  description: string;
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    api
      .get("/projects")
      .then((res) => setProjects(res.data))
      .catch((e) => setError(e.message || "Failed to load projects"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <ExpandableForm />

      <div
        className={`relative min-h-screen flex flex-col items-center justify-start bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-6 px-6 transition-all duration-500 ease-in-out`}
      >
        <div
          className={`bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-70 rounded-lg p-8 max-w-3xl shadow-lg text-center overflow-hidden transition-all duration-500 ease-in-out`}
        >
          <h1 className="text-4xl font-bold mb-4">ManageMe</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Choose your project
          </p>

          {loading && <p>Loading projects...</p>}
          {error && <p className="text-red-600 dark:text-red-400">{error}</p>}

          {!loading && !error && <List items={projects} title="Projects" />}
        </div>
      </div>
    </>
  );
}
