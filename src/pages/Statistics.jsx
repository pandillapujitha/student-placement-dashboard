import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { stats } from '../data/seed.js';
import { useApp } from '../context/AppContext.jsx';
import { PageHeader, StatCard } from '../components/ui.jsx';

const COLORS = ['#0f766e', '#f59e0b', '#2563eb', '#16a34a', '#dc2626'];
const Chart = ({ title, children }) => <section className="card"><h3>{title}</h3><div className="chart"><ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer></div></section>;

export default function Statistics() {
  const { apps } = useApp();
  const t = stats.totals;
  const mine = ['Applied', 'Shortlisted', 'Interview', 'Selected', 'Rejected'].map((s) => ({ name: s, value: apps.filter((a) => a.status === s).length })).filter((d) => d.value);

  return (
    <>
      <PageHeader title="Placement statistics" sub="Campus-wide results for the current batch (sample data)." />
      <div className="grid4">
        <StatCard label="Students placed" value={`${t.placed}/${t.students}`} icon="🎓" />
        <StatCard label="Recruiting companies" value={t.companies} icon="🏢" tone="blue" />
        <StatCard label="Highest package" value={`₹${t.highest} LPA`} icon="🚀" tone="amber" />
        <StatCard label="Average package" value={`₹${t.average} LPA`} icon="💰" tone="green" />
      </div>
      <div className="grid2">
        <Chart title="Department-wise placements">
          <BarChart data={stats.byDept}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="dept" /><YAxis /><Tooltip /><Legend />
            <Bar dataKey="total" name="Students" fill="#cbd5e1" radius={[4, 4, 0, 0]} /><Bar dataKey="placed" name="Placed" fill="#0f766e" radius={[4, 4, 0, 0]} /></BarChart>
        </Chart>
        <Chart title="Placement rate by year (%)">
          <LineChart data={stats.byYear}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="year" /><YAxis domain={[60, 100]} /><Tooltip />
            <Line type="monotone" dataKey="rate" name="Placement %" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} /></LineChart>
        </Chart>
        <Chart title="Package distribution">
          <PieChart><Pie data={stats.packages} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={2}>{stats.packages.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}</Pie><Tooltip /><Legend /></PieChart>
        </Chart>
        <Chart title="Your application status">
          {mine.length ? <PieChart><Pie data={mine} dataKey="value" nameKey="name" outerRadius={95} label>{mine.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}</Pie><Tooltip /><Legend /></PieChart>
            : <div className="state">Apply to jobs to see your chart.</div>}
        </Chart>
      </div>
    </>
  );
}
