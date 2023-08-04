import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import Counter from "./pages/Calculator";
import Registration from "./pages/Registration";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/register/" element={<Registration/>}></Route>
      <Route path="/login/" element={<div>Login</div>} />
      <Route path="/counter/" element={<Counter />}></Route>
    </Routes>
  );
}

export default App;
