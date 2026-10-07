import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { fetchJobs, sampleJobs } from '../services/api.js';
import { demoUser, demoData } from '../data/seed.js';

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const today = () => new Date().toISOString().slice(0, 10);
const uid = () => Math.random().toString(36).slice(2, 9);
const NEXT = { Applied: 'Shortlisted', Shortlisted: 'Interview', Interview: 'Selected' };

function ensureDemo() {
  const users = read('spd_users', []);
  if (!users.some((u) => u.email === demoUser.email)) write('spd_users', [...users, demoUser]);
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => { ensureDemo(); return read('spd_session', null); });
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState('');
  const [data, setData] = useState({ apps: [], notes: [] });

  const key = user ? `spd_data_${user.email}` : null;

  const loadJobs = useCallback(async () => {
    setJobsLoading(true); setJobsError('');
    try { setJobs(await fetchJobs()); }
    catch (e) { setJobs(sampleJobs()); setJobsError(e.message || 'Could not reach the job service'); }
    finally { setJobsLoading(false); }
  }, []);

  useEffect(() => { loadJobs(); }, [loadJobs]);

  useEffect(() => {
    if (!user) return setData({ apps: [], notes: [] });
    const saved = read(`spd_data_${user.email}`, null);
    setData(saved || (user.email === demoUser.email ? demoData()
      : { apps: [], notes: [{ id: uid(), text: 'Welcome to PlaceHub! Complete your profile to get started.', date: today(), read: false }] }));
  }, [user?.email]); // eslint-disable-line

  const update = (fn) => setData((d) => { const n = fn(d); if (key) write(key, n); return n; });
  const addNote = (d, text) => ({ ...d, notes: [{ id: uid(), text, date: today(), read: false }, ...d.notes] });

  // ---- auth ----
  const login = (email, password) => {
    const u = read('spd_users', []).find((x) => x.email === email.toLowerCase() && x.password === password);
    if (!u) return 'Incorrect email or password.';
    write('spd_session', u); setUser(u); return null;
  };
  const register = (form) => {
    const users = read('spd_users', []);
    const email = form.email.toLowerCase();
    if (users.some((u) => u.email === email)) return 'An account with this email already exists.';
    const u = { ...form, email, phone: '', year: '', cgpa: '', skills: '', about: '' };
    delete u.confirm; write('spd_users', [...users, u]); write('spd_session', u); setUser(u); return null;
  };
  const logout = () => { localStorage.removeItem('spd_session'); setUser(null); };
  const updateProfile = (p) => {
    const u = { ...user, ...p };
    write('spd_users', read('spd_users', []).map((x) => (x.email === u.email ? u : x)));
    write('spd_session', u); setUser(u);
  };

  // ---- applications ----
  const apply = (job) => update((d) => d.apps.some((a) => a.jobId === job.id) ? d
    : addNote({ ...d, apps: [{ id: uid(), jobId: job.id, status: 'Applied', date: today() }, ...d.apps] }, `Application submitted for ${job.title} at ${job.company}.`));

  // Demo helper: simulates the recruiter moving an application forward / rejecting it
  const advance = (appId, reject = false) => update((d) => {
    const a = d.apps.find((x) => x.id === appId); if (!a) return d;
    const job = jobs.find((j) => j.id === a.jobId);
    const status = reject ? 'Rejected' : NEXT[a.status]; if (!status) return d;
    const next = { ...a, status };
    if (status === 'Interview') {
      const dt = new Date(); dt.setDate(dt.getDate() + 4);
      next.interview = { date: dt.toISOString().slice(0, 10), time: '11:00', mode: 'Online (Google Meet)' };
    }
    return addNote({ ...d, apps: d.apps.map((x) => (x.id === appId ? next : x)) }, `${job?.company || 'A company'} updated your ${job?.title || ''} application to "${status}".`);
  });

  // ---- notifications ----
  const markRead = (id) => update((d) => ({ ...d, notes: d.notes.map((n) => (n.id === id ? { ...n, read: true } : n)) }));
  const markAllRead = () => update((d) => ({ ...d, notes: d.notes.map((n) => ({ ...n, read: true })) }));
  const clearNotes = () => update((d) => ({ ...d, notes: [] }));

  const value = { user, login, register, logout, updateProfile, jobs, jobsLoading, jobsError, loadJobs,
    apps: data.apps, notes: data.notes, apply, advance, markRead, markAllRead, clearNotes };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
