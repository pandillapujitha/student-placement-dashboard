import { Link } from 'react-router-dom';

export const Badge = ({ status }) => <span className={`badge b-${status.toLowerCase()}`}>{status}</span>;

export const PageHeader = ({ title, sub, children }) => (
  <div className="page-head"><div><h1>{title}</h1>{sub && <p className="muted">{sub}</p>}</div><div>{children}</div></div>
);

export const Loader = ({ text = 'Loading…' }) => <div className="state"><div className="spinner" />{text}</div>;

export const ErrorBanner = ({ message, onRetry }) => (
  <div className="banner" role="alert">
    <span>⚠ {message}. Showing sample data instead.</span>
    {onRetry && <button className="btn sm" onClick={onRetry}>Retry</button>}
  </div>
);

export const Empty = ({ title, text, to, cta }) => (
  <div className="state"><h3>{title}</h3><p className="muted">{text}</p>{to && <Link className="btn" to={to}>{cta}</Link>}</div>
);

export const StatCard = ({ label, value, icon, tone = 'teal' }) => (
  <div className={`card stat t-${tone}`}><span className="stat-icon">{icon}</span><div><div className="stat-val">{value}</div><div className="muted">{label}</div></div></div>
);

export const Field = ({ label, error, as, ...props }) => (
  <label className="field"><span>{label}</span>
    {as === 'textarea' ? <textarea rows="3" {...props} /> : <input {...props} />}
    {error && <small className="err">{error}</small>}
  </label>
);

export const fmtDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
