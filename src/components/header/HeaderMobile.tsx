import { Logo } from '~/components/logo/Logo';
import { BurgerMenuButton } from './BurgerMenuButton';

export const HeaderMobile = () => {
	return (
		<header className="sticky top-0 z-10 flex h-[var(--header-height)] items-center justify-between bg-light text-dark shadow-lg dark:bg-dark dark:text-light">
			<div aria-label="Left side" className="h-full flex-1">
				<BurgerMenuButton />
			</div>

			<div
				aria-label="Right side"
				className="before:c-oblique-line flex items-center bg-primary pr-[10px] text-light"
			>
				<Logo width={70} />
			</div>
		</header>
	);
};
