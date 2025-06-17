import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login } from "./components/Login";
import { Register } from "./components/Register";

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
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
