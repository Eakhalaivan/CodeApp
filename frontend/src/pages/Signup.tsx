import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, User, Lock, Mail, Facebook, Instagram, Github } from 'lucide-react';
import { useToastStore } from '../store/toastStore';
import vibeCoding from '../assets/vibe-coding.png';
import matrixBgV2 from '../assets/matrix-bg-v2.png';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('');

  const register = useAuthStore((state) => state.register);
  const socialLogin = useAuthStore((state) => state.socialLogin);
  const navigate = useNavigate();
  const addToast = useToastStore(s => s.addToast);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await register(username, email, password);
      addToast('Account created! Welcome to CODEFLUX 🚀', 'success');
      navigate('/dashboard');
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Registration failed. Please try again.';
      setError(msg);
      addToast('Registration failed', 'error');
    }
  };

  const handleSocialSignup = async (provider: string, email?: string) => {
    try {
      await socialLogin(provider, email);
      addToast(`Joined with ${provider}! Welcome to CodeFlux 🚀`, 'success');
      navigate('/dashboard');
    } catch (err) {
      addToast(`${provider} signup failed`, 'error');
    } finally {
      setShowSocialModal(false);
    }
  };

  const socialAccounts = [
    { name: 'Eakhalaivan', email: 'eakhalaivan@gmail.com', avatar: 'E' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-rose-200">
      {/* Full Screen Matrix Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={matrixBgV2}
          alt="Matrix Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-7xl h-[900px] bg-white/10 backdrop-blur-2xl rounded-[4rem] border border-white/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col lg:flex-row relative z-10"
      >
        {/* Left Side: Visual Panel (40%) */}
        <div className="hidden lg:flex lg:w-[40%] bg-black relative overflow-hidden p-16 flex-col justify-between">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={vibeCoding}
              alt="Vibe Coding"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
          </div>

          <div className="relative z-10">
            <h3 className="text-white font-black tracking-[0.3em] text-lg uppercase">CODEFLUX</h3>
          </div>

          <div className="relative z-10 mt-auto flex items-end justify-between">
            <div className="flex flex-col gap-4">
              <span className="text-white/60 text-sm font-bold">Already a member?</span>
              <button
                onClick={() => navigate('/login')}
                className="px-10 py-4 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl text-white text-sm font-black hover:bg-white/20 transition-all duration-300 active:scale-95 shadow-lg"
              >
                Sign In
              </button>
            </div>
            <div className="flex gap-6 text-white/50">
              <Facebook size={22} className="hover:text-white transition-all cursor-pointer hover:scale-125 duration-300" />
              <Instagram size={22} className="hover:text-white transition-all cursor-pointer hover:scale-125 duration-300" />
            </div>
          </div>
        </div>

        {/* Right Side: Signup Form (60%) */}
        <div className="flex-1 flex flex-col justify-center items-center px-8 lg:px-32 py-16 relative bg-white">
          <div className="w-full max-w-md">
            <header className="text-center mb-10">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl lg:text-6xl font-black text-slate-900 mb-4 tracking-[-0.05em]"
              >
                Join Us
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-slate-400 font-bold text-xl"
              >
                Create your CodeFlux account
              </motion.p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div className="relative group">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="w-full h-16 px-8 rounded-full border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-rose-500/20 focus:ring-4 focus:ring-rose-500/5 transition-all duration-300 outline-none font-bold text-slate-700 placeholder:text-slate-300 text-lg shadow-sm"
                />
                <div className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-500 transition-colors duration-300">
                  <User size={22} />
                </div>
              </div>

              {/* Email */}
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full h-16 px-8 rounded-full border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-rose-500/20 focus:ring-4 focus:ring-rose-500/5 transition-all duration-300 outline-none font-bold text-slate-700 placeholder:text-slate-300 text-lg shadow-sm"
                />
                <div className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-500 transition-colors duration-300">
                  <Mail size={22} />
                </div>
              </div>

              {/* Password */}
              <div className="relative group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full h-16 px-8 rounded-full border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-rose-500/20 focus:ring-4 focus:ring-rose-500/5 transition-all duration-300 outline-none font-bold text-slate-700 placeholder:text-slate-300 text-lg shadow-sm"
                />
                <div className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-500 transition-colors duration-300">
                  <Lock size={22} />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="relative group">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full h-16 px-8 rounded-full border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-rose-500/20 focus:ring-4 focus:ring-rose-500/5 transition-all duration-300 outline-none font-bold text-slate-700 placeholder:text-slate-300 text-lg shadow-sm"
                />
                <div className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-500 transition-colors duration-300">
                  <Lock size={22} />
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-rose-600 text-xs font-bold text-center bg-rose-50 py-3 rounded-2xl"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="flex flex-col gap-4 pt-2">
                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={() => { setSelectedProvider('Google'); setShowSocialModal(true); }}
                    className="flex-1 h-16 rounded-full border-2 border-slate-100 flex items-center justify-center gap-4 font-black text-slate-600 hover:bg-white hover:border-slate-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-95 group"
                  >
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" />
                    Google
                  </button>

                  <button 
                    type="button"
                    onClick={() => { setSelectedProvider('GitHub'); setShowSocialModal(true); }}
                    className="flex-1 h-16 rounded-full border-2 border-slate-100 flex items-center justify-center gap-4 font-black text-slate-600 hover:bg-white hover:border-slate-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-95 group"
                  >
                    <Github size={20} className="grayscale group-hover:grayscale-0 transition-all text-slate-900" />
                    GitHub
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full h-16 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 text-white flex items-center justify-center gap-3 font-black text-lg tracking-widest uppercase shadow-[0_20px_40px_-10px_rgba(225,29,72,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(225,29,72,0.6)] hover:scale-[1.02] transition-all duration-300 active:scale-95 group overflow-hidden relative"
                >
                  <span className="relative z-10">Create Account</span>
                  <ArrowRight size={22} className="relative z-10 translate-x-0 group-hover:translate-x-2 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            </form>

            <footer className="mt-8 text-center text-sm font-bold text-slate-400">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-rose-500 hover:underline decoration-2 underline-offset-8 ml-1 font-black transition-all"
              >
                Sign in
              </button>
            </footer>
          </div>
        </div>
      </motion.div>

      {/* Social Account Selector Modal (Google Style) */}
      <AnimatePresence>
        {showSocialModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSocialModal(false)}
              className="absolute inset-0 bg-white/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              className="relative w-full max-w-[450px] bg-white rounded-lg border border-slate-200 shadow-[0_24px_38px_3px_rgba(0,0,0,0.14),0_9px_46px_8px_rgba(0,0,0,0.12),0_11px_15px_-7px_rgba(0,0,0,0.2)] p-10 flex flex-col items-center"
            >
              {/* Google G Logo */}
              <div className="mb-4">
                <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  <path d="M1 1h22v22H1z" fill="none"/>
                </svg>
              </div>

              <h1 className="text-2xl font-normal text-slate-900 mb-2">Create an account</h1>
              <p className="text-base text-slate-700 mb-8">to join <span className="font-medium">CodeFlux</span> with {selectedProvider}</p>

              <div className="w-full border-t border-slate-100">
                {socialAccounts.map((account) => (
                  <button
                    key={account.email}
                    onClick={() => handleSocialSignup(selectedProvider, account.email)}
                    className="w-full py-3 border-b border-slate-100 flex items-center gap-3 transition-colors hover:bg-slate-50 relative group px-1"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                      <div className="w-full h-full bg-slate-900 text-white text-[10px] font-medium flex items-center justify-center">
                        {account.avatar}
                      </div>
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{account.name}</p>
                      <p className="text-xs text-slate-500 truncate">{account.email}</p>
                    </div>
                  </button>
                ))}
                
                <button
                  onClick={() => setShowSocialModal(false)}
                  className="w-full py-4 border-b border-slate-100 flex items-center gap-3 transition-colors hover:bg-slate-50 px-1"
                >
                  <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center shrink-0">
                    <User size={16} className="text-slate-500" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">Use another account</p>
                </button>
              </div>

              <div className="mt-8 text-[11px] leading-[1.6] text-slate-500 font-normal">
                To continue, Google will share your name, email address, language preference, and profile picture with CodeFlux. Before using this app, you can review CodeFlux’s <a href="#" className="text-blue-600 hover:underline">privacy policy</a> and <a href="#" className="text-blue-600 hover:underline">terms of service</a>.
              </div>

              <div className="mt-10 flex justify-end w-full">
                 <button 
                  onClick={() => setShowSocialModal(false)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
