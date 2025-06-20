export default function DetailsBtn({
  onClick,
  disabled = false,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className={`px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-md transition duration-200 ease-in-out disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2`}
      onClick={onClick}
      disabled={disabled}
    >
      Details
    </button>
  );
}
