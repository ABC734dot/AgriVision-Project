import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import hi from './locales/hi.json'
import ta from './locales/ta.json'
import te from './locales/te.json'
import kn from './locales/kn.json'
import mr from './locales/mr.json'
import bn from './locales/bn.json'

import { defaultLanguageCode } from './languages.js'

const STORAGE_KEY = 'agrivision_language'

function getStoredLanguage() {
  try {
    return localStorage.getItem(STORAGE_KEY) || defaultLanguageCode
  } catch {
    return defaultLanguageCode
  }
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    ta: { translation: ta },
    te: { translation: te },
    kn: { translation: kn },
    mr: { translation: mr },
    bn: { translation: bn },
  },
  lng: getStoredLanguage(),
  fallbackLng: defaultLanguageCode,
  interpolation: { escapeValue: false },
  returnEmptyString: false,
})

i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem(STORAGE_KEY, lng)
  } catch {
    // localStorage unavailable (e.g. private browsing) — language
    // selection still works for the current session, just won't persist.
  }
})

export default i18n