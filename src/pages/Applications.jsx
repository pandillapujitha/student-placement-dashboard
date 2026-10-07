import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { STATUSES } from '../data/seed.js';
import { Badge, Empty, PageHeader, fmtDate } from '../components/ui.jsx';

export default function Applications() {
  const { apps, jobs, advance } = useApp();
  const [tab, setTab] = useState('All');
  const list = apps.filter((a) => tab === 'All' || a.status === tab);

  return (
    <>
      <PageHeader title="My applications" sub="Track every application from applied to offer." />
      <div className="tabs">
        {['All', ...STATUSES].map((s) => (
          <button key={s} className={tab === s ? 'on' : ''} onClick={() => setTab(s)}>{s} <small>{s === 'All' ? apps.length : apps.filter((a) => a.status === s).length}</small></button>
        ))}
      </div>
      <div className="card">
        {list.length === 0 ? <Empty title="Nothing here yet" text={apps.length ? 'No applications with this status.' : 'Apply to an opening to start tracking it.'} to="/jobs" cta="Browse jobs" /> :
          <div className="table-wrap"><table>
            <thead><tr><th>Company</th><th>Role</th><th>Applied on</th><th>Status</th><th>Demo controls</th></tr></thead>
            <tbody>{list.map((a) => {
              const j = jobs.find((x) => x.id === a.jobId);
              const open = !['Selected', 'Rejected'].includes(a.status);
              return (
                <tr key={a.id}>
                  <td data-l="Company"><b>{j?.company}</b></td>
                  <td data-l="Role"><Link to={`/jobs/${a.jobId}`}>{j?.title}</Link></td>
                  <td data-l="Applied on">{fmtDate(a.date)}</td>
                  <td data-l="Status"><Badge status={a.status} /></td>
                  <td data-l="Demo">{open ? <><button className="btn sm" onClick={() => advance(a.id)}>Advance</button> <button className="btn sm ghost" onClick={() => advance(a.id, true)}>Reject</button></> : <span className="muted">Closed</span>}</td>
                </tr>);
            })}</tbody></table></div>}
      </div>
      <p className="muted">Demo controls simulate a recruiter updating your status, since there is no backend.</p>
    </>
  );
}
