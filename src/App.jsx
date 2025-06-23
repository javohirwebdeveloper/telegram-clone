import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Chat from './pages/Chat';
import pb from './pb';

export default function App() {
  const user = pb.authStore.model;

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? "/chat" : "/login"} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login" />} />
    </Routes>
  );
}
