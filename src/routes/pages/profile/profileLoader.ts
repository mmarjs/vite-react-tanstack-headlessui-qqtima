import { client, keys } from '~/config/query';
import { documentsService, type TUploadedDocument, type TUploadConfig } from '~/services/documents';
import { profileService, type TProfile, type TNotificationOption } from '~/services/profile';
import { toastError } from '~/utils/toast';

export const fetchProfileQuery = {
	queryKey: [keys.profile],
	queryFn: profileService.get,
	onError: toastError,
};

export const fetchNotificationOptionsQuery = {
	queryKey: [keys.notificationOptions],
	queryFn: profileService.getNotificationOptions,
	onError: toastError,
};

export const fetchUploadedDocumentsQuery = {
	queryKey: [keys.uploadedDocuments],
	queryFn: documentsService.listUploaded,
	onError: toastError,
};

export const fetchDocumentConfigsQuery = {
	queryKey: [keys.documentConfigs],
	queryFn: documentsService.getConfigs,
	onError: toastError,
};

export const profileLoader = () => {
	const profilePromise: Promise<TProfile> =
		client.getQueryData(fetchProfileQuery.queryKey) ?? client.fetchQuery(fetchProfileQuery);

	const notificationOptionsPromise: Promise<TNotificationOption[]> =
		client.getQueryData(fetchNotificationOptionsQuery.queryKey) ??
		client.fetchQuery(fetchNotificationOptionsQuery);

	const uploadedDocumentsPromise: Promise<TUploadedDocument[]> =
		client.getQueryData(fetchUploadedDocumentsQuery.queryKey) ??
		client.fetchQuery(fetchUploadedDocumentsQuery);

	const documentConfigsPromise: Promise<TUploadConfig[]> =
		client.getQueryData(fetchDocumentConfigsQuery.queryKey) ??
		client.fetchQuery(fetchDocumentConfigsQuery);

	return Promise.all([
		profilePromise,
		notificationOptionsPromise,
		uploadedDocumentsPromise,
		documentConfigsPromise,
	]);
};

export type TProfileLoaderData = Awaited<ReturnType<typeof profileLoader>>;
