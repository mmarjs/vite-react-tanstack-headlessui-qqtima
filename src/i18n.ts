import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
	.use(HttpApi)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json',
		},
		fallbackLng: 'en',
		ns: ['common'],
		load: 'languageOnly',
		debug: false, // alternative: import.meta.env.DEV,
		interpolation: {
			escapeValue: false, // react already safes from xss
		},
		react: {
			useSuspense: true,
		},
	});

export default i18n;
