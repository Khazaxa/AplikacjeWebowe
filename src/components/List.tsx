import { useNavigate } from "react-router-dom";
import DelBtn from "./Buttons/DelBtn";
import DetailsBtn from "./Buttons/DetailsBtn";
import EditBtn from "./Buttons/EditBtn";

interface Item {
  id: number;
  name: string;
  description?: string;
  priority?: number;
  state?: number;
}

interface ListProps {
  items: Item[];
  title?: string;
  itemType: "project" | "story" | "task";
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function List({
  items,
  title,
  itemType,
  onEdit,
  onDelete,
}: ListProps) {
  const navigate = useNavigate();

  const handleDetailsClick = (id: number) => {
    navigate(`/${itemType}/${id}`);
  };

  return (
    <div className="flex flex-col items-center justify-start p-4 space-y-2 w-full max-w-3xl mx-auto">
      {title && (
        <h2 className="text-2xl font-bold text-gray-200 mb-4">{title}</h2>
      )}

      <div className="flex flex-col items-center gap-6 w-full">
        {items.map(({ id, name }) => (
          <div
            key={id}
            className="bg-gray-700 text-gray-100 px-6 py-4 rounded shadow cursor-pointer text-sm font-medium w-full max-w-md flex flex-col items-center"
          >
            <span className="text-center mb-3 w-full">{name}</span>

            <div className="flex gap-3 mt-2.5">
              <DetailsBtn onClick={() => handleDetailsClick(id)} />
              <EditBtn onClick={() => onEdit && onEdit(id)} />
              <DelBtn onClick={() => onDelete && onDelete(id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
