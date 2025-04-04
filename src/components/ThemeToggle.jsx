// components/ThemeToggle.jsx
export default function ThemeToggle({ darkMode, toggleTheme }) {
    return (
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded bg-gray-200 dark:bg-gray-700"
      >
        {darkMode ? '🌞 Light' : '🌙 Dark'}
      </button>
    );
  }
  