import {
  DndContext,
  closestCenter,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { Task } from "./Details/StoryDetails";

interface KanbanBoardProps {
  tasks: Task[];
  onStatusChange: (taskId: number, newState: number) => void;
}

const columns = [
  { id: 0, title: "To Do" },
  { id: 1, title: "In Progress" },
  { id: 2, title: "Done" },
];

function DroppableColumn({
  columnId,
  title,
  children,
}: {
  columnId: number;
  title: string;
  children: React.ReactNode;
}) {
  const { setNodeRef } = useDroppable({ id: columnId.toString() });

  const columnColors: Record<number, string> = {
    0: "bg-indigo-50 dark:bg-indigo-900",
    1: "bg-yellow-50 dark:bg-yellow-900",
    2: "bg-green-50 dark:bg-green-900",
  };

  return (
    <div
      ref={setNodeRef}
      className={`w-full md:w-1/3 p-2 rounded shadow-sm ${columnColors[columnId]}`}
    >
      <h2 className="text-center font-semibold mb-2">{title}</h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function DraggableTask({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id.toString(),
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }}
      className="p-2 bg-white dark:bg-gray-800 rounded shadow cursor-grab"
    >
      <p className="font-medium">{task.name}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {task.description}
      </p>
    </div>
  );
}

export default function KanbanBoard({
  tasks,
  onStatusChange,
}: KanbanBoardProps) {
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = parseInt(active.id);
    const newState = parseInt(over.id);

    const task = tasks.find((t) => t.id === taskId);
    if (task && task.state !== newState) {
      onStatusChange(taskId, newState);
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
    >
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        {columns.map((col) => (
          <DroppableColumn key={col.id} columnId={col.id} title={col.title}>
            {tasks
              .filter((task) => task.state === col.id)
              .map((task) => (
                <DraggableTask key={task.id} task={task} />
              ))}
          </DroppableColumn>
        ))}
      </div>
    </DndContext>
  );
}
