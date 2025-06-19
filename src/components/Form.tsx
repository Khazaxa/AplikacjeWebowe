import React, { useState } from "react";
import { Field } from "../models/IField";

interface FormProps<T> {
  fields: Field[];
  initialData?: Partial<T>;
  onSubmit: (data: T) => void;
  onClear?: () => void;
}

export default function Form<T>({
  fields,
  initialData = {} as Partial<T>,
  onSubmit,
  onClear,
}: FormProps<T>) {
  const [formData, setFormData] = useState<Partial<T>>(initialData);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    let newValue: any = value;

    if (type === "number") newValue = Number(value);
    else if (type === "date") newValue = new Date(value);

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = fields.every((field) => {
      const val = formData[field.name as keyof T];
      return (
        !field.required || (val !== undefined && String(val).trim() !== "")
      );
    });

    if (!isValid) {
      alert("Please fill in all required fields.");
      return;
    }

    onSubmit(formData as T);
  };

  const isFormEmpty = fields.every(
    (field) =>
      !formData[field.name as keyof T] ||
      String(formData[field.name as keyof T]).trim() === ""
  );

  const getFieldValue = (name: string, type: string): string => {
    const value = formData[name as keyof T];
    if (value === undefined || value === null) return "";
    if (type === "date" && value instanceof Date)
      return value.toISOString().split("T")[0];
    return String(value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full text-left">
      {fields.map(({ name, label, type, placeholder, required, options }) => (
        <div key={name} className="mb-4">
          <label htmlFor={name} className="block mb-2 font-semibold">
            {label} {required && <span className="text-red-500">*</span>}
          </label>

          {type === "select" && options ? (
            <select
              id={name}
              name={name}
              value={getFieldValue(name, type)}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
              required={required}
            >
              <option value="">-- select --</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : type === "textarea" ? (
            <textarea
              id={name}
              name={name}
              placeholder={placeholder}
              value={getFieldValue(name, type)}
              onChange={handleChange}
              required={required}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
            />
          ) : (
            <input
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              value={getFieldValue(name, type)}
              onChange={handleChange}
              required={required}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
            />
          )}
        </div>
      ))}

      <div className="flex justify-center gap-4">
        <button
          type="submit"
          disabled={isFormEmpty}
          className={`px-4 py-2 bg-blue-600 text-white rounded transition
            ${
              isFormEmpty
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
        >
          Add
        </button>

        {onClear && (
          <button
            type="button"
            onClick={() => {
              setFormData({});
              onClear();
            }}
            disabled={isFormEmpty}
            className={`px-4 py-2 bg-red-600 text-white rounded transition 
              ${
                isFormEmpty
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-red-700"
              }`}
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
}
