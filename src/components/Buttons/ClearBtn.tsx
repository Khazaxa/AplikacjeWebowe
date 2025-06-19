type ClearBtnProps = {
  onClear: () => void;
  disabled: boolean;
};

export default function ClearBtn({ onClear, disabled }: ClearBtnProps) {
  return (
    <button
      type="button"
      onClick={onClear}
      disabled={disabled}
      className={`px-4 py-2 rounded text-white transition
        bg-red-600
        hover:bg-red-700
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      title="Clear"
    >
      Clear
    </button>
  );
}
