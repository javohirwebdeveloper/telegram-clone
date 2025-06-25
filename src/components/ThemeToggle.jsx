// src/components/ThemeToggle.jsx
import { useSettings } from '../context/SettingsContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useSettings();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '8px 12px',
        borderRadius: '6px',
        cursor: 'pointer',
        backgroundColor: theme === 'dark' ? '#444' : '#ddd',
        color: theme === 'dark' ? '#fff' : '#111',
        border: 'none',
        fontWeight: 'bold',
        transition: 'all 0.3s',
      }}
    >
      {theme === 'dark' ? '🌙 Tungi rejim' : '☀️ Yorugʻ rejim'}
    </button>
  );
}
