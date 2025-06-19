import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/ApiConfig";
import Notifications from "../components/Notifications";

export function Login({
  setIsLoginView,
}: {
  setIsLoginView: (isLoginView: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | "warning" | null
  >(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { accessToken, userId } = response.data;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", userId);
        navigate("/home");
      } else {
        showNotification("error", response.data.Message || "Login failed.");
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.Message
      ) {
        showNotification("error", error.response.data.Message);
      } else {
        showNotification("error", "Authentication failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 ring ring-gray-900/5">
        <Notifications messageType={messageType} message={message} />
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-6xl font-bold text-center text-gray-800 dark:text-white mb-4">
            Login
          </h1>

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          <label className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <input
              type="checkbox"
              checked={passwordVisible}
              onChange={() => setPasswordVisible(!passwordVisible)}
              className="accent-sky-500"
            />
            <span>Show password</span>
          </label>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => setIsLoginView(false)}
              className="text-sky-500 hover:underline"
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
