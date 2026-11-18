// Language core for the Chicago Futsal League site. Plain JS (no React) so it can be tested in Node.
//
// Detection order:
//   1. ?lang=es or ?lang=en in the link (so you can share Spanish links, e.g. /register?lang=es)
//   2. the visitor's saved choice (the EN / ES switch)
//   3. the browser language: any Spanish (es, es-MX, es-US...) counts
//   4. English
import { ES } from './es.js';

export const LANGS = ['en', 'es'];
const STORE_KEY = 'cfl:lang';

const norm = (v) => {
  const s = String(v || '').toLowerCase().trim();
  return s.startsWith('es') ? 'es' : s.startsWith('en') ? 'en' : null;
};

export function detectLang(env = {}) {
  const search = env.search ?? (typeof window !== 'undefined' ? window.location.search : '');
  try {
    const fromUrl = norm(new URLSearchParams(search).get('lang'));
    if (fromUrl) return fromUrl;
  } catch { /* ignore */ }

  try {
    const store = env.storage ?? (typeof localStorage !== 'undefined' ? localStorage : null);
    const saved = norm(store && store.getItem(STORE_KEY));
    if (saved) return saved;
  } catch { /* storage may be blocked */ }

  const nav = env.navigator ?? (typeof navigator !== 'undefined' ? navigator : {});
  const prefs = [...(nav.languages || []), nav.language].filter(Boolean);
  // The first language the browser lists that we support wins, so ["fr", "es"] still gets Spanish.
  for (const p of prefs) {
    const n = norm(p);
    if (n) return n;
  }
  return 'en';
}

export function saveLang(lang, storage) {
  try {
    (storage ?? localStorage).setItem(STORE_KEY, lang);
  } catch { /* storage may be blocked */ }
}

// ── Current language, readable from anywhere (React components use the hook in i18n.jsx).
let current = 'en';
export const getLang = () => current;
export const setCurrentLang = (l) => { current = l === 'es' ? 'es' : 'en'; };

const fill = (s, vars) => (vars ? s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m)) : s);

// English text in, text for the current language out. A missing Spanish entry falls back to English, so nothing breaks.
// Use {name} placeholders for values: tr('{n} teams', { n: 8 }).
export function translate(lang, en, vars) {
  const text = lang === 'es' && Object.prototype.hasOwnProperty.call(ES, en) ? ES[en] : en;
  return fill(text, vars);
}
export const tr = (en, vars) => translate(current, en, vars);
