import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import SinglePost from "./pages/SinglePost";

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
      <Route path="/post/:postId/"
      element={
        <ProtectedRoute>
          <SinglePost/>
        </ProtectedRoute>
      }
      />
      <Route path="/register/" element={<Registration/>}></Route>
      <Route path="/login/" element={<Login/>}></Route>
    </Routes>
  );
}

export default App;
