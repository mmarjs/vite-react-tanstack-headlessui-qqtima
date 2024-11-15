import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Triangles } from '~/components/images/Triangles';
import { Logo } from '~/components/logo/Logo';
import { Tooltip } from '~/components/tooltip/Tooltip';
import { useBreakpoint } from '~/hooks/useBreakpoint';
import { Link } from '../link/Link';
import { LinkItem } from './LinkItem';
import { getCategories, getCurrentPage, quickActionsMenu } from './menu';
import { SublinkItem } from './SublinkItem';
import { twMerge } from 'tailwind-merge';

export const Sidemenu = ({ className = '' }: { className: string }) => {
	const { t } = useTranslation();

	const isWideScreen = useBreakpoint('lg'); // min-width: 1024px
	const categories = getCategories(isWideScreen);

	const { pathname } = useLocation();
	const currentPage = getCurrentPage(categories, pathname);

	return (
		<aside
			aria-label="Sidebar"
			role="navigation"
			className={twMerge('flex w-[308px] lg:w-[360px]', className)}
		>
			{isWideScreen && (
				<section aria-label="Quick actions panel" className="w-15 bg-primary px-2 py-5 text-light">
					<Link to="/">
						<Logo />
					</Link>

					<div aria-label="Quick actions wrapper" className="mt-8 flex flex-col items-center gap-4">
						{quickActionsMenu.children.map(({ key, to, Icon }) => (
							<Tooltip key={key} label={t(key)} placement="right">
								<Link
									to={to}
									className="block h-8 w-8 rounded bg-primary-dark text-dark transition-colors duration-300 hover:bg-background-elevated-dark hover:text-primary"
								>
									<Icon className="aspect-square w-8 p-[6px]" />
								</Link>
							</Tooltip>
						))}
					</div>
				</section>
			)}

			<section
				aria-label="Navbar panel"
				className="flex max-h-full w-full flex-col overflow-y-auto bg-dark"
			>
				<nav className="p-4">
					{isWideScreen && currentPage && (
						<p className="mt-1 mb-4 text-lg font-bold leading-none text-light">
							{t(currentPage.key)}
						</p>
					)}

					<ul className="flex flex-col gap-5">
						{categories.map((menuCategory) => (
							<li key={menuCategory.key}>
								<span className="text-[12px] font-bold uppercase text-light/25">
									{t(menuCategory.key)}
								</span>

								<ul className="mt-2 flex flex-col gap-1">
									{menuCategory.children?.map((menuElement) => (
										<LinkItem key={menuElement.key} element={menuElement}>
											{menuElement.children?.map((submenuElement) => (
												<SublinkItem key={submenuElement.key} to={submenuElement.to}>
													{t(submenuElement.key)}
												</SublinkItem>
											))}
										</LinkItem>
									))}
								</ul>
							</li>
						))}
					</ul>
				</nav>

				<div className="flex flex-1 items-end justify-end">
					<Triangles className="pointer-events-none float-right w-40 text-[#4d4d4d]" />
				</div>
			</section>
		</aside>
	);
};
