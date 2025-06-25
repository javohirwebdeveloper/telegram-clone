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
    <div className="w-2/7 border-r px-2 border-[#202c33] h-screen overflow-auto bg-[#212121] text-white">
      <h2 className="p-4 font-bold text-xl border-b border-[#202c33]">Users</h2>
      {users.map(user => {
        const avatarUrl = user.avatar
          ? pb.files.getUrl(user, user.avatar)
          : null;
        const firstLetter = (user.username || user.email || user.id)?.charAt(0)?.toUpperCase();

        return (
          <div
            key={user.id}
            className={`flex items-center gap-3 p-[10px] border-0 rounded-2xl cursor-pointer hover:bg-[#2C2C2C] ${selectedUser?.id === user.id ? 'bg-[#766ac8]' : ''}`}
            onClick={() => onSelect(user)}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="avatar"
                className="w-15 h-15 rounded-full object-cover"
              />
            ) : (
              <div className="w-15 h-15 text-2xl rounded-full bg-[#3a4a54] flex items-center justify-center text-white font-semibold">
                {firstLetter}
              </div>
            )}
            <span className="truncate text-[16px]">{user.username || user.email || user.id}</span>
          </div>
        );
      })}
    </div>
  );
}
