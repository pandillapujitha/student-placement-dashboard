import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { StatCard, PageHeader, Badge, Empty, Loader, fmtDate } from '../components/ui.jsx';

export default function Dashboard() {
  const { user, apps, jobs, jobsLoading, notes } = useApp();
  const count = (s) => apps.filter((a) => a.status === s).length;
  const jobOf = (a) => jobs.find((j) => j.id === a.jobId);
  const upcoming = apps.filter((a) => a.interview).sort((a, b) => a.interview.date.localeCompare(b.interview.date)).slice(0, 3);
  const fields = ['phone', 'year', 'cgpa', 'skills', 'about'];
  const done = Math.round(((fields.filter((k) => user[k]).length + 2) / (fields.length + 2)) * 100);
  const applied = new Set(apps.map((a) => a.jobId));
  const recs = jobs.filter((j) => !applied.has(j.id)).slice(0, 3);

  return (
    <>
      <PageHeader title={`Hello, ${user.name.split(' ')[0]} 👋`} sub="Here is where your placement journey stands today." />
      <div className="grid4">
        <StatCard label="Applications" value={apps.length} icon="📄" />
        <StatCard label="Shortlisted" value={count('Shortlisted')} icon="⭐" tone="amber" />
        <StatCard label="Interviews" value={count('Interview')} icon="📅" tone="blue" />
        <StatCard label="Selected" value={count('Selected')} icon="🏆" tone="green" />
      </div>
      <div className="grid2">
        <section className="card">
          <h3>Upcoming interviews</h3>
          {upcoming.length === 0 ? <Empty title="No interviews yet" text="Interviews appear here once you are shortlisted." to="/jobs" cta="Browse jobs" /> :
            upcoming.map((a) => (
              <div className="row" key={a.id}><div><b>{jobOf(a)?.company}</b><div className="muted">{jobOf(a)?.title} · {a.interview.mode}</div></div>
                <div className="right"><b>{fmtDate(a.interview.date)}</b><div className="muted">{a.interview.time}</div></div></div>
            ))}
          <Link to="/interviews" className="link">View full schedule</Link>
        </section>
        <section className="card">
          <h3>Profile completeness</h3>
          <div className="bar"><div style={{ width: `${done}%` }} /></div>
          <p className="muted">{done}% complete{done < 100 && <> — <Link to="/profile">finish your profile</Link> to stand out to recruiters.</>}</p>
          <h3>Latest notifications</h3>
          {notes.length === 0 ? <p className="muted">You are all caught up.</p> : notes.slice(0, 3).map((n) => <div className="row" key={n.id}><span>{n.text}</span><span className="muted nowrap">{fmtDate(n.date)}</span></div>)}
        </section>
      </div>
      <section className="card">
        <h3>Recommended openings</h3>
        {jobsLoading ? <Loader /> : recs.length === 0 ? <p className="muted">You have applied to every open role.</p> : recs.map((j) => (
          <div className="row" key={j.id}><div><b>{j.title}</b><div className="muted">{j.company} · {j.location}</div></div>
            <Link className="btn sm" to={`/jobs/${j.id}`}>View</Link></div>
        ))}
        <h3 className="mt">Recent applications</h3>
        {apps.length === 0 ? <p className="muted">No applications yet.</p> : apps.slice(0, 3).map((a) => (
          <div className="row" key={a.id}><span>{jobOf(a)?.title} · {jobOf(a)?.company}</span><Badge status={a.status} /></div>
        ))}
      </section>
    </>
  );
}
