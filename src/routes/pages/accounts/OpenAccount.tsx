import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { AccountTypeSelector } from '~/components/accounts/open/AccountTypeSelector';
import { OpenAccountForm } from '~/components/accounts/open/OpenAccountForm';
import { Paper, PaperHeader, PaperContent } from '~/components/paper';
import type { TAccountCategory } from '~/config/accounts/open/categories';
import { DEFAULT_PLATFORM } from '~/config/accounts/open/platforms';
import type { TAccountType } from '~/config/accounts/open/types';

const OpenAccount = () => {
	const { t } = useTranslation(['accounts']);

	const navigate = useNavigate();
	const { type, category } = useParams<{
		type: TAccountType;
		category: TAccountCategory;
	}>();

	const handleTypeSelect = (type: TAccountType, category: TAccountCategory) => {
		navigate(`/accounts/open/${type}/${category}`);
	};

	return (
		<Paper className="mb-20 py-5 px-6">
			<PaperHeader>{t('open.title')}</PaperHeader>

			<PaperContent className="mt-4 sm:mt-5">
				{type && category ? (
					<OpenAccountForm type={type} category={category} platform={DEFAULT_PLATFORM} />
				) : (
					<AccountTypeSelector onSelect={handleTypeSelect} />
				)}
			</PaperContent>
		</Paper>
	);
};

export default OpenAccount;
