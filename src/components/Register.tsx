import { useState } from "react";
import api from "../config/ApiConfig";
import Notifications from "./Notifications";

export function Register({
  setIsLoginView,
}: {
  setIsLoginView: (isLoginView: boolean) => void;
}) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState(3);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | "warning" | null
  >(null);

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

  const validatePassword = (password: string) => {
    return passwordRegex.test(password);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailRegex.test(email)) {
      showNotification("error", "Invalid email address");
    } else if (!validatePassword(password)) {
      showNotification(
        "error",
        "Password must contain at least 6 characters, including uppercase, lowercase, number and special character"
      );
    } else if (password !== password2) {
      showNotification("error", "Passwords do not match");
    } else {
      try {
        const response = await api.post("/auth/register", {
          email,
          password,
          name,
          surname,
          age,
          description,
          role,
        });

        if (response.status === 200) {
          showNotification("success", "Registration successful.");
          setIsLoginView(true);
        } else {
          showNotification("error", "Registration failed. Please try again.");
          setIsLoginView(false);
        }
      } catch (error: any) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.Message
        ) {
          showNotification("error", error.response.data.Message);
        } else {
          showNotification("error", "Registration failed. Please try again.");
        }
        setIsLoginView(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <Notifications messageType={messageType} message={message} />
        <form onSubmit={handleSubmit} className="space-y-5">
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

          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400
              dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400
              dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            id="surname"
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400
              dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            id="age"
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400
              dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400
              dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="password"
            id="password2"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400
              dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <textarea
            id="description"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400
              dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
          />
          <select
            id="role"
            onChange={(e) => setRole(Number(e.target.value))}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400
              dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value={3}>Dev</option>
            <option value={1}>Admin</option>
            <option value={2}>Devops</option>
          </select>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
