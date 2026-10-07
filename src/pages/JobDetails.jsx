import { Link, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { Badge, Empty, Loader, fmtDate } from '../components/ui.jsx';

export default function JobDetails() {
  const { id } = useParams();
  const { jobs, jobsLoading, apps, apply } = useApp();
  if (jobsLoading) return <Loader />;
  const job = jobs.find((j) => j.id === Number(id));
  if (!job) return <div className="card"><Empty title="Job not found" text="This opening may have been removed." to="/jobs" cta="Back to jobs" /></div>;
  const app = apps.find((a) => a.jobId === job.id);

  return (
    <>
      <Link to="/jobs" className="link">← Back to openings</Link>
      <div className="grid-detail">
        <section className="card">
          <div className="logo big">{job.company[0]}</div>
          <h1>{job.title}</h1><p className="muted">{job.company} · {job.location} · {job.type}</p>
          <h3>About the role</h3><p>{job.description}</p>
          <h3>Eligibility</h3><p>{job.eligibility}</p>
          <h3>Skills required</h3><div className="tags">{job.skills.map((s) => <span className="skill" key={s}>{s}</span>)}</div>
          <h3>Selection process</h3><ol>{job.rounds.map((r) => <li key={r}>{r}</li>)}</ol>
        </section>
        <aside className="card sticky">
          <div className="stat-val">₹{job.package} LPA</div><p className="muted">Annual package</p>
          <div className="row"><span>Openings</span><b>{job.openings}</b></div>
          <div className="row"><span>Deadline</span><b>{fmtDate(job.deadline)}</b></div>
          {app ? <div className="center"><p>Your application status</p><Badge status={app.status} /><Link to="/applications" className="link">Track application</Link></div>
            : <button className="btn block" onClick={() => apply(job)}>Apply now</button>}
        </aside>
      </div>
    </>
  );
}
