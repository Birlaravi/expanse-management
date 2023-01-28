import "./App.css";
import HomePage from "./page/js/HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./page/js/Register";
import Login from "./page/js/Login";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <HomePage />
          </ProtectedRoutes>
        }
      />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/user" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export function ProtectedRoutes(props) {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
