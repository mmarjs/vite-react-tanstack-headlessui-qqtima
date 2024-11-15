import { fxbo } from '~/api/fxbo';
import { authData } from '~/utils/auth';

export type TUploadedDocument = {
	id: number;
	uploadConfig: TUploadConfig;
	status: string;
	declineReason: string;
	description: string;
	data: string[];
};

export type TUploadConfig = {
	id: number;
	title: string;
	category: string;
	type: string;
	description: string;
	requiredForVerification: boolean;
	config: string[];
};

const listUploaded = () => {
	if (!fxbo.isAuthorized()) return Promise.resolve([]);
	return fxbo.get<TUploadedDocument[]>('documents');
};

const getConfigs = () => {
	if (!fxbo.isAuthorized()) return Promise.resolve([]);
	return fxbo.get<TUploadConfig[]>('documents/configs');
};

type TSumsubTokenRes = { token: string; userId: string };

const getSumsubToken = () => {
	if (!fxbo.isAuthorized()) return Promise.resolve({} as TSumsubTokenRes);

	const email = authData.get()?.client?.email;
	if (!email) return Promise.resolve({} as TSumsubTokenRes);

	// TODO: replace with oqtima backend call
	const fakeToken =
		'sbx:' +
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15);

	return Promise.resolve({
		token: fakeToken,
		userId: email,
	});

	// return oqtima.get<TSumsubTokenRes>(`sumsub/token?userId=${email}`);
};

export const documentsService = { listUploaded, getConfigs, getSumsubToken };
