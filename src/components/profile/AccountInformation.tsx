import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Panel } from '~/components/panel/Panel';
import { useDialog } from '~/providers/DialogProvider';
import type { TProfile } from '~/services/profile';
import { ChangeEmailDialog } from './elements/ChangeEmailDialog';
import { ChangePasswordDialog } from './elements/ChangePasswordDialog';
import { ChangePhoneDialog } from './elements/ChangePhoneDialog';
import { DataLine, type TDataLine } from './elements/DataLine';
import { NotificationPreferences } from './elements/NotificationPreferences';
import { SetTwoFactorAuthDialog } from './elements/SetTwoFactorAuthDialog';

export const AccountInformation = ({ profile }: { profile: TProfile }) => {
	const { t } = useTranslation(['profile']);
	const dialog = useDialog();

	const lines: TDataLine[] = useMemo(
		() => [
			{ label: 'account.clientId', value: String(profile.id) },
			{
				label: 'account.password',
				value: <span className="text-xl font-bold leading-4">••••••••</span>,
				onEdit: () => dialog.open(<ChangePasswordDialog />),
			},
			{
				label: 'account.email',
				value: profile.email,
				onEdit: () => dialog.open(<ChangeEmailDialog currentEmail={profile.email} />),
			},
			{
				label: 'account.mobileNumber',
				value: profile.phone,
				onEdit: () =>
					dialog.open(<ChangePhoneDialog currentPhone={profile.phone} email={profile.email} />),
			},
			{ label: 'account.notificationPreferences', value: <NotificationPreferences /> },
			{
				label: 'account.twoFactorAuthentication',
				onEdit: () =>
					dialog.open(<SetTwoFactorAuthDialog enabled={profile.twoFactorAuthEnabled} />),
			},
		],
		[dialog, profile.email, profile.id, profile.phone, profile.twoFactorAuthEnabled],
	);

	return (
		<Panel>
			<h3 className="text-[16px] font-bold">{t('account.title')}</h3>

			<div className="flex flex-col py-2 text-xs">
				{lines.map((line) => (
					<DataLine key={line.label} {...line}>
						{line.value}
					</DataLine>
				))}
			</div>
		</Panel>
	);
};
