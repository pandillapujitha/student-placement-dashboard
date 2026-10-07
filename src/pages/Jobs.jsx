import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { PageHeader, Loader, ErrorBanner, Empty } from '../components/ui.jsx';

export default function Jobs() {
  const { jobs, jobsLoading, jobsError, loadJobs, apps } = useApp();
  const [q, setQ] = useState('');
  const [type, setType] = useState('All');
  const [loc, setLoc] = useState('All');
  const [cat, setCat] = useState('All');
  const uniq = (k) => ['All', ...new Set(jobs.map((j) => j[k]))];
  const list = jobs.filter((j) => (type === 'All' || j.type === type) && (loc === 'All' || j.location === loc) && (cat === 'All' || j.category === cat)
    && `${j.title} ${j.company} ${j.skills.join(' ')}`.toLowerCase().includes(q.toLowerCase()));
  const reset = () => { setQ(''); setType('All'); setLoc('All'); setCat('All'); };

  return (
    <>
      <PageHeader title="Job openings" sub={`${jobs.length} companies are hiring on campus.`} />
      {jobsError && <ErrorBanner message={jobsError} onRetry={loadJobs} />}
      <div className="card filters">
        <input type="search" placeholder="Search role, company or skill…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search jobs" />
        {[['Type', type, setType, 'type'], ['Location', loc, setLoc, 'location'], ['Category', cat, setCat, 'category']].map(([l, v, s, k]) => (
          <select key={l} value={v} onChange={(e) => s(e.target.value)} aria-label={l}>{uniq(k).map((o) => <option key={o} value={o}>{o === 'All' ? `All ${l.toLowerCase()}s` : o}</option>)}</select>
        ))}
      </div>
      {jobsLoading ? <Loader text="Loading job openings…" /> : list.length === 0 ?
        <div className="card"><Empty title="No jobs match your filters" text="Try a different keyword or clear the filters." /><div className="center"><button className="btn" onClick={reset}>Clear filters</button></div></div> :
        <div className="grid3">
          {list.map((j) => (
            <article className="card job" key={j.id}>
              <div className="logo">{j.company[0]}</div>
              <h3>{j.title}</h3><div className="muted">{j.company}</div>
              <div className="tags"><span>{j.location}</span><span>{j.type}</span><span>₹{j.package} LPA</span></div>
              <div className="tags">{j.skills.map((s) => <span className="skill" key={s}>{s}</span>)}</div>
              <div className="job-foot"><small className="muted">Apply by {j.deadline}</small>
                {apps.some((a) => a.jobId === j.id) ? <span className="ok">✓ Applied</span> : <Link to={`/jobs/${j.id}`} className="btn sm">View & apply</Link>}</div>
            </article>
          ))}
        </div>}
    </>
  );
}
