import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { PrimaryButton } from '~/components/button/PrimaryButton';
import { getDocumentData } from '~/config/profile/documents';
import { getStatusData } from '~/config/profile/statuses';
import {
	fetchDocumentConfigsQuery,
	fetchUploadedDocumentsQuery,
	type TProfileLoaderData,
} from '~/routes/pages/profile/profileLoader';

export const DocumentsList = () => {
	const { t } = useTranslation(['profile']);
	const navigate = useNavigate();

	const loaderData = useLoaderData() as TProfileLoaderData;
	const { data: uploadedDocuments } = useQuery({
		...fetchUploadedDocumentsQuery,
		initialData: loaderData[2],
	});
	const { data: documentConfigs } = useQuery({
		...fetchDocumentConfigsQuery,
		initialData: loaderData[3],
	});

	const documents = useMemo(() => {
		// collect required documents data
		const documents = documentConfigs.map((config) => ({
			id: config.id,
			title: config.title,
			status: 'notUploaded',
			declineReason: '',
		}));

		// update required documents with actual status of the latest uploaded document
		uploadedDocuments.forEach((uploaded) => {
			const document = documents.find(({ title }) => title === uploaded.uploadConfig.title);
			if (!document) return;

			document.status = uploaded.status;
			document.declineReason = uploaded.declineReason;
		});

		return documents;
	}, [documentConfigs, uploadedDocuments]);

	const handleClick = () => navigate('/profile/documents');

	return (
		<section className="mt-10 flex flex-wrap gap-x-8 gap-y-5">
			{documents.map(({ id, status, title, declineReason }) => {
				const { Icon, label: statusLabel } = getStatusData(status);
				const { image, label: documentLabel } = getDocumentData(title);
				const uploadable = status !== 'approved' && status !== 'pending';

				return (
					<div
						key={id}
						className="relative flex w-[300px] flex-col items-center justify-evenly gap-1 rounded-[5px] bg-background-elevated-light px-8 py-5 text-sm font-bold shadow-10 dark:bg-background-elevated-dark"
					>
						<div className="absolute top-[5px] right-[5px] flex items-center gap-1 rounded-[5px] bg-primary px-2 py-1 text-xs capitalize text-light shadow-10">
							<Icon height={16} />
							{t(statusLabel)}
						</div>

						<img src={image} alt="Document image" className="h-[100px] object-contain" />

						<div className="text-center">{t(documentLabel)}</div>

						{declineReason && <div className="text-error">{t(declineReason)}</div>}

						{uploadable && (
							<PrimaryButton onClick={handleClick} className="mt-4 h-[26px] w-full">
								{status === 'notUploaded' ? t('status.upload') : t('status.reupload')}
							</PrimaryButton>
						)}
					</div>
				);
			})}
		</section>
	);
};
