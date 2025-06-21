import { useNavigate } from "react-router-dom";
import DelBtn from "./Buttons/DelBtn";
import DetailsBtn from "./Buttons/DetailsBtn";
import EditBtn from "./Buttons/EditBtn";

interface Item {
  id: number;
  name: string;
  description?: string;
  priority?: string | number;
  state?: string | number;
  projectId?: number;
}

interface ListProps {
  items: Item[];
  title?: string;
  itemType: "project" | "story" | "task";
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  "data-test"?: string;
}

function stateToString(state: string | number | undefined): string {
  switch (Number(state)) {
    case 1:
      return "To Do";
    case 2:
      return "In Progress";
    case 3:
      return "Done";
    default:
      return "Unknown";
  }
}

function sortItemsByState(items: Item[]): Item[] {
  return [...items].sort((a, b) => {
    const order = (item: Item) => {
      const s = Number(item.state);
      if (s === 3) return 2;
      if (s === 1 || s === 2) return 0;
      return 1;
    };
    return order(a) - order(b);
  });
}

export default function List({
  items,
  title,
  itemType,
  onEdit,
  onDelete,
  "data-test": dataTestId = "list",
}: ListProps) {
  const navigate = useNavigate();
  const sortedItems = sortItemsByState(items);

  const handleDetailsClick = (id: number) => {
    navigate(`/${itemType}/${id}`);
  };

  return (
    <div
      className="flex flex-col items-center justify-start p-4 space-y-2 w-full max-w-3xl mx-auto"
      data-testid={dataTestId}
      data-test={dataTestId}
    >
      {title && (
        <h2 className="text-2xl font-bold text-gray-200 mb-4">{title}</h2>
      )}

      <div className="flex flex-col items-center gap-6 w-full">
        {sortedItems.map(({ id, name, state }) => {
          const statusText = stateToString(state);
          const isDone = statusText === "Done";

          return (
            <div
              key={id}
              className={`text-gray-100 px-6 py-4 rounded shadow text-sm font-medium w-full max-w-md flex flex-col items-center ${
                isDone ? "bg-green-600" : "bg-gray-700"
              }`}
              data-testid={`list-item-${id}`}
            >
              <span className="text-center mb-1 w-full">{name}</span>
              <span className="text-center mb-3 w-full italic text-sm">
                {state !== undefined ? `Status: ${statusText}` : ""}
              </span>

              <div className="flex gap-3 mt-2.5">
                <DetailsBtn onClick={() => handleDetailsClick(id)} />
                {onEdit && (
                  <EditBtn data-test="edit-btn" onClick={() => onEdit(id)} />
                )}
                {onDelete && <DelBtn onClick={() => onDelete(id)} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
