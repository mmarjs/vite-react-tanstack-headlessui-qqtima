import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import { Paper, PaperHeader, PaperContent } from '~/components/paper';
import { AccountInformation } from '~/components/profile/AccountInformation';
import { PersonalInformation } from '~/components/profile/PersonalInformation';
import { ProfileStatus } from '~/components/profile/ProfileStatus';
import { fetchProfileQuery, type TProfileLoaderData } from './profileLoader';

const Profile = () => {
	const loaderData = useLoaderData() as TProfileLoaderData;
	const { data } = useQuery({ ...fetchProfileQuery, initialData: loaderData[0] });
	const { t } = useTranslation(['profile']);

	return (
		<Paper aria-label="Profile Information" className="pb-4 sm:py-5 sm:px-6">
			<PaperHeader className="p-[10px]">{t('title')}</PaperHeader>

			<PaperContent className="grid max-w-[1410px] gap-5 p-[10px] lg:grid-cols-2">
				<PersonalInformation profile={data} />
				<AccountInformation profile={data} />
				<ProfileStatus profile={data} />
			</PaperContent>
		</Paper>
	);
};

export default Profile;
