import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Story } from "../models/Story";
import styles from "./StoryBoard.module.css";

interface StoryBoardProps {
  stories: Story[];
  onEdit: (story: Story) => void;
  onDelete: (id: string) => void;
  onStatusChange: (updatedStory: Story) => void;
}

const columns = ["TODO", "IN PROGRESS", "DONE"] as const;
type ColumnType = (typeof columns)[number];

const StoryBoard: React.FC<StoryBoardProps> = ({
  stories,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const grouped: Record<ColumnType, Story[]> = {
    TODO: [],
    "IN PROGRESS": [],
    DONE: [],
  };

  stories.forEach((story) => {
    const status = (story.state?.toUpperCase() || "TODO") as ColumnType;
    if (columns.includes(status)) {
      grouped[status].push(story);
    } else {
      grouped.TODO.push(story);
    }
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    const draggedStory = stories.find((s) => s.id === draggableId);
    if (draggedStory) {
      const newState = destination.droppableId as
        | "to-do"
        | "in-progress"
        | "done";
      const updatedStory = { ...draggedStory, state: newState };
      onStatusChange(updatedStory);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.board}>
        {columns.map((column) => (
          <Droppable droppableId={column} key={column}>
            {(provided) => (
              <div
                className={styles.column}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2>{column}</h2>
                {grouped[column].map((story, index) => (
                  <Draggable
                    draggableId={story.id}
                    index={index}
                    key={story.id}
                  >
                    {(provided) => (
                      <div
                        className={styles.card}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <h3>{story.name}</h3>
                        <p>{story.description}</p>
                        <button onClick={() => onEdit(story)}>Edit</button>
                        <button onClick={() => onDelete(story.id)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default StoryBoard;
