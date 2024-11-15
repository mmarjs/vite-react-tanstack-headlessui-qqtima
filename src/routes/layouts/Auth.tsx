import { useTranslation } from 'react-i18next';
import { Outlet, useMatch } from 'react-router-dom';
import { RiskWarning } from '~/components/auth/riskWarning/RiskWarning';
import { Triangles } from '~/components/images/Triangles';
import { LanguageSelectButton } from '~/components/languageSelection/LanguageSelectButton';
import { TextLogo } from '~/components/logo/TextLogo';

const Auth = () => {
	const { t } = useTranslation(['auth']);
	const isRegistration = Boolean(useMatch('/register'));

	return (
		<div aria-label="Container" className="grid grid-cols-3 bg-light dark:bg-dark">
			<aside className="col-span-1 hidden h-screen flex-col items-center justify-center bg-primary md:flex">
				<div className="flex max-w-md flex-col items-start justify-center space-y-12 p-4">
					<div className="flex max-w-xs flex-col space-y-10">
						<div className="text-2xl font-bold text-light">{t('aside.title')}</div>
						<div className="text-lg text-dark">{t('aside.subtitle')}</div>
					</div>
					<img src="/images/login-img.svg" alt="Image" className="w-96" />
				</div>
			</aside>

			<section
				aria-label="Content"
				className="relative col-span-3 h-screen text-dark dark:text-light md:col-span-2"
			>
				<div aria-label="Background" aria-hidden="true">
					<Triangles className="absolute top-[-1px] left-0 w-40 scale-[-1] text-primary opacity-20 md:opacity-100" />
					<Triangles className="absolute bottom-0 right-0 w-40 text-primary opacity-20 md:opacity-100" />
				</div>

				<div aria-label="Content" className="relative z-10 flex h-full flex-col">
					<header className="sticky top-0 flex h-[var(--header-height)] items-center justify-between bg-light px-3 shadow-10 dark:bg-dark md:bg-transparent md:shadow-none">
						<TextLogo width={132} className="visible md:invisible" />
						<LanguageSelectButton className="border-primary text-primary hover:bg-primary hover:text-light" />
					</header>

					<main className="flex h-full overflow-y-auto py-8">
						<div className="m-auto">
							<div className="flex max-w-xl flex-col justify-center gap-12 rounded-lg p-4 shadow-none md:bg-background-elevated-light md:px-16 md:pt-8 md:pb-8 md:shadow-10 md:dark:bg-background-elevated-dark">
								<TextLogo width={132} className="hidden md:block" />
								<Outlet />
							</div>

							{isRegistration && <RiskWarning />}
						</div>
					</main>
				</div>
			</section>
		</div>
	);
};

export default Auth;
