import { useState } from "react";
import api from "../config/ApiConfig";
import Notifications from "./Notifications";

export function Register({
  setRegister,
}: {
  setRegister: (register: boolean) => void;
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
          setRegister(true);
        } else {
          showNotification("error", "Registration failed. Please try again.");
          setRegister(false);
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
        setRegister(false);
      }
    }
  };

  return (
    <div>
      <Notifications messageType={messageType} message={message} />
      <form onSubmit={handleSubmit}>
        <button onClick={() => setRegister(true)}>X</button>
        <h1>Register</h1>

        <input
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          id="name"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          id="surname"
          placeholder="Surname"
          onChange={(e) => setSurname(e.target.value)}
          required
        />
        <input
          id="age"
          type="number"
          placeholder="Age"
          onChange={(e) => setAge(Number(e.target.value))}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          id="password2"
          placeholder="Password again"
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        <input
          id="description"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select
          id="role"
          onChange={(e) => setRole(Number(e.target.value))}
          required
        >
          <option value={3}>Dev</option>
          <option value={1}>Admin</option>
          <option value={2}>Devops</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
