import { useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap.bundle.js";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "bootstrap-icons/font/bootstrap-icons.css";

import { Login } from "./Login/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route element={<ProtectedRoute />}>
          
        </Route> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
