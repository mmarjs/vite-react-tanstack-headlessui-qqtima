import { useTranslation } from 'react-i18next';
import { Avatar } from '~/components/avatar/Avatar';
import { IconButton } from '~/components/button/IconButton';
import { ArrowDown } from '~/components/icons/ArrowDown';
import { Link } from '~/components/link/Link';
import { Popover } from '~/components/popover/Popover';
import { myAccountMenu } from '../sidemenu/menu';

const menuElements = myAccountMenu.children;

export const MyAccountMenu = () => {
	const { t } = useTranslation();

	return (
		<Popover
			button={
				<IconButton icon={<Avatar />}>
					<div className="flex gap-1">
						{t('navigation.myAccount.title')}
						<ArrowDown
							width="10"
							className="translate-y-[1px] transition duration-300 group-aria-expanded:rotate-180"
						/>
					</div>
				</IconButton>
			}
		>
			<ul className="min-w-[150px]">
				{menuElements.map(({ key, to, Icon }) => (
					<Link
						key={key}
						to={to}
						className="flex w-full items-center gap-3 rounded-none border-b border-b-neutral-200 px-0 py-4 transition hover:text-primary"
					>
						<Icon width={26} height={26} />
						{t(key)}
					</Link>
				))}
			</ul>
		</Popover>
	);
};
