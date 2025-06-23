// src/pages/Login.jsx
import { useState } from 'react';
import pb from '../pb';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const login = async () => {
    try {
      await pb.collection('users').authWithPassword(email, password);
      window.location.href = '/chat';
    } catch (err) {
      alert('Xatolik: ' + err.message);
    }
  };

  const signup = async () => {
    try {
        await pb.collection('users').create({
            email,
            password,
            passwordConfirm: password,
            username,
          });
      await login();
    } catch (err) {
        const msg = err?.response?.data?.username?.message || err.message;
        alert('Ro‘yxatdan o‘tishda xatolik: ' + msg);
      }
      
  };

  return (
    <div className="p-4 max-w-sm mx-auto mt-20">
      <h1 className="text-xl font-bold mb-4">Telegram Klon</h1>
      <input className="w-full mb-2 p-2 border" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input
  className="w-full mb-2 p-2 border"
  type="text"
  placeholder="Username"
  onChange={e => setUsername(e.target.value)}
/>

      <input className="w-full mb-2 p-2 border" type="password" placeholder="Parol" onChange={e => setPassword(e.target.value)} />
      <button className="w-full bg-blue-500 text-white py-2 mb-2" onClick={login}>Kirish</button>
      <button className="w-full bg-gray-500 text-white py-2" onClick={signup}>Ro‘yxatdan o‘tish</button>
    </div>
  );
}
