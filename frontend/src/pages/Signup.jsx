import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Mail, Lock, User, UserPlus } from 'lucide-react';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (redirecting && user) {
      navigate('/');
    }
  }, [redirecting, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending Data:", { username, email, password });

    // ✅ validation
    if (!username.trim() || !email.trim() || !password.trim()) {
      toast.error('All fields are required');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      // ✅ ensure correct data format
      await signup(
      username.trim(),
      email.trim(),
      password.trim()
    );
      toast.success('Account created!');
      setRedirecting(true);

    } catch (err) {
      console.error("Signup Error FULL:", err);

      // ✅ show backend error properly
      let message = 'Signup failed';

      if (err?.response?.data?.error) {
        message = err.response.data.error;   // 👈 real backend error
      } else if (err?.response?.data?.message) {
        message = err.response.data.message;
      } else if (err?.message) {
        message = err.message;
      }

      toast.error(message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-800 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
        <div className="glass rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-accent-purple mb-2">Create Account</h1>
            <p className="text-dark-300">Join the Code Snippet Library</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">Username</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-white/10 rounded-xl text-dark-50 focus:ring-2 focus:ring-accent-purple focus:border-transparent outline-none transition-all"
                  placeholder="johndoe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-white/10 rounded-xl text-dark-50 focus:ring-2 focus:ring-accent-purple focus:border-transparent outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-white/10 rounded-xl text-dark-50 focus:ring-2 focus:ring-accent-purple focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent-purple rounded-xl text-white font-medium hover:bg-accent-purple/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <UserPlus size={18} />
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-dark-300 text-sm mt-6">
            Already have an account? <Link to="/login" className="text-accent-purple hover:underline">Sign In</Link>
          </p>
          <p className="text-center mt-4">
            <Link to="/" className="text-dark-400 hover:text-dark-200 text-sm">← Back to Home</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}