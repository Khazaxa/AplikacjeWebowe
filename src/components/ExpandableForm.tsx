import { useState } from "react";
import expandForm from "../assets/expand.svg";
import ClearBtn from "./Buttons/ClearBtn";
import AddBtn from "./Buttons/AddBtn";

export default function ExpandableForm() {
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const toggleExpand = () => setExpanded((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setExpanded(false);
    setFormData({ name: "", email: "" });
  };

  const resetForm = () => {
    setFormData({ name: "", email: "" });
  };

  const isAddBtnEnabled =
    formData.name.trim() !== "" && formData.email.trim() !== "";

  const isClearBtnEnabled =
    formData.name.trim() !== "" || formData.email.trim() !== "";

  return (
    <div
      className={`
        relative bg-gray-200 dark:bg-gray-900 px-3 py-1 flex flex-col items-center
        transition-all duration-500 ease-in-out overflow-hidden shadow-lg
        ${expanded ? "h-[400px] py-6" : "h-16 py-1"}
      `}
    >
      <img
        src={expandForm}
        alt="Expand form"
        onClick={toggleExpand}
        className="absolute top-3 right-3 w-8 h-8 cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300 pointer-events-auto"
        title={expanded ? "Collapse form" : "Expand form"}
      />

      <div className="flex-grow flex flex-col items-center justify-center w-full max-w-md">
        {!expanded && (
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Click the icon to expand form
          </h2>
        )}

        {expanded && (
          <form onSubmit={handleSubmit} className="w-full text-left">
            <label className="block mb-2 font-semibold">Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
              placeholder="Your name"
            />
            <label className="block mb-2 font-semibold">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
              placeholder="Your email"
            />
            <div className="flex justify-center gap-4">
              <AddBtn disabled={!isAddBtnEnabled} />
              <ClearBtn onClear={resetForm} disabled={!isClearBtnEnabled} />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
