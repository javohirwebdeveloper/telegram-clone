// src/components/ChatWindow.jsx
import { useEffect, useState, useRef } from 'react';
import pb from '../pb';
import MessageItem from './MessageItem';

export default function ChatWindow({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const endRef = useRef(null);
  const currentUser = pb.authStore.model;

  const fetchMessages = async () => {
    const result = await pb.collection('messages').getFullList({
      sort: 'created',
      filter: `(sender="${currentUser.id}" && receiver="${selectedUser.id}") || (sender="${selectedUser.id}" && receiver="${currentUser.id}")`,
      expand: 'sender,receiver',
    });
    setMessages(result);
  };

  useEffect(() => {
    if (!selectedUser) return;
    fetchMessages();

    const unsubscribe = pb.collection('messages').subscribe('*', async ({ action, record }) => {
      if (
        (record.sender === currentUser.id && record.receiver === selectedUser.id) ||
        (record.sender === selectedUser.id && record.receiver === currentUser.id)
      ) {
        const full = await pb.collection('messages').getOne(record.id, {
          expand: 'sender,receiver'
        });
        setMessages(prev => [...prev, full]);
      }
    });

    return () => {
      pb.collection('messages').unsubscribe('*');
      setMessages([]);
    };
  }, [selectedUser]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendTextMessage = async () => {
    if (!text.trim()) return;
    try {
      await pb.collection('messages').create({
        sender: currentUser.id,
        receiver: selectedUser.id,
        text,
        type: 'text',
      });
      setText('');
    } catch (err) {
      alert('Xabar yuborilmadi: ' + err.message);
    }
  };

  const sendFile = async (file) => {
    const type = file.type.startsWith('image/') ? 'image'
      : file.type.startsWith('audio/') ? 'audio'
      : 'file';

    const formData = new FormData();
    formData.append('sender', pb.authStore.model.id);
    formData.append('receiver', selectedUser.id);
    formData.append('type', type);
    formData.append('file', file);

    try {
      await pb.collection('messages').create(formData);
    } catch (err) {
      alert('Yuborishda xatolik: ' + err.message);
    }
  };

  if (!selectedUser) {
    return <div className="w-2/3 flex items-center justify-center text-gray-400 bg-[#111b21]">Foydalanuvchini tanlang</div>;
  }

  return (
    <div className="w-2/3 h-screen flex flex-col bg-[#111b21]">
      <div className="p-4 border-b border-[#202c33] font-bold text-white bg-[#212121]">
        {selectedUser.username || selectedUser.email}
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-2 bg-[url('/bg-chat-dark.jpg')] bg-cover bg-center">
        {messages.map(msg => (
          <MessageItem
            key={msg.id}
            msg={msg}
            self={msg?.sender?.id ? msg.sender.id === currentUser.id : msg.sender === currentUser.id}
          />
        ))}
        <div ref={endRef} />
      </div>

      <div className="p-4 border-t border-[#202c33] bg-[#202c33] flex flex-col gap-2">
        <div className="flex items-center">
          <input
            type="text"
            className="flex-1 bg-[#2a3942] border border-[#2a3942] text-white placeholder-gray-400 p-2 rounded focus:outline-none"
            placeholder="Xabar yozing..."
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendTextMessage()}
          />
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={e => {
              if (e.target.files[0]) sendFile(e.target.files[0]);
              e.target.value = '';
            }}
          />
          <label htmlFor="file-upload" className="ml-2 px-3 py-2 bg-[#2a3942] text-white cursor-pointer rounded">📎</label>
          <button onClick={sendTextMessage} className="ml-2 px-4 bg-[#005c4b] text-white rounded">➤</button>
        </div>
      </div>
    </div>
  );
}
