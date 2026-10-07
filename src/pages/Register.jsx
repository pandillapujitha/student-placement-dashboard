import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { Field, isEmail } from '../components/ui.jsx';

export default function Register() {
  const { user, register } = useApp();
  const [f, setF] = useState({ name: '', email: '', department: 'CSE', password: '', confirm: '' });
  const [errs, setErrs] = useState({});
  const nav = useNavigate();
  if (user) return <Navigate to="/" replace />;
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (f.name.trim().length < 3) er.name = 'Enter your full name (min 3 characters).';
    if (!isEmail(f.email)) er.email = 'Enter a valid email address.';
    if (f.password.length < 6) er.password = 'Password must be at least 6 characters.';
    if (f.confirm !== f.password) er.confirm = 'Passwords do not match.';
    if (!Object.keys(er).length) { const m = register(f); if (m) er.email = m; else return nav('/profile', { replace: true }); }
    setErrs(er);
  };

  return (
    <div className="auth">
      <div className="auth-art"><h1>🎓 PlaceHub</h1><p>Create your student account and start applying to campus drives today.</p></div>
      <form className="auth-card" onSubmit={submit} noValidate>
        <h2>Create account</h2><p className="muted">It takes less than a minute.</p>
        <Field label="Full name" value={f.name} error={errs.name} onChange={set('name')} />
        <Field label="College email" type="email" value={f.email} error={errs.email} onChange={set('email')} />
        <label className="field"><span>Department</span>
          <select value={f.department} onChange={set('department')}>{['CSE', 'IT', 'ECE', 'EEE', 'Mech'].map((d) => <option key={d}>{d}</option>)}</select>
        </label>
        <Field label="Password" type="password" value={f.password} error={errs.password} onChange={set('password')} />
        <Field label="Confirm password" type="password" value={f.confirm} error={errs.confirm} onChange={set('confirm')} />
        <button className="btn block">Create account</button>
        <p className="muted center">Already registered? <Link to="/login">Log in</Link></p>
      </form>
    </div>
  );
}
