import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { languages } from '../utils/languages';
import { Code, ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-12 md:py-20"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-accent-purple text-sm mb-6">
          <Sparkles size={16} /> Advanced Web Technology Project
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan bg-clip-text text-transparent">
          Code Snippet Library
        </h1>
        <p className="text-dark-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Explore 50+ curated code snippets across 9 programming languages. Save, share, and build your own collection.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/dashboard" className="px-6 py-3 bg-accent-purple rounded-xl text-white font-medium hover:bg-accent-purple/90 transition-all hover:shadow-lg hover:shadow-accent-purple/25 flex items-center gap-2">
            Explore Dashboard <ArrowRight size={18} />
          </Link>
          <Link to="/signup" className="px-6 py-3 glass rounded-xl text-dark-100 font-medium hover:bg-white/10 transition-all flex items-center gap-2">
            <Code size={18} /> Get Started
          </Link>
        </div>
      </motion.div>

      {/* Language Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {languages.map((lang, i) => (
          <motion.div
            key={lang.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              to={`/language/${lang.slug}`}
              className="flex items-center gap-4 p-5 glass rounded-2xl hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${lang.color}15` }}>
                <lang.icon size={24} style={{ color: lang.color }} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-dark-50 group-hover:text-accent-purple transition-colors">
                  {lang.name}
                </h3>
                <p className="text-dark-400 text-sm">View snippets →</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-3 gap-4 mt-12 mb-8"
      >
        {[
          { label: 'Snippets', value: '50+' },
          { label: 'Languages', value: '9' },
          { label: 'Levels', value: '3' },
        ].map(stat => (
          <div key={stat.label} className="text-center glass rounded-2xl p-6">
            <div className="text-3xl font-bold text-accent-purple">{stat.value}</div>
            <div className="text-dark-300 text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
