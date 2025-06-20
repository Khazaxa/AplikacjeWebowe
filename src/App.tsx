import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Pages/Home";
import AuthPage from "./components/AuthPage";
import LoggedUser from "./components/LoggedUser";
import ProjectDetails from "./components/Details/ProjectDetails";
import StoryDetails from "./components/Details/StoryDetails";
import TaskDetails from "./components/Details/TaskDetails";

function App() {
  return (
    <>
      <LoggedUser />
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/projects" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/story/:id" element={<StoryDetails />} />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
