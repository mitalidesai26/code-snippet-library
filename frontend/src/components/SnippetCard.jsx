import { Link } from 'react-router-dom';
import { Copy, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function SnippetCard({ snippet, index = 0 }) {
  const copyCode = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(snippet.code.replace(/\\n/g, '\n'));
    toast.success('Code copied!');
  };

  const levelColors = {
    beginner: 'text-accent-green bg-accent-green/10',
    intermediate: 'text-accent-blue bg-accent-blue/10',
    advanced: 'text-accent-pink bg-accent-pink/10',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link
        to={`/snippet/${snippet.id}`}
        className="block glass rounded-2xl p-5 hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-purple/5 group"
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-dark-50 group-hover:text-accent-purple transition-colors">
              {snippet.title}
            </h3>
            <p className="text-dark-300 text-sm mt-1 line-clamp-2">{snippet.description}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={copyCode} className="p-2 rounded-lg hover:bg-dark-600/50 text-dark-300 hover:text-white transition-all">
              <Copy size={16} />
            </button>
            <ExternalLink size={16} className="mt-2 text-dark-400 group-hover:text-accent-purple transition-colors" />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <span className="text-xs px-2.5 py-1 rounded-full bg-dark-600/50 text-dark-200">
            {snippet.language}
          </span>
          <span className={`text-xs px-2.5 py-1 rounded-full ${levelColors[snippet.level]}`}>
            {snippet.level}
          </span>
          {snippet.tags?.slice(0, 2).map(tag => (
            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-dark-700/50 text-dark-300">
              #{tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
