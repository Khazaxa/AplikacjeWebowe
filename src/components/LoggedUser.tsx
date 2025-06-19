import { useEffect, useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import LogoutBtn from "./Buttons/LogoutBtn";

export default function LoggedUser() {
  const [email, setEmail] = useState(localStorage.getItem("email") || "Guest");

  useEffect(() => {
    const handleStorageChange = () => {
      setEmail(localStorage.getItem("email") || "Guest");
    };

    window.addEventListener("login", handleStorageChange);

    return () => {
      window.removeEventListener("login", handleStorageChange);
    };
  }, []);

  return (
    <div className="h-16 relative bg-gray-200 dark:bg-gray-700 px-3 py-1 flex items-center">
      {email !== "Guest" && (
        <div className="absolute left-3 z-10">
          <LogoutBtn />
        </div>
      )}

      {email !== "Guest" && (
        <span className="w-full text-center text-lg font-semibold">
          {email}
        </span>
      )}

      <DarkModeToggle />
    </div>
  );
}
