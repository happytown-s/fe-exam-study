interface Props {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function DarkModeToggle({ darkMode, onToggleDarkMode }: Props) {
  return (
    <button
      onClick={onToggleDarkMode}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-md"
      aria-label="ダークモード切替"
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}
