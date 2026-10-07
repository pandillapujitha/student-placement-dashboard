import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { Field, PageHeader, isEmail } from '../components/ui.jsx';

export default function Profile() {
  const { user, updateProfile } = useApp();
  const [f, setF] = useState(user);
  const [errs, setErrs] = useState({});
  const [saved, setSaved] = useState(false);
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setSaved(false); };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (f.name.trim().length < 3) er.name = 'Name must be at least 3 characters.';
    if (!isEmail(f.email)) er.email = 'Enter a valid email.';
    if (f.phone && !/^\d{10}$/.test(f.phone)) er.phone = 'Phone must be 10 digits.';
    if (f.cgpa && !(Number(f.cgpa) >= 0 && Number(f.cgpa) <= 10)) er.cgpa = 'CGPA must be between 0 and 10.';
    if (f.year && !/^20\d\d$/.test(f.year)) er.year = 'Enter a year like 2026.';
    setErrs(er);
    if (!Object.keys(er).length) { updateProfile(f); setSaved(true); }
  };

  return (
    <>
      <PageHeader title="My profile" sub="Recruiters see these details when you apply." />
      <form className="card form-grid" onSubmit={submit} noValidate>
        <Field label="Full name" value={f.name} error={errs.name} onChange={set('name')} />
        <Field label="Email" value={f.email} disabled />
        <Field label="Phone" value={f.phone} error={errs.phone} onChange={set('phone')} placeholder="10-digit number" />
        <label className="field"><span>Department</span>
          <select value={f.department} onChange={set('department')}>{['CSE', 'IT', 'ECE', 'EEE', 'Mech'].map((d) => <option key={d}>{d}</option>)}</select>
        </label>
        <Field label="Graduation year" value={f.year} error={errs.year} onChange={set('year')} placeholder="2026" />
        <Field label="CGPA" value={f.cgpa} error={errs.cgpa} onChange={set('cgpa')} placeholder="8.4" />
        <div className="span2"><Field label="Skills (comma separated)" value={f.skills} onChange={set('skills')} /></div>
        <div className="span2"><Field as="textarea" label="About me" value={f.about} onChange={set('about')} /></div>
        <div className="span2 actions"><button className="btn">Save changes</button>{saved && <span className="ok">✓ Profile saved</span>}</div>
      </form>
    </>
  );
}
