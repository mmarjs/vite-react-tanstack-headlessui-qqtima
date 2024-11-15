import i18next from 'i18next';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Panel } from '~/components/panel/Panel';
import { LANG_CONFIG } from '~/config/languages';
import { useDialog } from '~/providers/DialogProvider';
import type { TProfile } from '~/services/profile';
import { ChangeLanguageDialog } from './elements/ChangeLanguageDialog';
import { DataLine, type TDataLine } from './elements/DataLine';

export const PersonalInformation = ({ profile }: { profile: TProfile }) => {
	const { t } = useTranslation(['profile', 'countries']);
	const dialog = useDialog();

	const lines: TDataLine[] = useMemo(
		() => [
			{ label: 'personal.firstName', value: profile.firstName },
			{ label: 'personal.lastName', value: profile.lastName },
			{ label: 'personal.dateOfBirth', value: formatDate(profile.birthDate) },
			{
				label: 'personal.communicationLanguage',
				value: extractLanguageName(profile.language),
				onEdit: () => dialog.open(<ChangeLanguageDialog language={profile.language} />),
			},
			{
				label: 'personal.countryOfResidence',
				value: t(profile.country, { ns: 'countries' }),
			},
		],
		[
			t,
			dialog,
			profile.birthDate,
			profile.country,
			profile.firstName,
			profile.language,
			profile.lastName,
		],
	);

	return (
		<Panel>
			<h3 className="text-[16px] font-bold">{t('personal.title')}</h3>

			<div className="flex flex-col py-2 text-xs">
				{lines.map((line) => (
					<DataLine key={line.label} {...line}>
						{line.value}
					</DataLine>
				))}
			</div>
		</Panel>
	);
};

function formatDate(dateString: string) {
	const date = new Date(dateString);
	return date.toLocaleDateString(i18next.language, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

function extractLanguageName(code: string) {
	const lang = LANG_CONFIG.find((lang) => lang.id === code);
	return lang?.name ?? code;
}
