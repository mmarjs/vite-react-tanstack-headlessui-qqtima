import i18next from 'i18next';
import { useDialog } from '~/providers/DialogProvider';
import { RoundedArrow } from '~/components/icons/RoundedArrow';
import { FlagIcon } from '~/components/languageSelection/flagIcon/FlagIcon';
import { LanguageSelectDialog } from './LanguageSelectDialog';
import { twMerge } from 'tailwind-merge';

export const LanguageSelectButton = ({ className = '' }: { className: string }) => {
	const dialog = useDialog();

	return (
		<button
			className={twMerge(
				'relative m-2 flex h-10 w-24 items-center justify-center rounded-3xl border-2 bg-transparent transition duration-400',
				className,
			)}
			tabIndex={1}
			onClick={() => dialog.open(<LanguageSelectDialog />)}
		>
			<FlagIcon lang={i18next.language} key={i18next.language} />
			<div className="absolute left-[65%]">
				<RoundedArrow width={8} />
			</div>
		</button>
	);
};
