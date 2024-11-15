import SumsubWebSdk from '@sumsub/websdk-react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import { Paper, PaperContent, PaperHeader } from '~/components/paper';
import { client, keys } from '~/config/query';
import { documentsService } from '~/services/documents';
import { toastError } from '~/utils/toast';

const query = {
	queryKey: [keys.sumsubToken],
	queryFn: documentsService.getSumsubToken,
	onError: toastError,
};

type TLoaderData = Awaited<ReturnType<typeof documentsService.getSumsubToken>>;

export const documentsLoader = () => client.fetchQuery(query);

const expirationHandler = async () => {
	const { token } = await client.fetchQuery(query);
	return token;
};

const Documents = () => {
	const { t } = useTranslation('documents');
	const { token: initialToken } = useLoaderData() as TLoaderData;

	return (
		<Paper aria-label="Documents" className="pb-4 sm:py-5 sm:px-6">
			<PaperHeader className="p-[10px]">{t('title')}</PaperHeader>

			<PaperContent>
				<SumsubWebSdk
					testEnv={false}
					accessToken={initialToken}
					expirationHandler={expirationHandler}
					config={{ lang: i18next.language }}
					onMessage={(data) => console.info('onMessage', data)}
					onError={(data) => console.error('onError', data)}
				/>
			</PaperContent>
		</Paper>
	);
};

export default Documents;
