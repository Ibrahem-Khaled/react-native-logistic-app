import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './ar.json';
import ku from './ku.json';

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'ar',
    fallbackLng: 'ar',
    resources: {
        ar: ar,
        curdi: ku,
    },
    interpolation: {
        escapeValue: false // react already safes from xss
    }
});

export default i18n;
