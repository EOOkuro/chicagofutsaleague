// FedOS public data client: ONE small file shared by every site (SMESL, Hyde Park Rangers, Chicago Futsal League, ...).
// Reads fixtures, results, standings, teams and (opt-in) adult rosters from FedOS. No sign-in, no dependencies.
// It only reads the public_* views, which carry no player contact details and no under-18 player names.
//
//   import { getStandings, getFixtures, registerUrl } from "./fedos-public.js";
//   const table = await getStandings("smesl", "G1-4");
//
// Setup: set VITE_FEDOS_URL (Supabase project URL) and VITE_FEDOS_ANON_KEY (the public anon key) in the site's environment.
const env = (typeof import.meta !== "undefined" && import.meta.env) || {};
let URL_ = (env.VITE_FEDOS_URL || "").replace(/\/$/, "");
let KEY = env.VITE_FEDOS_ANON_KEY || "";
export const FEDOS_APP = env.VITE_FEDOS_APP || "https://thefedos.com";

export const fedosReady = () => Boolean(URL_ && KEY);
/** Optional: set the connection in code instead of environment variables. */
export function configureFedos({ url, anonKey, app }) { URL_ = (url || "").replace(/\/$/, ""); KEY = anonKey || ""; if (app) FEDOS_APP_OVERRIDE.v = app; }
const FEDOS_APP_OVERRIDE = { v: null };
const app = () => FEDOS_APP_OVERRIDE.v || FEDOS_APP;

// ── Caching: answers are kept for 60 seconds (memory + the tab's session storage); identical requests in flight share one call.
const TTL = 60_000, mem = new Map(), flying = new Map();
async function cached(key, load) {
  const hit = mem.get(key);
  if (hit && Date.now() - hit.t < TTL) return hit.v;
  try { const s = JSON.parse(sessionStorage.getItem("fedos:" + key) || "null"); if (s && Date.now() - s.t < TTL) { mem.set(key, s); return s.v; } } catch { /* storage may be off */ }
  if (flying.has(key)) return flying.get(key);
  const p = load().then((v) => { const e = { t: Date.now(), v }; mem.set(key, e); try { sessionStorage.setItem("fedos:" + key, JSON.stringify(e)); } catch { /* full */ } return v; }).finally(() => flying.delete(key));
  flying.set(key, p);
  return p;
}
/** Forget cached answers (for a "refresh" button). */
export const clearFedosCache = () => { mem.clear(); try { Object.keys(sessionStorage).filter((k) => k.startsWith("fedos:")).forEach((k) => sessionStorage.removeItem(k)); } catch { /* ignore */ } };

async function rest(path, params) {
  if (!fedosReady()) throw new Error("FedOS is not configured (set VITE_FEDOS_URL and VITE_FEDOS_ANON_KEY).");
  const res = await fetch(`${URL_}/rest/v1/${path}?${new URLSearchParams(params)}`, { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } });
  if (!res.ok) throw new Error(`FedOS answered ${res.status}`);
  return res.json();
}
async function rpc(fn, body) {
  if (!fedosReady()) throw new Error("FedOS is not configured.");
  const res = await fetch(`${URL_}/rest/v1/rpc/${fn}`, { method: "POST", headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`FedOS answered ${res.status}`);
  return res.json();
}
const eq = (v) => `eq.${v}`;

export const getLeague = (slug) => cached(`lg|${slug}`, async () => (await rest("public_leagues", { select: "*", slug: eq(slug) }))[0] ?? null);
export const getDivisions = (league) => cached(`dv|${league}`, () => rest("public_divisions", { select: "*", league_slug: eq(league), order: "sort_order" }));
export const getTeams = (league, division) => cached(`tm|${league}|${division ?? ""}`, () => rest("public_teams", { select: "*", league_slug: eq(league), ...(division ? { division_code: eq(division) } : {}), order: "division_code,team_name" }));
export const getStandings = (league, division) => cached(`st|${league}|${division ?? ""}`, () => rest("public_standings", { select: "*", league_slug: eq(league), ...(division ? { division_code: eq(division) } : {}), order: "division_code,position" }));
/** kind: "upcoming" | "results" | "all". `who` is a league slug, { club: "club-slug" } for a club's own public schedule,
 *  or { team: "Hyde Park Rangers", league?: "outsouth-league" } for every game a team plays (any league). */
export const getFixtures = (who, { division, kind = "all", limit = 200 } = {}) => {
  const name = who?.team ? String(who.team).replace(/[(),*]/g, " ").trim() : "";
  const filter = typeof who === "string" ? { league_slug: eq(who) } : who.club ? { club_slug: eq(who.club) }
    : { ...(who.league ? { league_slug: eq(who.league) } : {}), or: `(home_team.ilike.*${name}*,away_team.ilike.*${name}*)` };
  const p = { select: "*", ...filter, limit: String(limit) };
  if (division) p.division_code = eq(division);
  if (kind === "upcoming") { p.home_score = "is.null"; p.status = "neq.cancelled"; p.starts_at = `gte.${new Date(Date.now() - 3 * 3600e3).toISOString()}`; p.order = "starts_at.asc"; }
  else if (kind === "results") { p.home_score = "not.is.null"; p.order = "starts_at.desc"; }
  else p.order = "starts_at.asc";
  // The time in the key is rounded to the hour so the cache can actually be reused.
  return cached(`fx|${JSON.stringify(filter)}|${division ?? ""}|${kind}|${limit}|${new Date().toISOString().slice(0, 13)}`, () => rest("public_fixtures", p));
};
export const getAdultRosters = (league, division) => cached(`ro|${league}|${division ?? ""}`, () => rest("public_adult_rosters", { select: "*", league_slug: eq(league), ...(division ? { division_code: eq(division) } : {}), order: "team_name,player_name" }));
/** Search leagues, clubs, teams, divisions, matches. Returns [{ kind, id, name, detail, slug }]. */
export const searchFedos = (q) => (q || "").trim().length < 2 ? Promise.resolve([]) : cached(`se|${q.trim().toLowerCase()}`, () => rpc("search_fedos", { q: q.trim() }));

// ── Where people go to register, pay and sign in: always FedOS.
export const registerUrl = (slug) => `${app()}/register/${encodeURIComponent(slug)}`;
export const loginUrl = (siteName, role) => {
  const q = new URLSearchParams();
  if (siteName) q.set("site", siteName);
  if (role) q.set("role", role); // "player" | "guardian"
  const s = q.toString();
  return `${app()}/login${s ? `?${s}` : ""}`;
};
export const inviteUrl = (token) => `${app()}/invite/${encodeURIComponent(token)}`;

// ── Formatting helpers (Chicago time, which is where every league plays)
const CHI = "America/Chicago";
export const chicagoDate = (iso) => { const p = Object.fromEntries(new Intl.DateTimeFormat("en-CA", { timeZone: CHI, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date(iso)).map((x) => [x.type, x.value])); return `${p.year}-${p.month}-${p.day}`; };
export const chicagoTime = (iso) => new Intl.DateTimeFormat("en-US", { timeZone: CHI, hour: "numeric", minute: "2-digit" }).format(new Date(iso));
export const niceWhen = (iso) => new Intl.DateTimeFormat("en-US", { timeZone: CHI, weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(iso));
