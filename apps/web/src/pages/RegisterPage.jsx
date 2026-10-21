import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AgeGroups from '../components/AgeGroups.jsx';
import { NETWORK, LEAGUES } from '../data/leagues.js';
import {
  AGE_OPTIONS,
  TEAM_TYPES,
  POSITIONS,
  isYouth,
  genderOptions,
  trackingFor,
} from '../data/divisions.js';

const selectClass =
  'w-full h-10 rounded-md border border-input bg-[hsl(var(--true-white))] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]';

const MODES = [
  {
    id: 'team',
    label: 'Register a team',
    desc: 'Schools, clubs, nonprofits, churches, workplaces or friends. Any futsal team is welcome.',
    points: ['Any team type', 'Pick an age group and division', 'Coed encouraged U6–U10'],
  },
  {
    id: 'free-agent',
    label: 'Free agent',
    desc: 'No team yet? Sign up as an individual and we will place you on a team that needs players.',
    points: ['Players of any age group', 'Tell us your position', 'We match you to a team'],
  },
];

const STEPS = [
  { num: '1', title: 'Choose team or free agent', desc: 'Teams sign up once. Players without a team sign up as free agents.' },
  { num: '2', title: 'Fill out the form', desc: 'Age group, division, contact info and the basics about your team or player.' },
  { num: '3', title: 'We confirm', desc: 'We email you your division, league, venue and next steps.' },
  { num: '4', title: 'Play', desc: 'Match days run at the host venues. Standings and stats are posted by age group.' },
];

const FAQS = [
  { q: 'What kind of teams can register?', a: 'Any futsal team: school teams, clubs, nonprofits, community and faith groups, workplaces, or a group of friends.' },
  { q: 'Can I register more than one team?', a: 'Yes. Submit the form once per team and age group.' },
  { q: 'What is U6 like?', a: 'U6 is non-competitive. It is 4v4 with no goalkeeper, and there are no standings.' },
  { q: 'Can girls and boys play together?', a: 'Coed teams are encouraged from U6 to U10. Your team decides whether it is comfortable playing coed. From U11 up, divisions are boys or girls, men or women.' },
  { q: 'What is a free agent?', a: 'A player without a team. Register as a free agent and we will place you on a team that needs players in your age group and division.' },
  { q: 'Are standings and stats posted?', a: 'U7 to U12 get standings. U13 and U14 get standings plus team stats. U15 to U18 get player, team and match stats.' },
];

function FieldBlock({ label, htmlFor, hint, children }) {
  return (
    <div>
      <Label htmlFor={htmlFor}>{label}</Label>
      <div className="mt-1">{children}</div>
      {hint && <p className="text-xs text-[hsl(var(--gray))] mt-1 mb-0">{hint}</p>}
    </div>
  );
}

function Fieldset({ legend, children }) {
  return (
    <fieldset className="p-6 md:p-8 border-0 border-b border-[hsl(var(--table-border))] m-0">
      <legend className="font-['Bebas_Neue'] text-2xl tracking-wide text-[hsl(var(--primary))] p-0 mb-4">{legend}</legend>
      <div className="space-y-5">{children}</div>
    </fieldset>
  );
}

function DivisionFields({ group, setGroup, gender, setGender }) {
  const options = genderOptions(group);
  const tracking = trackingFor(group);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FieldBlock label="Age group" htmlFor="ageGroup">
          <select
            id="ageGroup"
            name="age_group"
            required
            className={selectClass}
            value={group}
            onChange={(e) => {
              setGroup(e.target.value);
              setGender('');
            }}
          >
            <option value="">Select</option>
            {AGE_OPTIONS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </FieldBlock>
        <FieldBlock
          label="Division"
          htmlFor="division"
          hint={group && options.includes('Coed') ? 'Coed is encouraged in this age group if your team is comfortable with it.' : undefined}
        >
          <select
            id="division"
            name="division"
            required
            className={selectClass}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            disabled={!group}
          >
            <option value="">{group ? 'Select' : 'Choose an age group first'}</option>
            {options.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </FieldBlock>
      </div>
      {tracking && (
        <p className="text-sm text-[hsl(var(--gray))] bg-[hsl(var(--light-bg))] rounded-lg px-4 py-3 m-0">
          <strong className="text-[hsl(var(--black))]">{`${group}: ${tracking.title}.`}</strong> {tracking.text}
        </p>
      )}
    </>
  );
}

function RegistrationForm({ mode, setMode, formRef, initialLeague }) {
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [group, setGroup] = useState('');
  const [gender, setGender] = useState('');

  const isTeam = mode === 'team';
  const youth = isYouth(group);

  const reset = () => {
    setGroup('');
    setGender('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError('');
    const f = new FormData(e.target);
    const payload = Object.fromEntries(f.entries());
    payload._subject = isTeam
      ? `Team registration: ${payload.team_name} (${payload.age_group} ${payload.division})`
      : `Free agent: ${payload.player_name} (${payload.age_group} ${payload.division})`;
    payload.registration_type = isTeam ? 'Team' : 'Free agent';
    payload.site = NETWORK.name;
    try {
      const res = await fetch(NETWORK.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('failed');
      setDone(true);
      toast.success('Registration received!', { description: 'We will email you next steps.' });
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch {
      setError('We could not send your registration. Check your connection and try again.');
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div ref={formRef} className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] p-8 md:p-12 text-center">
        <h3 className="text-4xl text-[hsl(var(--black))] mb-3">YOU'RE REGISTERED</h3>
        <p className="text-[hsl(var(--gray))] max-w-md mx-auto mb-6">
          We got your {isTeam ? 'team' : 'free agent'} registration. Check your email for your division and next steps.
        </p>
        <Button
          type="button"
          onClick={() => {
            setDone(false);
            reset();
          }}
          className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white font-bold uppercase tracking-wider"
        >
          Register another {isTeam ? 'team' : 'player'}
        </Button>
      </div>
    );
  }

  return (
    <div ref={formRef} className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] overflow-hidden scroll-mt-28">
      <div className="p-6 md:p-8 border-b border-[hsl(var(--table-border))] flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-3xl text-[hsl(var(--black))] m-0">REGISTRATION</h3>
        <div role="tablist" aria-label="Registration type" className="inline-flex rounded-lg border border-[hsl(var(--black))] overflow-hidden">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={m.id === mode}
              onClick={() => {
                setMode(m.id);
                reset();
              }}
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wider font-['Barlow_Condensed'] ${
                m.id === mode ? 'bg-[hsl(var(--black))] text-white' : 'bg-transparent text-[hsl(var(--black))]'
              }`}
            >
              {m.id === 'team' ? 'Team' : 'Free agent'}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} key={mode}>
        {/* Hidden honeypot for bots */}
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />

        {isTeam ? (
          <>
            <Fieldset legend="Team">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FieldBlock label="Team name" htmlFor="team_name">
                  <Input id="team_name" name="team_name" required />
                </FieldBlock>
                <FieldBlock label="Team type" htmlFor="team_type">
                  <select id="team_type" name="team_type" required className={selectClass} defaultValue="">
                    <option value="">Select</option>
                    {TEAM_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </FieldBlock>
              </div>
              <FieldBlock label="School, club or organization (if any)" htmlFor="organization">
                <Input id="organization" name="organization" />
              </FieldBlock>
              <DivisionFields group={group} setGroup={setGroup} gender={gender} setGender={setGender} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FieldBlock label="League" htmlFor="league" hint="Pick the area closest to you, or leave it for us to place.">
                  <select id="league" name="league" className={selectClass} defaultValue={initialLeague}>
                    <option value="">Not sure yet</option>
                    {LEAGUES.map((l) => (
                      <option key={l.slug} value={l.name}>{l.name}</option>
                    ))}
                  </select>
                </FieldBlock>
                <FieldBlock label="Players on your roster (estimate)" htmlFor="roster_size">
                  <Input id="roster_size" name="roster_size" type="number" min="1" max="40" inputMode="numeric" />
                </FieldBlock>
              </div>
            </Fieldset>

            <Fieldset legend="Coach / team contact">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FieldBlock label="Full name" htmlFor="contact_name">
                  <Input id="contact_name" name="contact_name" required autoComplete="name" />
                </FieldBlock>
                <FieldBlock label="Phone" htmlFor="contact_phone">
                  <Input id="contact_phone" name="contact_phone" type="tel" required autoComplete="tel" />
                </FieldBlock>
              </div>
              <FieldBlock label="Email" htmlFor="email">
                <Input id="email" name="email" type="email" required autoComplete="email" />
              </FieldBlock>
              <FieldBlock label="Anything else we should know?" htmlFor="notes">
                <Textarea id="notes" name="notes" rows={3} />
              </FieldBlock>
            </Fieldset>
          </>
        ) : (
          <>
            <Fieldset legend="Player">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FieldBlock label="Player full name" htmlFor="player_name">
                  <Input id="player_name" name="player_name" required />
                </FieldBlock>
                <FieldBlock label="Date of birth" htmlFor="dob">
                  <Input id="dob" name="date_of_birth" type="date" required />
                </FieldBlock>
              </div>
              <DivisionFields group={group} setGroup={setGroup} gender={gender} setGender={setGender} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FieldBlock
                  label="Position"
                  htmlFor="position"
                  hint={group === 'U6' ? 'U6 is 4v4 with no goalkeeper.' : undefined}
                >
                  <select id="position" name="position" required className={selectClass} defaultValue="">
                    <option value="">Select</option>
                    {POSITIONS.filter((p) => !(group === 'U6' && p !== 'Field player')).map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </FieldBlock>
                <FieldBlock label="League" htmlFor="league">
                  <select id="league" name="league" className={selectClass} defaultValue={initialLeague}>
                    <option value="">Not sure yet</option>
                    {LEAGUES.map((l) => (
                      <option key={l.slug} value={l.name}>{l.name}</option>
                    ))}
                  </select>
                </FieldBlock>
              </div>
              <FieldBlock label="Experience or notes" htmlFor="notes">
                <Textarea id="notes" name="notes" rows={3} />
              </FieldBlock>
            </Fieldset>

            <Fieldset legend={youth ? 'Parent / guardian' : 'Your contact info'}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FieldBlock label={youth ? 'Parent / guardian name' : 'Phone'} htmlFor={youth ? 'guardian_name' : 'contact_phone'}>
                  {youth ? (
                    <Input id="guardian_name" name="guardian_name" required autoComplete="name" />
                  ) : (
                    <Input id="contact_phone" name="contact_phone" type="tel" required autoComplete="tel" />
                  )}
                </FieldBlock>
                {youth && (
                  <FieldBlock label="Parent / guardian phone" htmlFor="contact_phone">
                    <Input id="contact_phone" name="contact_phone" type="tel" required autoComplete="tel" />
                  </FieldBlock>
                )}
              </div>
              <FieldBlock label="Email" htmlFor="email">
                <Input id="email" name="email" type="email" required autoComplete="email" />
              </FieldBlock>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FieldBlock label="Emergency contact name" htmlFor="emergency_name">
                  <Input id="emergency_name" name="emergency_contact_name" required />
                </FieldBlock>
                <FieldBlock label="Emergency contact phone" htmlFor="emergency_phone">
                  <Input id="emergency_phone" name="emergency_contact_phone" type="tel" required />
                </FieldBlock>
              </div>
            </Fieldset>
          </>
        )}

        <div className="p-6 md:p-8">
          {error && (
            <div role="alert" className="bg-red-50 border border-red-300 text-red-700 rounded-lg px-4 py-3 text-sm mb-4">
              {error}
            </div>
          )}
          <Button
            type="submit"
            disabled={sending}
            className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white font-bold uppercase tracking-wider"
          >
            {sending ? 'Sending…' : isTeam ? 'Register team' : 'Sign up as a free agent'}
          </Button>
          <p className="text-sm text-[hsl(var(--gray))] mt-3 mb-0">
            We will email you your division, league and venue, plus any next steps.
          </p>
        </div>
      </form>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[hsl(var(--table-border))] last:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-['Barlow_Condensed'] uppercase tracking-wider font-bold text-[hsl(var(--black))]"
      >
        {q}
        <span className="text-[hsl(var(--primary))] text-xl font-normal">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="px-5 pb-4 m-0 text-[hsl(var(--gray))]">{a}</p>}
    </div>
  );
}

function RegisterPage() {
  const [params] = useSearchParams();
  const initialMode = params.get('type') === 'free-agent' ? 'free-agent' : 'team';
  const [mode, setMode] = useState(initialMode);
  const initialLeague = LEAGUES.find((l) => l.slug === params.get('league'))?.name || '';
  const formRef = useRef(null);

  const choose = (id) => {
    setMode(id);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  return (
    <div className="pt-32 pb-24 bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>Register | {NETWORK.name}</title>
        <meta
          name="description"
          content="Register a futsal team or sign up as a free agent. School, club, nonprofit and community teams welcome, U6 to adult."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">SEASON REGISTRATION</span>
        <h1 className="text-[hsl(var(--black))] mb-4">REGISTER</h1>
        <p className="text-[hsl(var(--gray))] text-xl max-w-2xl mb-14">
          Bring your team to the court, or sign up on your own and we will find you a team. Schools, clubs, nonprofits and friends all welcome.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {MODES.map((m, i) => (
            <div
              key={m.id}
              className={`rounded-2xl p-8 flex flex-col border ${
                i === 0
                  ? 'bg-[hsl(var(--black))] border-[hsl(var(--black))] text-white'
                  : 'bg-[hsl(var(--true-white))] border-[hsl(var(--table-border))]'
              }`}
            >
              <h3 className={`text-4xl m-0 mb-2 ${i === 0 ? 'text-white' : 'text-[hsl(var(--black))]'}`}>{m.label.toUpperCase()}</h3>
              <p className={`mb-5 ${i === 0 ? 'text-white/70' : 'text-[hsl(var(--gray))]'}`}>{m.desc}</p>
              <ul className="list-none p-0 m-0 mb-8 flex-1 space-y-2">
                {m.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--primary))] shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
              <Button
                type="button"
                onClick={() => choose(m.id)}
                className={
                  i === 0
                    ? 'w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white font-bold uppercase tracking-wider'
                    : 'w-full bg-transparent border border-[hsl(var(--black))] text-[hsl(var(--black))] hover:bg-[hsl(var(--black))] hover:text-white font-bold uppercase tracking-wider'
                }
              >
                {m.id === 'team' ? 'Register a team' : 'Sign up as a free agent'}
              </Button>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <RegistrationForm mode={mode} setMode={setMode} formRef={formRef} initialLeague={initialLeague} />
        </div>

        <div className="mb-20">
          <AgeGroups />
        </div>

        <div className="mb-20">
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">HOW IT WORKS</span>
          <h2 className="text-[hsl(var(--black))] mb-8">FOUR STEPS</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 list-none p-0 m-0">
            {STEPS.map((s) => (
              <li key={s.num} className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] p-6">
                <div className="font-['Bebas_Neue'] text-4xl text-[hsl(var(--primary))] leading-none mb-2">{s.num}</div>
                <h3 className="text-xl text-[hsl(var(--black))] m-0 mb-2">{s.title.toUpperCase()}</h3>
                <p className="text-[hsl(var(--gray))] text-sm m-0">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">COMMON QUESTIONS</span>
          <h2 className="text-[hsl(var(--black))] mb-8">FAQ</h2>
          <div className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] overflow-hidden mb-8">
            {FAQS.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
          <p className="text-[hsl(var(--gray))]">
            Still have a question? <Link to="/contact" className="text-[hsl(var(--primary))] font-bold">Contact us</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
