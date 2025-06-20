type AddBtnProps = {
  disabled: boolean;
};

export default function AddBtn({ disabled }: AddBtnProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`px-4 py-2 bg-blue-600 text-white rounded transition
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}
      `}
    >
      Add
    </button>
  );
}
