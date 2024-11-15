import type { TStep } from '~/components/input/types';
import { type TPlatform, platforms } from '~/config/accounts/open/platforms';

export function findClosestStep(leverageSteps: TStep[], leverage: number) {
	const diffs = leverageSteps.map((step) => Math.abs(step.value - leverage));
	const minDiff = Math.min(...diffs);
	const closestStepIndex = diffs.findIndex((diff) => diff === minDiff);
	return closestStepIndex;
}

export function getLeverageSteps(platform: TPlatform) {
	const leverageSteps = platforms.find(({ title }) => title === platform)?.leverages;
	if (!leverageSteps) return [];

	return leverageSteps.map((leverage) => ({
		value: leverage,
		label: `1:${leverage}`,
	}));
}

export function getDefaultLeveage(platform: TPlatform) {
	const leverage = platforms.find(({ title }) => title === platform)?.defaultLeverage;
	return leverage || 1;
}
