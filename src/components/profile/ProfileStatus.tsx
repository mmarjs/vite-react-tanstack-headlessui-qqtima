import { useTranslation } from 'react-i18next';
import type { TProfile } from '~/services/profile';
import { Panel } from '~/components/panel/Panel';
import { DocumentsList } from './elements/DocumentsList';
import { statuses } from '~/config/profile/statuses';

export const ProfileStatus = ({ profile }: { profile: TProfile }) => {
	const { t } = useTranslation(['profile']);
	const status = profile.isVerified ? statuses.approved : statuses.pending;

	return (
		<Panel className="max-w-[1410px] lg:col-span-2">
			<h3 className="text-[16px] font-bold">{t('status.title')}</h3>

			<div className="p-[10px]">
				<div className="mt-3 flex max-w-[272px] justify-between rounded-[5px] px-[10px] py-[7px] font-bold shadow-10">
					<span className="text-[16px]">{t('status.yourProfileIs')}:</span>
					<span
						className="flex items-center gap-1 rounded-[5px] px-2 py-1 text-xs capitalize shadow-10"
						style={{ backgroundColor: status.color }}
					>
						<status.Icon width={16} />
						{t(status.label)}
					</span>
				</div>

				<DocumentsList />
			</div>
		</Panel>
	);
};
