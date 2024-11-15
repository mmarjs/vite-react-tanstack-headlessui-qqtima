import { Dialog } from '@headlessui/react';
import i18next from 'i18next';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LANG_CONFIG } from '~/config/languages';
import { useDialog } from '~/providers/DialogProvider';
import { FlagIcon } from './flagIcon/FlagIcon';

export const LanguageSelectDialog = () => {
	const { t } = useTranslation(['common']);
	const dialog = useDialog();

	const [language, setLanguage] = useState(i18next.language);

	const handleClick = (lang: string) => {
		i18next.changeLanguage(lang);
		setLanguage(lang);
		dialog.close();
	};

	return (
		<div className="w-[300px] sm:w-[600px]">
			<Dialog.Title as="h3" className="mt-2 text-center text-2xl font-bold sm:mt-8 sm:text-[26px]">
				{t('selectYourLanguage')}
			</Dialog.Title>

			<section className="mt-4 mb-4 grid grid-cols-2 gap-1 sm:mt-8 sm:ml-8 sm:mr-4 sm:grid-cols-3">
				{LANG_CONFIG.map(({ id, name }) => (
					<button
						key={id}
						aria-current={language === id}
						className="flex items-center gap-[10px] rounded-[9px] bg-transparent py-[7px] px-[10px] transition hover:bg-primary hover:text-light aria-current:bg-primary aria-current:text-light"
						onClick={() => handleClick(id)}
					>
						<FlagIcon lang={id} />
						<div className="whitespace-nowrap text-sm font-bold">{name}</div>
					</button>
				))}
			</section>
		</div>
	);
};
