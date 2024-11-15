import { fxbo } from '~/api/fxbo';
import i18n from '~/i18n';
import type { TOpenAccountSchema } from '~/validation/accounts/open';
import type { TSuccesfulResponse } from './types';

export type TAccount = {
	login: number;
	sid: number;
	typeID: number;
	loginSid: string;
	currency: string;
	password: string;
	investorPassword: string;
	leverage: number;
	balance: number;
	equity: number;
	credit: number;
	margin: number;
	type: TAccountType;
	createdAt: string;
	firstDepositDate: string;
	marginFree: number;
	marginLevel: number;
	isSwapFree: boolean;
	sendReports: boolean;
	swapFreeApplication: TApplication;
	supportRequestSwapFree: boolean;
	supportChangeSendReports: boolean;
	ibID: number;
	swapFree: boolean;
	isEnabled: true;
	isReadOnly: boolean;
	tradingStatus: 'new' | 'readonly';
};

type TApplication = {
	id: number;
	uploadConfig: TUploadConfig;
	status: string;
	type: string;
	declineReason: string;
	data: string[];
};

type TUploadConfig = {
	id: number;
	title: string;
	category: string;
	type: string;
	description: string;
	requiredForVerification: boolean;
	config: string[];
};

type TAccountType = {
	id: number;
	defaultLeverage: number;
	maxAccounts: number;
	displayOrder: number;
	initialDepositAmount: number;
	minimumTransferAmount: number;
	initialDepositCurrency: string;
	minimumTransferCurrency: string;
	title: string;
	server: string;
	category: string;
	platform: string;
	description: string;
	showCredentials: boolean;
	canChangeLeverage: boolean;
	canChangeTradingPassword: boolean;
	canChangeInvestorPassword: boolean;
	canRequestLeverage: boolean;
	canRequestSwapFree: boolean;
	canViewTradingHistory: boolean;
	leverages: string[];
	currencies: string[];
};

const list = () => {
	if (!fxbo.isAuthorized()) return Promise.resolve([]);
	return fxbo.post<TAccount[]>('accounts');
};

let cachedAccountTypes: TAccountType[] | null = null;

const create = async ({
	platform,
	category,
	leverage,
	currency,
	initialBalance,
}: TOpenAccountSchema) => {
	const accountTypes = cachedAccountTypes || (await fxbo.get<TAccountType[]>('accounts/types'));
	if (!cachedAccountTypes) cachedAccountTypes = accountTypes;

	const accountType = accountTypes.find(
		(type) => type.platform === platform && type.category === category,
	);

	if (!accountType) {
		const errorMessage = i18n.t('accounts:open.errors.create.accountTypeNotFound');
		throw new Error(errorMessage);
	}

	type TCreateAccountPayload = {
		typeId: number;
		leverage: number;
		currency: string;
		initialBalance?: number;
		ibId?: number; // check if required for 'real' accounts
	};

	const data: TCreateAccountPayload = { typeId: accountType.id, leverage, currency };
	if (category === 'demo') data.initialBalance = initialBalance;

	const account = await fxbo.post<TAccount>('accounts/new', data);
	return account;
};

const changeName = (loginSid: string, name: string) => {
	return fxbo.post<TSuccesfulResponse>('accounts/change/name', { loginSid, name });
};

const changeLeverage = (loginSid: string, leverage: number) => {
	return fxbo.post<TSuccesfulResponse>('accounts/change/leverage', { loginSid, leverage });
};

const changePassword = (loginSid: string, password: string) => {
	return fxbo.post<TSuccesfulResponse>('accounts/change/password', {
		loginSid,
		password,
		passwordType: 'changeAccountPassword',
	});
};

export const accountsService = { list, create, changeName, changeLeverage, changePassword };
