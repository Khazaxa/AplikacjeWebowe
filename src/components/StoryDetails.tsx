import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Task } from "../models/Task";
import { TaskService } from "../services/TaskService";

const StoryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!id) return;
      const allTasks = await TaskService.getAll();
      setTasks(allTasks.filter((task) => task.storyId === id));
    };
    fetchTasks();
  }, [id]);

  if (!id) return <div>Story ID not provided</div>;

  return (
    <div>
      <h1>Details for Story: {id}</h1>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <ul>
        {tasks.length === 0 ? (
          <li>No tasks for this story</li>
        ) : (
          tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.name}</strong> - {task.description} (Status:{" "}
              {task.state})
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default StoryDetails;
