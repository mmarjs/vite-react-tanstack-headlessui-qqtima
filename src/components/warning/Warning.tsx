import { Transition } from '@headlessui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { WarningSign } from '~/components/icons/WarningSign';

export const Warning = () => {
	const { t } = useTranslation();

	const [isDisplayed, setDisplayed] = useState(true);

	const warning = {
		title: t('warnings.documentExpired.title'),
		subtitle: t('warnings.documentExpired.subtitle'),
		linkTo: '/upload-documents',
	};

	return (
		<Transition
			aria-label="Warning"
			role="status"
			show={isDisplayed}
			enter="transition-all ease-in-out duration-300"
			enterFrom="mt-[-85px]"
			enterTo="mt-[0px]"
			leave="transition-all ease-in-out duration-300"
			leaveFrom="mt-[0px]"
			leaveTo="mt-[-85px]"
			className="z--10 flex h-[85px] w-full items-center gap-4 bg-dark p-2"
			onClick={() => setDisplayed(false)}
		>
			<WarningSign width={73} height={69} />
			<div className="flex flex-col justify-center gap-1 text-xs text-light sm:gap-2 sm:text-sm">
				<p className="font-bold">{warning.title}</p>
				<Link
					to={warning.linkTo}
					className="text-[11px] underline transition duration-400 hover:text-primary sm:text-sm"
				>
					{warning.subtitle}
				</Link>
			</div>
		</Transition>
	);
};
