import i18next from 'i18next';

export function formatTimestamp(isoDate: string) {
	const dateObj = new Date(isoDate);
	const date = dateObj.toLocaleDateString();
	const time = dateObj.toLocaleTimeString(i18next.language, { hour: '2-digit', minute: '2-digit' });
	return `${date} ${time}`;
}
