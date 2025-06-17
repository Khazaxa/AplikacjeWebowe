import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import StoryDetails from "./components/StoryDetails";
import { Register } from "./components/Register";
import { Login } from "./components/Login";

function App() {
  const [register, setRegister] = useState(true);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            register ? (
              <Login setRegister={setRegister} />
            ) : (
              <Register setRegister={setRegister} />
            )
          }
        />
        <Route path="/home" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/story/:id" element={<StoryDetails />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
