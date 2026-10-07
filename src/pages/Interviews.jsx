import { useApp } from '../context/AppContext.jsx';
import { Empty, PageHeader, fmtDate } from '../components/ui.jsx';

export default function Interviews() {
  const { apps, jobs } = useApp();
  const list = apps.filter((a) => a.interview).sort((a, b) => (a.interview.date + a.interview.time).localeCompare(b.interview.date + b.interview.time));
  const now = new Date().toISOString().slice(0, 10);

  return (
    <>
      <PageHeader title="Interview schedule" sub="Be ready 15 minutes before your slot." />
      <div className="card">
        {list.length === 0 ? <Empty title="No interviews scheduled" text="Once a company schedules an interview, it will show up here." to="/applications" cta="View applications" /> :
          <div className="table-wrap"><table>
            <thead><tr><th>Date</th><th>Time</th><th>Company</th><th>Role</th><th>Mode</th><th></th></tr></thead>
            <tbody>{list.map((a) => {
              const j = jobs.find((x) => x.id === a.jobId);
              const past = a.interview.date < now;
              return (
                <tr key={a.id}>
                  <td data-l="Date"><b>{fmtDate(a.interview.date)}</b></td><td data-l="Time">{a.interview.time}</td>
                  <td data-l="Company">{j?.company}</td><td data-l="Role">{j?.title}</td><td data-l="Mode">{a.interview.mode}</td>
                  <td><span className={`badge ${past ? 'b-applied' : 'b-interview'}`}>{past ? 'Completed' : 'Upcoming'}</span></td>
                </tr>);
            })}</tbody></table></div>}
      </div>
    </>
  );
}
