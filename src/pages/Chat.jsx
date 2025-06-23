
// src/pages/Chat.jsx
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';

export default function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="flex">
      <Sidebar onSelect={setSelectedUser} selectedUser={selectedUser} />
      <ChatWindow selectedUser={selectedUser} />
    </div>
  );
}