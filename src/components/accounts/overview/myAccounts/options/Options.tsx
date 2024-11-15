import { useTranslation } from 'react-i18next';
import { ArrowDown } from '~/components/icons/ArrowDown';
import { Cog } from '~/components/icons/Cog';
import { Popover } from '~/components/popover/Popover';
import { useDialog } from '~/providers/DialogProvider';
import type { TAccount } from '~/services/accounts';
import { RenameAccountDialog } from './RenameAccountDialog';
import { AccountInformationDialog } from './AccountInformationDialog';
import { ChangeMaxLeverageDialog } from './ChangeMaxLeverageDialog';
import { ChangeTradingPassword } from './ChangeTradingPassword';

export const Options = ({ account, className = '' }: { account: TAccount; className?: string }) => {
	const { t } = useTranslation(['accounts']);
	const dialog = useDialog();

	const menu = [
		{
			label: 'overview.myAccounts.menu.accountInformation',
			action: () => dialog.open(<AccountInformationDialog account={account} />),
		},
		{
			label: 'overview.myAccounts.menu.changeMaxLeverage',
			action: () => dialog.open(<ChangeMaxLeverageDialog account={account} />),
		},
		{
			label: 'overview.myAccounts.menu.renameAccount',
			action: () => dialog.open(<RenameAccountDialog account={account} />),
		},
		{
			label: 'overview.myAccounts.menu.changeTradingPassword',
			action: () => dialog.open(<ChangeTradingPassword account={account} />),
		},
	];

	return (
		<Popover
			className={className}
			button={
				<button className="flex h-[35px] w-[51px] items-center justify-center gap-1 rounded bg-neutral-200 p-0 text-dark transition duration-300 hover:bg-neutral-300 group-aria-expanded:bg-primary">
					<Cog
						width={20}
						height={20}
						className="fill-primary transition group-aria-expanded:fill-light"
					/>
					<ArrowDown
						width="10"
						height="10"
						className="transition duration-300 group-aria-expanded:rotate-180 group-aria-expanded:text-light"
					/>
				</button>
			}
		>
			<div className="min-w-[226px]">
				{menu.map(({ label, action }) => (
					<button
						key={label}
						className="flex w-full items-center justify-end gap-2 rounded-none border border-b-neutral-200 px-0 py-4 text-right text-sm font-bold transition hover:text-primary"
						onClick={action}
					>
						{t(label)}
					</button>
				))}
			</div>
		</Popover>
	);
};
