import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import SnippetCard from '../components/SnippetCard';
import { Zap } from 'lucide-react';

export default function Dashboard() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/snippets/dashboard')
      .then(res => setSnippets(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-xl bg-accent-pink/10">
            <Zap size={24} className="text-accent-pink" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-dark-300 text-sm">Advanced-level code snippets across all languages</p>
          </div>
        </div>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-5 animate-pulse">
              <div className="h-5 bg-dark-600 rounded w-3/4 mb-3" />
              <div className="h-4 bg-dark-600 rounded w-full mb-2" />
              <div className="h-4 bg-dark-600 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {snippets.map((snippet, i) => (
            <SnippetCard key={snippet.id} snippet={snippet} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
