import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import SnippetCard from '../components/SnippetCard';
import toast from 'react-hot-toast';
import { Plus, Code, User, X } from 'lucide-react';
import { languages } from '../utils/languages';

export default function Profile() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [mySnippets, setMySnippets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', language: 'JavaScript', code: '', description: '', tags: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate('/login');
  }, [user, authLoading]);

  useEffect(() => {
    if (user) {
      api.get('/user-snippets').then(res => setMySnippets(res.data)).catch(console.error);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
      const res = await api.post('/user-snippets', payload);
      setMySnippets(prev => [res.data, ...prev]);
      setShowForm(false);
      setForm({ title: '', language: 'JavaScript', code: '', description: '', tags: '' });
      toast.success('Snippet added!');
    } catch (err) {
      toast.error('Failed to add snippet');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/user-snippets/${id}`);
      setMySnippets(prev => prev.filter(s => s._id !== id));
      toast.success('Snippet deleted');
    } catch { toast.error('Failed to delete'); }
  };

  if (authLoading) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Profile Header */}
        <div className="glass rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-accent-purple/20 flex items-center justify-center">
              <User size={32} className="text-accent-purple" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user?.username}</h1>
              <p className="text-dark-300">{user?.email}</p>
              <p className="text-dark-400 text-sm">{mySnippets.length} snippets saved</p>
            </div>
          </div>
        </div>

        {/* Add Snippet Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Code size={20} /> My Snippets
          </h2>
          <button onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-accent-purple rounded-xl text-white text-sm font-medium hover:bg-accent-purple/90 transition-all flex items-center gap-2">
            {showForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add Snippet</>}
          </button>
        </div>

        {/* Add Snippet Form */}
        {showForm && (
          <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            onSubmit={handleSubmit} className="glass rounded-2xl p-6 mb-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-200 mb-1">Title</label>
                <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required
                  className="w-full px-4 py-2.5 bg-dark-700/50 border border-white/10 rounded-xl text-dark-50 outline-none focus:ring-2 focus:ring-accent-purple" placeholder="Snippet title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-200 mb-1">Language</label>
                <select value={form.language} onChange={e => setForm({...form, language: e.target.value})}
                  className="w-full px-4 py-2.5 bg-dark-700/50 border border-white/10 rounded-xl text-dark-50 outline-none focus:ring-2 focus:ring-accent-purple">
                  {languages.map(l => <option key={l.name} value={l.name}>{l.name}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-1">Description</label>
              <input type="text" value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                className="w-full px-4 py-2.5 bg-dark-700/50 border border-white/10 rounded-xl text-dark-50 outline-none focus:ring-2 focus:ring-accent-purple" placeholder="Brief description" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-1">Code</label>
              <textarea value={form.code} onChange={e => setForm({...form, code: e.target.value})} required rows={8}
                className="w-full px-4 py-2.5 bg-dark-700/50 border border-white/10 rounded-xl text-dark-50 outline-none focus:ring-2 focus:ring-accent-purple font-mono text-sm" placeholder="Paste your code here..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-1">Tags (comma-separated)</label>
              <input type="text" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})}
                className="w-full px-4 py-2.5 bg-dark-700/50 border border-white/10 rounded-xl text-dark-50 outline-none focus:ring-2 focus:ring-accent-purple" placeholder="react, hooks, useState" />
            </div>
            <button type="submit" disabled={submitting}
              className="px-6 py-2.5 bg-accent-purple rounded-xl text-white font-medium hover:bg-accent-purple/90 disabled:opacity-50 transition-all">
              {submitting ? 'Saving...' : 'Save Snippet'}
            </button>
          </motion.form>
        )}

        {/* User's Snippets */}
        {mySnippets.length === 0 ? (
          <div className="text-center py-16 text-dark-300">
            <Code size={48} className="mx-auto mb-4 opacity-50" />
            <p>No snippets yet. Click "Add Snippet" to create your first one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mySnippets.map((snippet, i) => (
              <div key={snippet._id} className="relative group">
                <div className="glass rounded-2xl p-5 animate-fade-in">
                  <h3 className="font-semibold text-dark-50 mb-1">{snippet.title}</h3>
                  <p className="text-dark-300 text-sm mb-3 line-clamp-2">{snippet.description}</p>
                  <pre className="text-xs bg-dark-800/50 rounded-lg p-3 overflow-x-auto max-h-32 text-dark-200 font-mono mb-3">
                    {snippet.code}
                  </pre>
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-dark-600/50 text-dark-200">{snippet.language}</span>
                    <button onClick={() => handleDelete(snippet._id)}
                      className="text-xs text-red-400 hover:text-red-300 transition-colors">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
