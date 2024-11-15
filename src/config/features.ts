type TEnvironment = 'local' | 'development' | 'staging' | 'production';
type TStage = 'off' | 'dev' | 'test' | 'prod';

const stages: Record<TStage, TEnvironment[]> = {
	off: [],
	dev: ['local', 'development'],
	test: ['local', 'development', 'staging'],
	prod: ['local', 'development', 'staging', 'production'],
};

// add feature and their current availability stage
const features: Record<string, TStage> = {
	sms: 'off',
};

const getEnv = (): TEnvironment => {
	if (window.location.hostname === 'localhost') return 'local';
	return import.meta.env.MODE as TEnvironment;
};

// request to check if feature is available in current environment
export const hasFeature = (feature: keyof typeof features) => {
	const stage = features[feature];
	return stages[stage].includes(getEnv());
};
