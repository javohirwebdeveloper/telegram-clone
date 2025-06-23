
// src/components/Sidebar.jsx
import { useEffect, useState } from 'react';
import pb from '../pb';

export default function Sidebar({ onSelect, selectedUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await pb.collection('users').getFullList({ sort: '-created' });
      const filtered = result.filter(u => u.id !== pb.authStore.model.id);
      setUsers(filtered);
    };
    fetch();
  }, []);

  return (
    <div className="w-1/3 border-r border-[#202c33] h-screen overflow-auto bg-[#212121] text-white">
      <h2 className="p-4 font-bold text-xl border-b border-[#202c33]">Foydalanuvchilar</h2>
      {users.map(user => (
        <div
          key={user.id}
          className={`p-4 border-b border-[#202c33] cursor-pointer hover:bg-[#2a3942] ${selectedUser?.id === user.id ? 'bg-[#202c33]' : ''}`}
          onClick={() => onSelect(user)}
        >
          {user.username || user.email || user.id}
        </div>
      ))}
    </div>
  );
}
