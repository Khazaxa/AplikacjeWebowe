import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/ApiConfig";
import Notifications from "../components/Notifications";

export function Login({
  setRegister,
}: {
  setRegister: (register: boolean) => void;
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
    <div>
      <Notifications messageType={messageType} message={message} />
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>
          <input
            type="checkbox"
            checked={passwordVisible}
            onChange={() => setPasswordVisible(!passwordVisible)}
          />
          Show password
        </label>

        <button type="submit">Login</button>

        <p>
          Don't have an account?{" "}
          <button type="button" onClick={() => setRegister(false)}>
            Register
          </button>
        </p>
      </form>
    </div>
  );
}
