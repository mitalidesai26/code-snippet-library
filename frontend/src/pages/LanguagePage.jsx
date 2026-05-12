import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';
import SnippetCard from '../components/SnippetCard';
import { getLanguageBySlug } from '../utils/languages';

export default function LanguagePage() {
  const { slug } = useParams();
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const lang = getLanguageBySlug(slug);

  useEffect(() => {
    setLoading(true);
    const langName = lang?.name || slug;
    api.get(`/snippets?language=${langName}`)
      .then(res => setSnippets(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (!lang) return <div className="text-center py-20 text-dark-300">Language not found</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${lang.color}15` }}>
            <lang.icon size={28} style={{ color: lang.color }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{lang.name} Snippets</h1>
            <p className="text-dark-300 text-sm">{snippets.length} code snippets available</p>
          </div>
        </div>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-5 animate-pulse">
              <div className="h-5 bg-dark-600 rounded w-3/4 mb-3" />
              <div className="h-4 bg-dark-600 rounded w-full mb-2" />
              <div className="h-4 bg-dark-600 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : snippets.length === 0 ? (
        <div className="text-center py-20 text-dark-300">No snippets found for {lang.name}</div>
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
