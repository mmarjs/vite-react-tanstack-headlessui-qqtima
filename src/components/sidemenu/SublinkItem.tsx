import type { ReactNode } from 'react';
import { useMatch } from 'react-router-dom';
import { Bullet } from '~/components/icons/Bullet';
import { Link } from '~/components/link/Link';

export const SublinkItem = ({ children, to }: { children: ReactNode; to: string }) => {
	const match = useMatch(to);
	const isCurrent = match ? true : undefined;

	return (
		<li
			aria-current={isCurrent}
			className="block px-2 py-1 text-[12px] text-neutral-400 transition hover:text-light aria-current:text-primary aria-current:hover:text-primary-dark aria-current:active:text-primary-dark"
		>
			<Link to={to} className="flex items-center gap-[7px]">
				<Bullet width={5} height={5} className="text-primary" /> {children}
			</Link>
		</li>
	);
};
