import { useTranslation } from 'react-i18next';
import { PrimaryButton } from '~/components/button/PrimaryButton';
import { SecondaryButton } from '~/components/button/SecondaryButton';
import { Star } from '~/components/icons/Star';
import { Paper } from '~/components/paper/Paper';
import type { TAccountCategory } from '~/config/accounts/open/categories';
import { accountTypes, type TAccountType } from '~/config/accounts/open/types';

export const AccountTypeSelector = ({
	onSelect,
}: {
	onSelect: (type: TAccountType, category: TAccountCategory) => void;
}) => {
	const { t } = useTranslation(['accounts']);

	return (
		<div className="flex flex-wrap gap-8">
			{accountTypes.map(
				({ value, label, description, spreadFrom, commission, img, allowDemo, isRecommended }) => (
					<Paper
						key={value}
						aria-label={`Account type: ${value}`}
						className={`relative flex min-w-[260px] max-w-[700px] flex-1 flex-col items-center overflow-hidden border p-11 sm:min-w-[335px] ${
							isRecommended ? 'border-primary' : 'border-transparent'
						}`}
					>
						{isRecommended && (
							<div className="absolute top-0 left-0 text-light">
								<div className="absolute z--10 h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 rotate-45 transform bg-primary" />
								<Star className="relative z-10 m-1 h-5 w-5" />
							</div>
						)}

						<div
							aria-label="Account type features"
							className="absolute top-2 right-2 flex flex-col justify-between gap-[5px]"
						>
							<div className="flex min-w-[120px] items-center justify-center rounded-[5px] bg-primary p-1 text-[10px] font-bold text-light">
								{commission
									? t('open.features.commission', { commission })
									: t('open.features.noCommission')}
							</div>
							<div className="flex min-w-[120px] items-center justify-center rounded-[5px] bg-primary p-1 text-[10px] font-bold text-light">
								{t('open.features.spreadFrom', { spreadFrom })}
							</div>
						</div>

						<img src={img} alt="Account type image" className="h-[300px]" />

						<div className="mt-4 flex flex-col items-center gap-1">
							<h3 className="text-lg font-bold sm:text-2xl">{label}</h3>
							<p className="text-center text-xs sm:text-base">{t(description)}</p>
						</div>

						<div className="mt-5 flex flex-wrap justify-center gap-y-2 gap-x-6">
							<PrimaryButton onClick={() => onSelect(value, 'live')} className="h-10">
								{t('open.actions.openLive')}
							</PrimaryButton>

							{allowDemo && (
								<SecondaryButton onClick={() => onSelect(value, 'demo')} className="h-10">
									{t('open.actions.openDemo')}
								</SecondaryButton>
							)}
						</div>
					</Paper>
				),
			)}
		</div>
	);
};
