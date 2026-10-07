import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { Field, isEmail } from '../components/ui.jsx';

export default function Login() {
  const { user, login } = useApp();
  const [f, setF] = useState({ email: '', password: '' });
  const [errs, setErrs] = useState({});
  const nav = useNavigate();
  const loc = useLocation();
  if (user) return <Navigate to="/" replace />;

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!isEmail(f.email)) er.email = 'Enter a valid email address.';
    if (!f.password) er.password = 'Password is required.';
    if (!Object.keys(er).length) { const m = login(f.email, f.password); if (m) er.form = m; else return nav(loc.state?.from || '/', { replace: true }); }
    setErrs(er);
  };

  return (
    <div className="auth">
      <div className="auth-art"><h1>🎓 PlaceHub</h1><p>Track openings, applications and interviews in one place — from first apply to offer letter.</p></div>
      <form className="auth-card" onSubmit={submit} noValidate>
        <h2>Welcome back</h2><p className="muted">Log in to your placement portal.</p>
        {errs.form && <div className="banner err-banner">{errs.form}</div>}
        <Field label="College email" type="email" value={f.email} error={errs.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
        <Field label="Password" type="password" value={f.password} error={errs.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
        <button className="btn block">Log in</button>
        <button type="button" className="btn ghost block" onClick={() => setF({ email: 'demo@college.edu', password: 'demo123' })}>Fill demo account</button>
        <p className="muted center">New student? <Link to="/register">Create an account</Link></p>
      </form>
    </div>
  );
}
