import { useTranslation } from 'react-i18next';

export const RiskWarning = () => {
	const { t } = useTranslation(['auth']);

	return (
		<div
			aria-label="Risk Warning"
			className="w-[310px] text-center text-[10px] text-neutral-400 md:w-[472px] md:pt-2 md:text-[11px]"
		>
			{t('register.riskWarning')}
		</div>
	);
};
