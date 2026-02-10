import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggler = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-all flex items-center justify-center"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <Sun size={18} className="text-yellow-400" />
            ) : (
                <Moon size={18} className="text-blue-400" />
            )}
        </button>
    );
};

export default ThemeToggler;
