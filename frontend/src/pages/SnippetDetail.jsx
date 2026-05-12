import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import api from '../utils/api';
import CodeBlock from '../components/CodeBlock';

export default function SnippetDetail() {
  const { id } = useParams();
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/snippets/${id}`)
      .then(res => setSnippet(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);
  
  if (loading) return (
    <div className="max-w-4xl mx-auto animate-pulse">
      <div className="h-8 bg-dark-600 rounded w-1/2 mb-4" />
      <div className="h-64 bg-dark-600 rounded-xl" />
    </div>
  );

  if (!snippet) return <div className="text-center py-20 text-dark-300">Snippet not found</div>;

  const levelColors = {
    beginner: 'text-accent-green bg-accent-green/10',
    intermediate: 'text-accent-blue bg-accent-blue/10',
    advanced: 'text-accent-pink bg-accent-pink/10',
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
      <Link to={-1} className="inline-flex items-center gap-2 text-dark-300 hover:text-white mb-6 transition-colors">
        <ArrowLeft size={18} /> Back
      </Link>

      <div className="glass rounded-2xl p-6 md:p-8 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{snippet.title}</h1>
        <p className="text-dark-300 mb-4">{snippet.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-xs px-3 py-1 rounded-full bg-dark-600/50 text-dark-200">{snippet.language}</span>
          <span className={`text-xs px-3 py-1 rounded-full ${levelColors[snippet.level]}`}>{snippet.level}</span>
          {snippet.tags?.map(tag => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-dark-700/50 text-dark-300">#{tag}</span>
          ))}
        </div>
        <CodeBlock code={snippet.code} language={snippet.language} />
      </div>
    </motion.div>
  );
}
