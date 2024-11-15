import i18next from 'i18next';

export function formatPrice(amount: string, currency: string) {
	return new Intl.NumberFormat(i18next.language, { style: 'currency', currency }).format(
		Number(amount),
	);
}
