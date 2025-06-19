import { useState } from "react";
import api from "../config/ApiConfig";
import Notifications from "./Notifications";
import Form from "./Form";
import AddBtn from "./Buttons/AddBtn";
import ClearBtn from "./Buttons/ClearBtn";
import { Field } from "../models/IField";

interface RegisterData {
  name: string;
  surname: string;
  age: number;
  email: string;
  password: string;
  password2: string;
  description: string;
  role: number;
}

const fields: Field[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
    required: true,
  },
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Name",
    required: true,
  },
  {
    name: "surname",
    label: "Surname",
    type: "text",
    placeholder: "Surname",
    required: true,
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    placeholder: "Age",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Password",
    required: true,
  },
  {
    name: "password2",
    label: "Confirm Password",
    type: "password",
    placeholder: "Repeat password",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Description",
    required: true,
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    required: true,
    options: [
      { label: "Admin", value: 1 },
      { label: "Devops", value: 2 },
      { label: "Dev", value: 3 },
    ],
  },
];

export function Register({
  setIsLoginView,
}: {
  setIsLoginView: (isLoginView: boolean) => void;
}) {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | "warning" | null
  >(null);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const showNotification = (
    type: "success" | "error" | "warning",
    msg: string
  ) => {
    setMessageType(type);
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
      setMessageType(null);
    }, 3000);
  };

  const handleSubmit = async (data: RegisterData) => {
    const { email, password, password2 } = data;

    if (!emailRegex.test(email)) {
      showNotification("error", "Invalid email address");
    } else if (!passwordRegex.test(password)) {
      showNotification(
        "error",
        "Password must be at least 6 characters and include uppercase, lowercase, number, and special character."
      );
    } else if (password !== password2) {
      showNotification("error", "Passwords do not match");
    } else {
      try {
        const { password2, ...rest } = data;
        const postData = {
          ...rest,
          role: Number(data.role),
        };
        const response = await api.post("/auth/register", postData);

        if (response.status === 200) {
          showNotification("success", "Registration successful.");
          setTimeout(() => setIsLoginView(true), 1000);
        } else {
          showNotification("error", "Registration failed. Please try again.");
        }
      } catch (error: any) {
        const msg =
          error?.response?.data?.Message ||
          "Registration failed. Please try again.";
        showNotification("error", msg);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setIsLoginView(true)}
            className="text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white text-xl font-bold"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
          Register
        </h1>

        <Form<RegisterData>
          fields={fields}
          onSubmit={handleSubmit}
          onClear={() => {}}
        >
          {(disabled: boolean) => (
            <div className="flex justify-center gap-4 mt-4">
              <AddBtn disabled={disabled} />
              <ClearBtn onClear={() => {}} disabled={disabled} />
            </div>
          )}
        </Form>

        <Notifications messageType={messageType} message={message} />
      </div>
    </div>
  );
}
