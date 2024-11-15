import { useTranslation } from 'react-i18next';
import { IconButton } from '~/components/button/IconButton';
import { VerticalDivider } from '~/components/divider/VerticalDivider';
import { AccountManager } from '~/components/icons/AccountManager';
import { Mail } from '~/components/icons/Mail';
import { LanguageSelectButton } from '~/components/languageSelection/LanguageSelectButton';
import { MyAccountMenu } from './MyAccountMenu';

export const HeaderDesktop = () => {
	const { t } = useTranslation();

	return (
		<header className="sticky top-0 z-10 flex h-[var(--header-height)] items-center justify-between bg-light text-dark shadow-lg dark:bg-dark dark:text-light">
			<div aria-label="Left side" className="flex-1" />

			<div
				aria-label="Right side"
				className="before:c-oblique-line flex h-full items-center gap-2 divide-x overflow-hidden bg-primary pr-8 text-light"
			>
				<LanguageSelectButton className="border-light text-light hover:bg-light hover:text-primary" />

				<VerticalDivider />

				<IconButton icon={<Mail width={26} height={26} />}>{t('header.messages')}</IconButton>
				<IconButton icon={<AccountManager width={26} height={26} />}>
					{t('header.contactYourAccountManager')}
				</IconButton>

				<VerticalDivider />

				<MyAccountMenu />
			</div>
		</header>
	);
};
