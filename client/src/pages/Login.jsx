import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Lock, User } from 'lucide-react';
import { login } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { masuk } = useAuth();
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(username, password);
      masuk(res.data.token, res.data.admin);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 480 }}>
        <p className="section__eyebrow mono-label">Area Admin</p>
        <div className="section__head">
          <LogIn size={22} className="icon" aria-hidden="true" />
          <h1>Login Admin</h1>
        </div>
        {error && <p className="alert alert--error" role="alert">{error}</p>}
        <form className="form card form-card" onSubmit={submit}>
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-field">
            <label htmlFor="password">Kata Sandi</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className={`btn btn--primary${loading ? ' btn--loading' : ''}`} disabled={loading}>
            {loading ? <span className="spinner" aria-hidden="true" /> : <Lock size={18} aria-hidden="true" />}
            {loading ? 'Memeriksa...' : 'Masuk'}
          </button>
          <p className="muted m-0 text-xs inline-flex items-center gap-1">
            <User size={14} aria-hidden="true" />
            Akses khusus admin Karro Wedding.
          </p>
        </form>
      </div>
    </section>
  );
}
