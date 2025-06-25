// === 1. src/App.jsx ===
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Chat from './pages/Chat';
import pb from './pb';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
export default function App() {
  const [user, setUser] = useState(pb.authStore.model);

  useEffect(() => {
    pb.authStore.onChange((token, model) => {
      setUser(model);
    });
  }, []);

  return (
    <>
    <Routes>
      <Route path="/" element={user ? <Navigate to="/chat" replace /> : <Login />} />
      <Route path="/chat" element={user ? <Chat /> : <Navigate to="/" replace />} />
    </Routes>
    <Toaster position="top-right" /></>
  );
}
