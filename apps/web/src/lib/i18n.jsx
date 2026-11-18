import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { detectLang, saveLang, setCurrentLang, translate } from './lang.js';

const LangContext = createContext({ lang: 'en', setLang: () => {}, t: (s, v) => translate('en', s, v) });

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const l = detectLang();
    setCurrentLang(l);
    return l;
  });

  useEffect(() => {
    setCurrentLang(lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l) => {
    setCurrentLang(l);
    saveLang(l);
    setLangState(l);
  }, []);

  const value = useMemo(() => ({ lang, setLang, t: (s, v) => translate(lang, s, v) }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

/** const { t, lang } = useT();  t('Register') -> "Registrarse" in Spanish. */
export const useT = () => useContext(LangContext);

/** EN | ES switch. */
export function LangSwitch({ className = '' }) {
  const { lang, setLang } = useT();
  const btn = (code, label, aria) => (
    <button
      type="button"
      onClick={() => setLang(code)}
      aria-pressed={lang === code}
      aria-label={aria}
      lang={code}
      className={`px-2 py-1 text-xs font-bold tracking-wider font-['Barlow_Condensed'] transition-colors ${
        lang === code ? 'bg-white text-[hsl(var(--black))]' : 'text-white hover:bg-white/10'
      }`}
    >
      {label}
    </button>
  );
  return (
    <div role="group" aria-label="Language / Idioma" className={`inline-flex rounded-md border border-white/40 overflow-hidden ${className}`}>
      {btn('en', 'EN', 'English')}
      {btn('es', 'ES', 'Español')}
    </div>
  );
}
