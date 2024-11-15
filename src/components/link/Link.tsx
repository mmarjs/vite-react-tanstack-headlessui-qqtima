import type { ReactNode} from 'react';
import { startTransition, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { preload } from '~/lazy/preloader';

export const Link = ({
	children,
	to,
	disabled,
	className = '',
	...props
}: {
	children: ReactNode;
	to: string;
	disabled?: boolean;
	className?: string;
}) => {
	const navigate = useNavigate();
	const ref = useRef<HTMLAnchorElement>(null);
	const isExternal = new RegExp('^(?:[a-z+]+:)?//', 'i').test(to);

	useEffect(() => {
		if (!ref.current) return;
		if (isExternal) return;

		const element = ref.current;
		const preloader = () => preload(to);

		element.addEventListener('mouseenter', preloader, { once: true });
		return () => element.removeEventListener('mouseenter', preloader);
	}, [to, isExternal]);

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		if (disabled) return;
		if (isExternal) {
			window.open(to, '_blank');
			return;
		}

		startTransition(() => navigate(to));
	};

	return (
		<a href={to} className={className} ref={ref} onClick={handleClick} {...props}>
			{children}
		</a>
	);
};
