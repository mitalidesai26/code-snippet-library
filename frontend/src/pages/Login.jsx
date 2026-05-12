import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Redirect to home once login is successful
  useEffect(() => {
    if (redirecting && user) {
      navigate('/');
    }
  }, [redirecting, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      setRedirecting(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-800 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
        <div className="glass rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-accent-purple mb-2">Welcome Back</h1>
            <p className="text-dark-300">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-white/10 rounded-xl text-dark-50 focus:ring-2 focus:ring-accent-purple focus:border-transparent outline-none transition-all"
                  placeholder="you@example.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                  className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-white/10 rounded-xl text-dark-50 focus:ring-2 focus:ring-accent-purple focus:border-transparent outline-none transition-all"
                  placeholder="••••••••" />
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 bg-accent-purple rounded-xl text-white font-medium hover:bg-accent-purple/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              <LogIn size={18} /> {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-dark-300 text-sm mt-6">
            Don't have an account? <Link to="/signup" className="text-accent-purple hover:underline">Sign Up</Link>
          </p>
          <p className="text-center mt-4">
            <Link to="/" className="text-dark-400 hover:text-dark-200 text-sm">← Back to Home</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
