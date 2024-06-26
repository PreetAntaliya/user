import React, { useState, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import AdminView from './pages/AdminView';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Home from './pages/Home';
import Register from './pages/Register';

function App() {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      let local = JSON.parse(localStorage.getItem('auth'));
      let token = local?.token;
      try {
        let response = await fetch(
          "http://localhost:8000/api/verifyUser",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let data = await response.json();
        if (data.success) {
          setRole(data.data.payload.role);
        } else {
          setRole("");
        }
      } catch (err) {
        console.error("Token validation error:", err);
        setRole("");
      } finally {
        setLoading(false);
      }
    }
    validateToken();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/" element={<Home />} /> */}

        {/* admin route */}
        {/* <Route path="/" element={role === 'admin' && 'user' ? <Home /> : <Navigate to="/login" />} /> */}
        <Route path="/" element={(role === 'admin' || role === 'user') ? <Home /> : <Navigate to="/login" />} />
        <Route path="/admin" element={role === 'admin' ? <AdminView /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
