import { useTranslation } from 'react-i18next';
import { SecondaryButton } from '~/components/button/SecondaryButton';

export const ShowMoreButton = ({ onClick }: { onClick: () => void }) => {
	const { t } = useTranslation(['common']);

	return (
		<SecondaryButton onClick={onClick} className="h-10">
			{t('showMore')}
		</SecondaryButton>
	);
};
