import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { NETWORK, LEAGUES } from '../data/leagues.js';

const TYPES = ['Player', 'Team', 'Sponsor', 'Venue partner', 'Other'];
const selectClass =
  'w-full h-10 rounded-md border border-input bg-[hsl(var(--true-white))] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]';

function ContactPage() {
  const [params] = useSearchParams();
  const [sending, setSending] = useState(false);
  const defaultLeague = LEAGUES.find((l) => l.slug === params.get('league'))?.name || '';
  const defaultType = TYPES.includes(params.get('type')) ? params.get('type') : 'Player';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const f = e.target;
    const data = {
      site: NETWORK.name,
      name: f.name.value,
      email: f.email.value,
      iam: f.iam.value,
      league: f.league.value,
      message: f.message.value,
    };
    try {
      const res = await fetch(NETWORK.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('failed');
      toast.success('Message sent!', { description: 'We will get back to you soon.' });
      f.reset();
    } catch {
      toast.error('Something went wrong. Please try again in a minute.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>Join or Contact | {NETWORK.name}</title>
        <meta name="description" content="Join a futsal league, register a team, or become a sponsor." />
      </Helmet>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">JOIN</span>
        <h1 className="text-[hsl(var(--black))] mb-4">GET IN TOUCH</h1>
        <p className="text-[hsl(var(--gray))] text-lg mb-10">
          Players, teams, sponsors and venues: tell us what you are looking for.
        </p>

        <form onSubmit={handleSubmit} className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--table-border))] p-6 md:p-8 space-y-5">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required className="mt-1" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="iam">I am a</Label>
              <select id="iam" name="iam" defaultValue={defaultType} className={`${selectClass} mt-1`}>
                {TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="league">League</Label>
              <select id="league" name="league" defaultValue={defaultLeague} className={`${selectClass} mt-1`}>
                <option value="">Not sure yet</option>
                {LEAGUES.map((l) => (
                  <option key={l.slug} value={l.name}>{l.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" rows={5} required className="mt-1" />
          </div>
          <Button type="submit" disabled={sending} className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white font-bold uppercase tracking-wider">
            <Send className="w-4 h-4 mr-2" /> {sending ? 'Sending…' : 'Send'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
