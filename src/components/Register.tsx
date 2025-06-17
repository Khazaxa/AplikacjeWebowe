import { useState } from "react";
import api from "../config/ApiConfig";
import Notifications from "../components/Notifications";

export function Register({
  setRegister,
}: {
  setRegister: (register: boolean) => void;
}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | "warning" | null
  >(null);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const showNotification = (type: typeof messageType, msg: string) => {
    setMessageType(type);
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
      setMessageType(null);
    }, 3000);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailRegex.test(email)) {
      showNotification("error", "Invalid email address");
    } else if (!passwordRegex.test(password)) {
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
          name,
          age,
          password,
          confirmPassword: password2,
        });

        if (response.status === 200) {
          showNotification(
            "success",
            "Registration successful. You can log in now."
          );
          setTimeout(() => setRegister(true), 1000);
        } else {
          showNotification("error", "Registration failed. Please try again.");
        }
      } catch (error) {
        showNotification("error", "Server error. Please try again later.");
      }
    }
  };

  return (
    <div>
      <Notifications messageType={messageType} message={message} />
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={() => setRegister(true)}>
          ⨉
        </button>
        <h1>Register</h1>

        <input
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          id="age"
          placeholder="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          id="password2"
          placeholder="Password again"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        <p>
          Masz już konto?{" "}
          <button type="button" onClick={() => setRegister(true)}>
            Zaloguj się
          </button>
        </p>
      </form>
    </div>
  );
}
