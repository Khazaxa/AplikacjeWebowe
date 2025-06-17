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

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | "warning" | null
  >(null);
  const notificationDelay = () => {
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
      setMessage("Invalid email address");
      setMessageType("error");
      notificationDelay();
    } else if (validatePassword(password) === false) {
      setMessage(
        "Password must contain at least 6 characters, including uppercase, lowercase, number and special character"
      );
      setMessageType("error");
      notificationDelay();
    } else if (password !== password2) {
      setMessage("Passwords do not match");
      setMessageType("error");
      notificationDelay();
    } else {
      try {
        const response = await api.post("/auth/register", {
          email: email,
          name: name,
          surname: surname,
          age: age,
          password: password,
          confirmPassword: password2,
          description: description,
        });

        if (response.status === 200) {
          setRegister(true);
          setMessage("Registration succesfull.");
          setMessageType("success");
          notificationDelay();
        } else {
          setMessage("Registration failed. Please try again.");
          setMessageType("error");
          notificationDelay();
          setRegister(false);
        }
      } catch {
        setMessage("Registration failed. Please try again.");
        setMessageType("error");
        notificationDelay();
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
          placeholder="surname"
          onChange={(e) => setSurname(e.target.value)}
          required
        />
        <input
          id="age"
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
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
