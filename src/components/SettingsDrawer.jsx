import { useState } from 'react';
import pb from '../pb';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import ThemeToggle from './ThemeToggle';
export default function ProfileDrawer({ open, onClose }) {
  const user = pb.authStore.model;
  const [username, setUsername] = useState(user.username || '');
  const [avatar, setAvatar] = useState(null);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [showOldPass, setShowOldPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('username', username);
      if (avatar) formData.append('avatar', avatar);
      await pb.collection('users').update(user.id, formData);
      toast.success("Profil muvaffaqiyatli yangilandi");
    } catch (err) {
      toast.error("Xatolik: " + (err.message || "Yangi ma'lumotlarni saqlab bo‘lmadi"));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    try {
      setLoading(true);
      await pb.collection('users').update(user.id, {
        oldPassword: oldPass,
        password: newPass,
        passwordConfirm: newPass,
      });
      toast.success("Parol muvaffaqiyatli o‘zgartirildi");
      setOldPass('');
      setNewPass('');
    } catch (err) {
      toast.error("Xatolik: " + (err?.response?.data?.oldPassword?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end" onClick={onClose}>
      <div
        className="w-full max-w-md bg-[#1e1e1e] text-white p-6 overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Profil sozlamalari</h2>

        {/* Avatar */}
        <div className="mb-4">
          <label className="block mb-1">Avatar</label>
          <img
            src={pb.files.getUrl(user, user.avatar)}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover mb-2"
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => setAvatar(e.target.files?.[0])}
            className="block text-sm"
          />
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            className="w-full p-2 bg-[#2a2a2a] rounded text-white"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <button
          disabled={loading}
          onClick={handleProfileUpdate}
          className={clsx("w-full py-2 rounded mb-6 font-semibold", loading ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700')}
        >
          {loading ? 'Yuklanmoqda...' : 'Profilni saqlash'}
        </button>

        <hr className="my-4 border-[#333]" />

        {/* Password change */}
        <div className="mb-4">
          <label className="block mb-1">Eski parol</label>
          <div className="relative">
            <input
              type={showOldPass ? 'text' : 'password'}
              className="w-full p-2 bg-[#2a2a2a] rounded text-white"
              value={oldPass}
              onChange={e => setOldPass(e.target.value)}
            />
            <button
              className="absolute right-2 top-2 text-sm"
              onClick={() => setShowOldPass(p => !p)}
              type="button"
            >
              {showOldPass ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Yangi parol</label>
          <input
            type="password"
            className="w-full p-2 bg-[#2a2a2a] rounded text-white"
            value={newPass}
            onChange={e => setNewPass(e.target.value)}
          />
        </div>
        <div className="settings">
  <h3>Ilova Ko‘rinishi</h3>
  <ThemeToggle />
</div>
        <button
          disabled={loading}
          onClick={handlePasswordChange}
          className={clsx("w-full py-2 rounded", loading ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-700')}
        >
          {loading ? 'Yuklanmoqda...' : 'Parolni yangilash'}
        </button>
      </div>
    </div>
  );
}
