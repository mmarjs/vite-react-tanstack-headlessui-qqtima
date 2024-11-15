import { Fragment, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { More } from '~/components/icons/More';
import { Link } from '~/components/link/Link';
import type { TMenuElement } from './menu';
import { Disclosure, Transition } from '@headlessui/react';

export const LinkItem = ({
	element: { key, to, Icon, canBeCurrent },
	children,
}: {
	element: TMenuElement;
	children?: ReactNode;
}) => {
	const { t } = useTranslation();

	const { pathname } = useLocation();
	const currentTo = pathname.slice(1);
	const isCurrent = canBeCurrent !== false && (to === currentTo || currentTo.startsWith(to));

	if (children)
		return (
			<Disclosure as="li" aria-label="LinkItem" defaultOpen={isCurrent}>
				<Disclosure.Button
					aria-current={isCurrent}
					className="flex w-full items-center justify-between rounded-md bg-transparent p-2 text-[14px] font-bold text-neutral-400 transition-all hover:bg-white/10 hover:text-light active:text-primary aria-current:bg-white/10 aria-current:text-light"
				>
					<span className="flex items-center gap-3 transition">
						<Icon aria-current={isCurrent} width={19} className="aria-current:text-primary" />{' '}
						{t(key)}
					</span>

					<More
						aria-current={isCurrent}
						width={16}
						opacity={0.54}
						className="transition aria-current:text-primary"
					/>
				</Disclosure.Button>

				<Transition
					as={Fragment}
					enter="transition-all ease-in"
					enterFrom="transform opacity-20 max-h-0"
					enterTo="transform opacity-100 max-h-screen"
					leave="transition-all ease-out"
					leaveFrom="transform opacity-100 max-h-screen"
					leaveTo="transform opacity-20 max-h-0"
				>
					<Disclosure.Panel
						as="ul"
						aria-current={isCurrent}
						className="ml-5 mt-1 overflow-hidden rounded-md py-1 transition aria-current:bg-white/10"
					>
						{children}
					</Disclosure.Panel>
				</Transition>
			</Disclosure>
		);

	return (
		<li>
			<Link
				aria-current={isCurrent}
				to={to}
				className="flex justify-between rounded-md bg-transparent p-2 text-[14px] font-bold text-neutral-400 transition-all hover:bg-white/10 hover:text-light active:text-primary aria-current:bg-white/10 aria-current:text-light"
			>
				<span className="flex items-center gap-3 transition">
					<Icon aria-current={isCurrent} width={19} className="aria-current:text-primary" />
					{t(key)}
				</span>
			</Link>
		</li>
	);
};
