import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ar from './messages/ar.json';
import en from './messages/en.json';
import he from './messages/he.json';

const resources = {
  ar: {
    translation: ar
  },
  en: {
    translation: en
  },
  he: {
    translation: he
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'he',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;