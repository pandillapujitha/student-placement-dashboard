import { useApp } from '../context/AppContext.jsx';
import { Empty, PageHeader, fmtDate } from '../components/ui.jsx';

export default function Notifications() {
  const { notes, markRead, markAllRead, clearNotes } = useApp();
  return (
    <>
      <PageHeader title="Notifications" sub={`${notes.filter((n) => !n.read).length} unread`}>
        <button className="btn ghost sm" onClick={markAllRead} disabled={!notes.length}>Mark all read</button>{' '}
        <button className="btn ghost sm" onClick={clearNotes} disabled={!notes.length}>Clear all</button>
      </PageHeader>
      <div className="card">
        {notes.length === 0 ? <Empty title="You are all caught up" text="New updates about your applications will show here." /> :
          notes.map((n) => (
            <div key={n.id} className={`row note ${n.read ? '' : 'unread'}`} onClick={() => markRead(n.id)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && markRead(n.id)}>
              <span>{!n.read && <i className="dot" />}{n.text}</span><span className="muted nowrap">{fmtDate(n.date)}</span>
            </div>))}
      </div>
    </>
  );
}
