// Sends a registration straight into FedOS (Option 3: our own form, FedOS API behind it).
// No sign-in needed. The anon key below is FedOS's PUBLIC key and is safe in site code.
// To point at a different project, set VITE_FEDOS_URL and VITE_FEDOS_ANON_KEY in the site's environment.
const env = (typeof import.meta !== 'undefined' && import.meta.env) || {};

const FEDOS_URL = (env.VITE_FEDOS_URL || 'https://fevsslhhaaapplmrnclz.supabase.co').replace(/\/$/, '');
const FEDOS_ANON_KEY =
  env.VITE_FEDOS_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZldnNzbGhoYWFhcHBsbXJuY2x6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI4NTk0NDEsImV4cCI6MjEwODQzNTQ0MX0.QPkp21DQ-VH7YpPHCJOOLhSxNnCwoj7F6IipMWn-jAM';

/**
 * Submit a registration to the FedOS league with this slug (e.g. "chicago-futsal-league").
 *
 * formData = {
 *   guardian: { name, email, phone, emergency_name, emergency_phone },   // name + email required
 *   players:  [{ name, dob: "YYYY-MM-DD", ...anything else }],           // 1 to 10, name + dob required
 *   plan:     "text",
 *   website:  ""                                                         // spam trap, keep empty
 *   ...any other fields are saved with the registration
 * }
 *
 * Resolves to { ok: true, players: n }. Rejects with an Error whose message is already written for parents.
 */
export async function submitRegistration(leagueSlug, formData) {
  let res;
  try {
    res = await fetch(`${FEDOS_URL}/rest/v1/rpc/submit_registration_by_slug`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: FEDOS_ANON_KEY,
        Authorization: `Bearer ${FEDOS_ANON_KEY}`,
      },
      body: JSON.stringify({ p_slug: leagueSlug, form_data: formData }),
    });
  } catch {
    throw new Error('We could not send your registration. Check your connection and try again.');
  }

  let body = null;
  try {
    body = await res.json();
  } catch {
    /* empty or non-JSON body */
  }

  if (!res.ok) {
    throw new Error(body?.message || 'We could not send your registration. Please try again in a moment.');
  }
  return body;
}
