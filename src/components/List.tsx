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
}

export default function List({ items, title }: ListProps) {
  return (
    <div className="flex flex-col items-center justify-start p-4 space-y-2 w-full max-w-3xl mx-auto">
      {title && (
        <h2 className="text-2xl font-bold text-gray-200 mb-4">{title}</h2>
      )}

      <div className="flex flex-col items-center gap-3 w-full">
        {items.map(({ id, name }) => (
          <div
            key={id}
            className="bg-gray-700 text-gray-100 px-6 py-3 rounded shadow cursor-pointer text-sm font-medium w-full max-w-md text-center"
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}
