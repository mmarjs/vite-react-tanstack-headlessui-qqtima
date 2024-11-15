declare type WebSDKEvents = {
	['idCheck.onReady']: unknown;
	['idCheck.onInitialized']: unknown;
	['idCheck.onStepInitiated']: {
		idDocSetType: string;
		types: string[];
		videoRequired?: string;
	};
	['idCheck.stepCompleted']: {
		idDocSetType: string;
	};
	['idCheck.onApplicantLoaded']: {
		applicantId: string;
	};
	['idCheck.onApplicantSubmitted']: unknown;
	['idCheck.applicantStatus']: {
		reprocessing: boolean;
		levelName: string;
		creationDate: string;
		expireDate: string;
		reviewStatus: string;
		autoChecked: boolean;
	};
	['idCheck.onApplicantResubmitted']: unknown;
	['idCheck.onActionSubmitted']: unknown;
	['idCheck.actionCompleted']: {
		applicantActionId: string;
	};
	['idCheck.moduleResultPresented']: {
		answer: string;
	};
	['idCheck.onResize']: {
		height: number;
	};
	['idCheck.onVideoIdentCallStarted']: unknown;
	['idCheck.onVideoIdentModeratorJoined']: unknown;
	['idCheck.onVideoIdentCompleted']: unknown;
	['idCheck.onUploadError']: SnsError;
	['idCheck.onUploadWarning']: SnsError;
	['idCheck.onError']: SnsError;
};

type AnyEventName = keyof WebSDKEvents;

type I18NArray = I18NValue[];
type I18NValue = string | I18NDictionary | I18NArray;

interface UIConf {
	customCss?: string;
	customCssStr?: string;
	customBodyClass?: string | string[];
	scrollIntoView?: boolean;
}

interface DocDefinitions {
	[key: string]: {
		country: string;
		idDocType: string;
	};
}

interface DocsByCountries {
	[key: string]: {
		[key: string]: {
			supported: boolean;
			doubleSided: boolean;
		};
	};
}
interface UIConf {
	customCss?: string;
	customCssStr?: string;
	customBodyClass?: string | string[];
	scrollIntoView?: boolean;
}

interface SnsWebSdkBaseConfig {
	lang?: string;
	email?: string;
	phone?: string;
	country?: string;
	uiConf?: UIConf;
	i18n?: I18NDictionary;
	documentsByCountries?: DocsByCountries;
	documentDefinitions?: DocDefinitions;
}

interface I18NDictionary {
	[key: string]: I18NValue;
}

interface SnsWebSdkOptions {
	addViewportTag?: boolean;
	adaptIframeHeight?: boolean;
	debug?: boolean;
}

interface SnsError {
	code: string;
	error: string;
}

interface SnsWebSdkOptions {
	addViewportTag?: boolean;
	adaptIframeHeight?: boolean;
	debug?: boolean;
}

type MessageHandler = <EventType extends AnyEventName = AnyEventName>(
	type: AnyEventName,
	payload: EventPayload<EventType>,
) => void;

interface SumsubWebSdkProps {
	accessToken: string;
	baseUrl?: string;
	testEnv?: boolean;
	expirationHandler: () => Promise<string>;
	config?: SnsWebSdkBaseConfig;
	options?: Partial<SnsWebSdkOptions>;
	onMessage?: MessageHandler;
	onError?: (error: SnsError) => void;
	force?: boolean;
	style?: Record<string, unknown>;
	className?: string;
}

// define type for module import SumsubWebSdk from '@sumsub/websdk-react';
declare module '@sumsub/websdk-react' {
	export default class SumsubWebSdk extends React.Component<SumsubWebSdkProps> {
		private readonly div;
		constructor(props: SumsubWebSdkProps);
		shouldComponentUpdate(nextProps: Readonly<SumsubWebSdkProps>): boolean;
		componentDidMount(): void;
		renderSDK(): void;
		render(): JSX.Element;
	}
}
