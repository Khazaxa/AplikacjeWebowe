export default function EnumElement({
  value,
  enumType,
  className = "",
}: {
  value: string | number;
  enumType: Record<string, string>;
  className?: string;
}) {
  const displayValue = Object.entries(enumType).find(
    ([, v]) => v === value.toString()
  )?.[0];

  return (
    <span className={`enum-element ${className}`}>
      {displayValue || "Unknown"}
    </span>
  );
}
