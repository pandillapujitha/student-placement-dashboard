// Sample data used where the public API has nothing suitable (jobs are built from
// JSONPlaceholder companies + these role templates; stats/demo user are local).
export const STATUSES = ['Applied', 'Shortlisted', 'Interview', 'Selected', 'Rejected'];

export const roleTemplates = [
  { title: 'Software Engineer', pkg: 12, loc: 'Bengaluru', type: 'Full-time', cat: 'Engineering', skills: ['React', 'Node.js', 'SQL'] },
  { title: 'Data Analyst', pkg: 8, loc: 'Chennai', type: 'Full-time', cat: 'Data', skills: ['Python', 'SQL', 'Power BI'] },
  { title: 'Frontend Developer Intern', pkg: 3, loc: 'Remote', type: 'Internship', cat: 'Engineering', skills: ['HTML', 'CSS', 'React'] },
  { title: 'Cloud Support Associate', pkg: 6, loc: 'Hyderabad', type: 'Full-time', cat: 'Infrastructure', skills: ['AWS', 'Linux', 'Networking'] },
  { title: 'QA Automation Engineer', pkg: 7, loc: 'Pune', type: 'Full-time', cat: 'Engineering', skills: ['Selenium', 'Java', 'CI/CD'] },
  { title: 'Machine Learning Trainee', pkg: 9, loc: 'Bengaluru', type: 'Full-time', cat: 'Data', skills: ['Python', 'TensorFlow', 'Statistics'] },
  { title: 'Business Analyst', pkg: 7, loc: 'Chennai', type: 'Full-time', cat: 'Business', skills: ['Excel', 'Communication', 'SQL'] },
  { title: 'DevOps Intern', pkg: 4, loc: 'Remote', type: 'Internship', cat: 'Infrastructure', skills: ['Docker', 'Git', 'Linux'] },
  { title: 'Full Stack Developer', pkg: 14, loc: 'Hyderabad', type: 'Full-time', cat: 'Engineering', skills: ['React', 'Express', 'MongoDB'] },
  { title: 'Product Associate', pkg: 10, loc: 'Pune', type: 'Full-time', cat: 'Business', skills: ['Analytics', 'Figma', 'Communication'] },
];

export const fallbackCompanies = ['Romaguera-Crona', 'Deckow-Crist', 'Romaguera-Jacobson', 'Robel-Corkery', 'Keebler LLC', 'Considine-Lockman', 'Johns Group', 'Abernathy Group', 'Yost and Sons', 'Hoeger LLC'];

export const stats = {
  totals: { students: 480, placed: 412, companies: 64, highest: 42, average: 7.8 },
  byDept: [
    { dept: 'CSE', placed: 118, total: 125 }, { dept: 'IT', placed: 96, total: 105 },
    { dept: 'ECE', placed: 88, total: 105 }, { dept: 'EEE', placed: 62, total: 75 },
    { dept: 'Mech', placed: 48, total: 70 },
  ],
  byYear: [
    { year: '2021', rate: 71 }, { year: '2022', rate: 76 }, { year: '2023', rate: 80 },
    { year: '2024', rate: 83 }, { year: '2025', rate: 86 },
  ],
  packages: [
    { name: '< 5 LPA', value: 98 }, { name: '5–8 LPA', value: 172 },
    { name: '8–12 LPA', value: 96 }, { name: '12+ LPA', value: 46 },
  ],
};

export const demoUser = {
  name: 'Aarav Kumar', email: 'demo@college.edu', password: 'demo123', phone: '9876543210',
  department: 'CSE', year: '2026', cgpa: '8.4', skills: 'React, JavaScript, Python, SQL',
  about: 'Final-year CSE student focused on web development and data-driven products.',
};

const iso = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };

export const demoData = () => ({
  apps: [
    { id: 'a1', jobId: 1, status: 'Interview', date: iso(-9), interview: { date: iso(3), time: '10:30', mode: 'Online (Google Meet)' } },
    { id: 'a2', jobId: 2, status: 'Shortlisted', date: iso(-6) },
    { id: 'a3', jobId: 9, status: 'Interview', date: iso(-8), interview: { date: iso(6), time: '14:00', mode: 'On campus – Block C' } },
    { id: 'a4', jobId: 7, status: 'Selected', date: iso(-20) },
    { id: 'a5', jobId: 4, status: 'Rejected', date: iso(-15) },
    { id: 'a6', jobId: 3, status: 'Applied', date: iso(-2) },
  ],
  notes: [
    { id: 'n1', text: 'Interview scheduled with Romaguera-Crona in 3 days.', date: iso(-1), read: false },
    { id: 'n2', text: 'You have been shortlisted for Data Analyst.', date: iso(-2), read: false },
    { id: 'n3', text: 'Congratulations! You were selected for Business Analyst.', date: iso(-5), read: true },
  ],
});
