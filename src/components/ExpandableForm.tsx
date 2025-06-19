import { useEffect, useState } from "react";
import expandForm from "../assets/expand.svg";
import Form from "./Form";
import { projectFields } from "../models/ProjectParams";
import { registerFields } from "../models/RegisterParams";
import { storyFields } from "../models/StoryParams";
import { taskFields } from "../models/TaskParams";
import { Field } from "../models/IField";

export type FormType = "project" | "user" | "story" | "task";

const fieldsMap: Record<FormType, Field[]> = {
  project: projectFields,
  user: registerFields,
  story: storyFields,
  task: taskFields,
};

interface ExpandableFormProps<T extends FormType> {
  formType: T;
  onSubmit?: (data: any) => void;
  onCollapse?: () => void;
  initialData?: Record<string, any>;
}

export default function ExpandableForm<T extends FormType>({
  formType,
  onSubmit,
  onCollapse,
  initialData,
}: ExpandableFormProps<T>) {
  const [expanded, setExpanded] = useState(false);
  const fields = fieldsMap[formType];

  const toggleExpand = () => {
    setExpanded((prev) => {
      const next = !prev;
      if (!next) {
        onCollapse?.();
      }
      return next;
    });
  };

  const handleSubmit = (data: any) => {
    onSubmit?.(data);
    setExpanded(false);
  };

  useEffect(() => {
    if (initialData) setExpanded(true);
  }, [initialData]);

  return (
    <div
      className={`relative bg-gray-200 dark:bg-gray-900 px-3 py-1 flex flex-col items-center
    transition-all duration-500 ease-in-out overflow-auto shadow-lg
    ${expanded ? "py-6" : "h-16 py-1"}`}
    >
      <img
        src={expandForm}
        alt="Expand form"
        onClick={toggleExpand}
        className="absolute top-3 right-3 w-8 h-8 cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300"
        title={expanded ? "Collapse form" : "Expand form"}
      />

      <div className="flex-grow flex flex-col items-center justify-center w-full max-w-md">
        {!expanded && (
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Click the icon to add {formType}
          </h2>
        )}
        {expanded && (
          <>
            {initialData && (
              <h2 className="text-lg font-medium text-blue-500 mb-2">Edit</h2>
            )}
            <Form
              fields={fields}
              onSubmit={handleSubmit}
              initialData={initialData}
            />
          </>
        )}
      </div>
    </div>
  );
}
