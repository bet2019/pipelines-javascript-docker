import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    loadPath: (process.env.APP_ENV !== 'dev' ? '/app' : '') + '/locales/{{lng}}/{{ns}}.json',
    fallbackLng: 'en',
    debug: process.env.APP_ENV !== "prod",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      wait: true,
    },
  });

export default i18n;