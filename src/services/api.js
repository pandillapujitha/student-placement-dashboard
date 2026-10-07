import { roleTemplates, fallbackCompanies } from '../data/seed.js';

const API = 'https://jsonplaceholder.typicode.com/users';
const deadline = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };

function buildJob(company, tagline, i) {
  const t = roleTemplates[i % roleTemplates.length];
  return {
    id: i + 1, company, title: t.title, location: t.loc, type: t.type, category: t.cat,
    package: t.pkg, skills: t.skills, deadline: deadline(5 + i * 4), openings: 3 + (i % 4) * 2,
    description: `${company} is hiring a ${t.title}. Our focus: "${tagline}". You will work with a small team, ship real features and learn from senior mentors.`,
    eligibility: `Minimum CGPA ${6 + (i % 3) * 0.5}, no active backlogs, strong fundamentals in ${t.skills[0]}.`,
    rounds: ['Online assessment', 'Technical interview', 'HR interview'],
  };
}

export const sampleJobs = () => fallbackCompanies.map((c, i) => buildJob(c, 'Practical solutions for growing teams', i));

// Public mock API: company names come from JSONPlaceholder users.
export async function fetchJobs() {
  const res = await fetch(API);
  if (!res.ok) throw new Error(`Job service responded with ${res.status}`);
  const users = await res.json();
  return users.map((u, i) => buildJob(u.company.name, u.company.catchPhrase, i));
}
