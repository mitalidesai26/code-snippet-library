import { Link } from 'react-router-dom';
import { Menu, Sun, Moon, User, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onMenuClick }) {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="h-16 border-b border-white/5 glass flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      <button onClick={onMenuClick} className="lg:hidden text-dark-200 hover:text-white p-2">
        <Menu size={22} />
      </button>

      <h1 className="text-lg font-semibold hidden md:block">Code Snippet Library</h1>
      <div className="md:hidden" />

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl hover:bg-dark-600/50 text-dark-200 hover:text-white transition-all"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {user ? (
          <div className="flex items-center gap-3">
            <Link to="/profile" className="flex items-center gap-2 text-dark-200 hover:text-white transition-colors">
              <User size={20} />
              <span className="hidden sm:inline text-sm">{user.username}</span>
            </Link>
            <button onClick={logout} className="p-2 rounded-xl hover:bg-dark-600/50 text-dark-200 hover:text-white">
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <Link to="/login" className="px-4 py-2 bg-accent-purple/20 text-accent-purple rounded-xl text-sm font-medium hover:bg-accent-purple/30 transition-all">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
