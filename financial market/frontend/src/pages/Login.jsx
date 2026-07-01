import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, Lock, Eye, EyeOff, TrendingUp, ChevronRight } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-page">
      <div className="login-sidebar glass-panel">
        <div className="brand">
          <Leaf size={40} className="text-success mb-4" />
          <h1>WealthSprout</h1>
          <p className="subtitle">Grow your financial future today.</p>
        </div>
        
        <div className="mfa-explorer">
          <h3><TrendingUp size={16} /> Beginner Friendly</h3>
          <p>We make investing simple. Start with as little as $5 and watch your money grow over time.</p>
        </div>

        <div className="security-feed">
          <h3><Lock size={16} /> Bank-Level Security</h3>
          <ul className="feed-list">
            <li>Your funds are protected and insured.</li>
            <li>We use 256-bit encryption.</li>
            <li>Your data is never sold.</li>
          </ul>
        </div>
      </div>

      <div className="login-content">
        <div className="login-form-container glass-panel animate-fade-in">
          <h2>Welcome Back!</h2>
          <p className="form-subtitle">Sign in to track your goals and investments.</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email Address</label>
              <input 
                type="text" 
                className="input-field" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div className="input-group">
              <label>Password</label>
              <div className="password-input-wrapper">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="input-field" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                />
                <button 
                  type="button"
                  className="toggle-password" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <button type="submit" className="btn-primary login-btn">
              Sign In <ChevronRight size={18} />
            </button>
          </form>
          
          <div className="form-footer">
            <a href="#">Forgot password?</a>
            <a href="#">Create an account</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
