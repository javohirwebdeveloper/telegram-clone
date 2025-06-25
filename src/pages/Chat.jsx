import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import SettingsDrawer from '../components/SettingsDrawer';
import { Menu } from 'lucide-react';

export default function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar onSelect={setSelectedUser} selectedUser={selectedUser} />

      <div className="flex flex-col w-full relative">
        <div className="p-4 bg-[#212121] text-white flex items-center justify-between border-b border-[#202c33]">
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 text-white hover:bg-[#2a3942] rounded"
          >
            <Menu size={24} />
          </button>
          <h1 className="font-bold text-xl">Ultra Chat</h1>
          <div></div>
        </div>

        <ChatWindow selectedUser={selectedUser} />
      </div>

      <SettingsDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
