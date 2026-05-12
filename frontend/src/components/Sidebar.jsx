import { NavLink } from 'react-router-dom';
import { Home, LayoutDashboard, X } from 'lucide-react';
import { languages } from '../utils/languages';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar({ isOpen, onClose }) {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-accent-purple/20 text-accent-purple shadow-lg shadow-accent-purple/10'
        : 'text-dark-200 hover:text-dark-50 hover:bg-dark-600/50'
    }`;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-white/5 bg-dark-900/50 backdrop-blur-xl p-4">
        <div className="text-xl font-bold text-accent-purple mb-8 px-4 flex items-center gap-2">
          <span className="text-2xl">📋</span> Code Snippets
        </div>
        <NavContent linkClass={linkClass} />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed left-0 top-0 bottom-0 w-72 z-50 flex flex-col border-r border-white/5 bg-dark-900/95 backdrop-blur-xl p-4 lg:hidden"
          >
            <div className="flex items-center justify-between mb-8 px-4">
              <span className="text-xl font-bold text-accent-purple flex items-center gap-2">
                <span className="text-2xl">📋</span> Code Snippets
              </span>
              <button onClick={onClose} className="text-dark-200 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <NavContent linkClass={linkClass} onClose={onClose} />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

function NavContent({ linkClass, onClose }) {
  return (
    <nav className="flex-1 space-y-1 overflow-y-auto">
      <NavLink to="/" end className={linkClass} onClick={onClose}>
        <Home size={18} /> Home
      </NavLink>
      <NavLink to="/dashboard" className={linkClass} onClick={onClose}>
        <LayoutDashboard size={18} /> Dashboard
      </NavLink>
      
      <div className="pt-4 pb-2 px-4 text-xs font-semibold text-dark-300 uppercase tracking-wider">
        Languages
      </div>
      
      {languages.map(lang => (
        <NavLink key={lang.slug} to={`/language/${lang.slug}`} className={linkClass} onClick={onClose}>
          <lang.icon size={18} style={{ color: lang.color }} />
          {lang.name}
        </NavLink>
      ))}
    </nav>
  );
}
