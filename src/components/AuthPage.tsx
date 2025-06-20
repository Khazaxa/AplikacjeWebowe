import { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";

export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);

  return isLoginView ? (
    <Login setIsLoginView={setIsLoginView} />
  ) : (
    <Register setIsLoginView={setIsLoginView} />
  );
}
