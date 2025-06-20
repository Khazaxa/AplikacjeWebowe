import { useDarkMode } from "../context/DarkModeContext";
import lightMode from "../assets/sun.svg";
import darkMode from "../assets/moon.svg";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      className="absolute top-4 right-4"
    >
      <img
        src={isDarkMode ? darkMode : lightMode}
        alt="Toggle Dark Mode"
        className="w-8 h-8 object-contain transition duration-300"
      />
    </button>
  );
}
