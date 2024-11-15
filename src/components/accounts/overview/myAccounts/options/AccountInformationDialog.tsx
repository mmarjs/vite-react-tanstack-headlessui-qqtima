import { useTranslation } from 'react-i18next';
import { PrimaryButton } from '~/components/button/PrimaryButton';
import { Header } from '~/components/dialog/Header';
import { useDialog } from '~/providers/DialogProvider';
import type { TAccount } from '~/services/accounts';

export const AccountInformationDialog = ({ account }: { account: TAccount }) => {
	const { t } = useTranslation(['accounts']);
	const dialog = useDialog();

	return (
		<div
			aria-label="Account information dialog"
			className="flex w-[300px] flex-col gap-6 sm:w-[540px]"
		>
			<Header>{t('information.title')}</Header>

			<div className="flex flex-col rounded-[5px] px-4 pt-2 pb-6 text-xs shadow-10">
				<DataLine label={t('information.server')} value={account.type.server} />
				<DataLine label={t('information.login')} value={account.login} />
				<DataLine label={t('information.nickname')} value={account.type.title} />
				<DataLine label={t('information.actualLeverage')} value={`1:${account.leverage}`} />
				<DataLine
					label={t('information.maxLeverage')}
					value={`1:${account.type.leverages.at(-1)}`}
				/>
				<DataLine
					label={t('information.freeMargin')}
					value={`${account.currency} ${account.marginFree}`}
				/>
			</div>

			<PrimaryButton className="h-10" onClick={dialog.close}>
				{t('information.action')}
			</PrimaryButton>
		</div>
	);
};

const DataLine = ({ label, value }: { label: string; value: string | number }) => {
	return (
		<div className="flex h-[34px] items-center justify-between border-b-neutral-100 dark:border-b-neutral-700 [&:not(:last-child)]:border-b">
			<label className="font-bold">{label}</label>
			<span>{value}</span>
		</div>
	);
};
