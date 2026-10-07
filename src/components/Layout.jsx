import { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

const links = [
  ['/', 'Dashboard', '▦'], ['/jobs', 'Job openings', '💼'], ['/applications', 'My applications', '📄'],
  ['/interviews', 'Interviews', '📅'], ['/statistics', 'Statistics', '📊'],
  ['/notifications', 'Notifications', '🔔'], ['/profile', 'My profile', '👤'],
];

export default function Layout() {
  const { user, logout, notes } = useApp();
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const unread = notes.filter((n) => !n.read).length;
  const initials = user.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div className="shell">
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">🎓 PlaceHub</div>
        <nav onClick={() => setOpen(false)}>
          {links.map(([to, label, icon]) => (
            <NavLink key={to} to={to} end={to === '/'} className="navlink">
              <span aria-hidden>{icon}</span>{label}
              {to === '/notifications' && unread > 0 && <b className="pill">{unread}</b>}
            </NavLink>
          ))}
        </nav>
        <button className="navlink logout" onClick={() => { logout(); nav('/login'); }}>⎋ Log out</button>
      </aside>
      {open && <div className="scrim" onClick={() => setOpen(false)} />}
      <div className="main">
        <header className="topbar">
          <button className="menu" aria-label="Open menu" onClick={() => setOpen(true)}>☰</button>
          <div className="spacer" />
          <Link to="/notifications" className="bell" aria-label="Notifications">🔔{unread > 0 && <b className="pill">{unread}</b>}</Link>
          <Link to="/profile" className="me"><span className="avatar">{initials}</span><span className="hide-sm">{user.name}</span></Link>
        </header>
        <main className="content"><Outlet /></main>
      </div>
    </div>
  );
}
