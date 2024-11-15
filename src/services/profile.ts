import { fxbo } from '~/api/fxbo';
import type { TSuccesfulResponse } from './types';

export type TProfile = {
	id: number;
	cid: number;
	token: null;

	isIb: boolean;
	canRequestIb: boolean;
	ibLinksRestricted: boolean;
	canCreateIbLinks: boolean;

	clientType: 'Individual' | 'Corporate';
	title: string | null;
	firstName: string;
	lastName: string;
	country: string;
	phone: string;
	language: string;
	email: string;

	password: null;
	isVerified: boolean;

	notificationPreferences: TNotificationPreferences;
	birthDate: string;
	customFields: TCustomFields;
	financialPermissions: TFinancialPermission[];

	smsNotificationEnabled: boolean;
	twoFactorAuthEnabled: boolean;
	referralLinkId: null;
	firstDepositDate: null;
	firstDepositId: null;
	lastDepositId: null;
	lastDepositDate: null;
	lastTradedAt: null;

	emailVerified: boolean;
	phoneVerified: boolean;
};

export type TNotificationPreferences = {
	helpdesk: boolean;
	transfer: boolean;
	documents: boolean;
	marketing: boolean;
	ibNewReg: boolean;
	applications: boolean;
	transactions: boolean;
	paymentMethods: boolean;
};

export type TNotification = keyof TNotificationPreferences;

export type TNotificationOption = {
	key: TNotification;
	title: string;
	description: string;
	defaultValue: boolean;
};

type TCustomFields = { [customField: string]: string };

type TFinancialPermission = ['deposit', 'withdraw', 'transfer', 'ib transfer', 'ib withdraw'];

export type TQrCode = { url: string; manualCode: string };

const get = () => {
	if (!fxbo.isAuthorized()) return Promise.resolve({} as TProfile);
	return fxbo.get<TProfile>('profile');
};

const changeLanguage = (language: string) => {
	return fxbo.post<TProfile[]>('profile/change-language', { language });
};

const changePassword = (data: { oldPassword: string; newPassword: string }) => {
	return fxbo.post<TSuccesfulResponse>('profile/change-password', data);
};

const changeEmail = (data: { email: string; pin: string }) => {
	return fxbo.post<TSuccesfulResponse>('profile/change-email', data);
};

const changePhone = (data: { phone: string; pin: string }) => {
	return fxbo.post<TSuccesfulResponse>('profile/change-phone', data);
};

const getNotificationOptions = () => {
	if (!fxbo.isAuthorized()) return Promise.resolve([]);
	return fxbo.get<TNotificationOption[]>('profile/notification-preferences/options');
};

const changeNotificationPreferences = (preferences: { key: TNotification; value: boolean }[]) => {
	return fxbo.post<TProfile>('profile/change/notification-preferences', { preferences });
};

const generateQrCode = () => {
	return fxbo.post<TQrCode>('profile/two-factor/qr-code');
};

const enableTwoFactorAuth = (data: { code: string }) => {
	return fxbo.put<{ codes: string[] }>('profile/two-factor/enable', data);
};

const disableTwoFactorAuth = () => {
	return fxbo.delete('profile/two-factor');
};

export const profileService = {
	get,
	changeLanguage,
	changePassword,
	changeEmail,
	changePhone,
	getNotificationOptions,
	changeNotificationPreferences,
	generateQrCode,
	enableTwoFactorAuth,
	disableTwoFactorAuth,
};
