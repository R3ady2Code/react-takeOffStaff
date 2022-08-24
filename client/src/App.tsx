import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Users from './pages/Users';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="login" />} />
      <Route path="/users" element={<Users />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
