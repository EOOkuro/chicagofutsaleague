# English and Spanish

The site shows Spanish to people who speak it, and English to everyone else.

## How it picks a language

1. `?lang=es` (or `?lang=en`) in the link wins. Share Spanish links like `https://yoursite.com/register?lang=es`.
2. After that, the visitor's saved choice (the EN / ES switch in the menu).
3. After that, the browser language. Any Spanish (es, es-MX, es-US, es-419) counts.
4. Otherwise English.

The EN / ES switch is in the top menu (and in the phone menu). The choice is remembered on that device.
Links to FedOS (log in, continue registration) carry `lang=es` so FedOS opens in Spanish too.
Registrations and contact messages also record the language (`preferred_language` / `language`) so staff can reply in it.

## Where the Spanish lives

- `src/lib/es.js`: every Spanish sentence. Left side is the English text, right side is the Spanish.
- `src/lib/lang.js`: detection and the `translate` function (no React, easy to test).
- `src/lib/i18n.jsx`: the `LangProvider`, the `useT()` hook and the EN / ES switch.

## Adding or changing text

In a component: `const { t } = useT();` then `{t('Register a team')}`.
Then add the line to `src/lib/es.js`:

    'Register a team': 'Inscribir un equipo',

- If you change the English text in the code, change the left side in `es.js` to match exactly, or that line falls back to English.
- Values go in with `{name}` placeholders: `t('{n} teams', { n: 8 })` and `'{n} equipos'`.
- A missing Spanish line never breaks anything. It just shows in English.
- Data files (`leagues.js`, `divisions.js`, `teams.js`, `sponsors.js`) stay in English. The pages translate them when they show them. For a new league blurb, add its Spanish to `es.js`.
- Values sent to FedOS (age group, division, team type, position) stay in English on purpose, so your FedOS data stays consistent. Only the labels people see are translated.

## Not translated

- League, team and venue names (proper names).
- Names and numbers that come live from FedOS (division names, team names).
- Error messages that FedOS itself sends back.
- The page title and description in `index.html` (the first thing before the site loads). The browser tab and link previews update to Spanish once the site loads.

Have a native Spanish speaker read `es.js` before families see it.
