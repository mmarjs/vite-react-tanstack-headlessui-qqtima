import { Outlet } from 'react-router-dom';
import { Drawer } from '~/components/drawer/Drawer';
import { HeaderDesktop } from '~/components/header/HeaderDesktop';
import { HeaderMobile } from '~/components/header/HeaderMobile';
import { Sidemenu } from '~/components/sidemenu/Sidemenu';
import { Warning } from '~/components/warning/Warning';
import { useBreakpoint } from '~/hooks/useBreakpoint';

const Main = () => {
	const isWideScreen = useBreakpoint('lg'); // min-width: 1024px

	return (
		<div aria-label="Container" className="flex max-h-screen bg-zinc-100 dark:bg-neutral-600">
			{isWideScreen ? (
				<Sidemenu className="h-screen" />
			) : (
				<Drawer>
					<Sidemenu className="absolute top-[var(--header-height)] h-[calc(100vh_-_var(--header-height))]" />
				</Drawer>
			)}

			<section aria-label="Content" className="flex-1 overflow-y-auto">
				{isWideScreen ? <HeaderDesktop /> : <HeaderMobile />}

				<main className="overflow-hidden">
					<Warning />
					<div
						aria-label="Content"
						className="px-[10px] py-6 text-dark dark:text-light sm:px-7 sm:py-8"
					>
						<Outlet />
					</div>
				</main>
			</section>
		</div>
	);
};

export default Main;
