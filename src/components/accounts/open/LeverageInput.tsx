import { type ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '~/components/input/Input';
import { Toggle } from '~/components/input/Toggle';
import type { TPlatform } from '~/config/accounts/open/platforms';
import { formatPlaceholder } from '~/utils/form';
import { getLeverageSteps, findClosestStep } from '~/utils/leverage';

type LeverageInputProps = {
	platform: TPlatform;
	defaultLeverage: number;
	setFormLeverage: (leverage: number) => void;
	error?: string;
};

export const LeverageInput = ({
	platform,
	defaultLeverage,
	setFormLeverage,
	error,
}: LeverageInputProps) => {
	const { t } = useTranslation(['accounts']);
	const [custom, setCustom] = useState(false);

	const leverageSteps = getLeverageSteps(platform);
	const [leverage, setLeverage] = useState(defaultLeverage);
	const [step, setStep] = useState(findClosestStep(leverageSteps, defaultLeverage));

	useEffect(() => {
		if (custom) return;

		// ensure range UI displays the actual leverage value
		// if not, change leverage to the closest range step
		const leverageSteps = getLeverageSteps(platform);
		const closestStep = findClosestStep(leverageSteps, leverage);
		const closesStepValue = leverageSteps[closestStep]?.value;

		if (closesStepValue && closesStepValue !== leverage) {
			setStep(closestStep);
			setLeverage(closesStepValue);
			setFormLeverage(closesStepValue);
		}
	}, [platform, leverage, setFormLeverage, custom]);

	const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
		const leverage = e.target.valueAsNumber;
		const step = findClosestStep(leverageSteps, leverage);

		setStep(step);
		setLeverage(leverage);

		setFormLeverage(leverage);
	};

	const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
		const step = e.target.valueAsNumber;
		const leverage = leverageSteps[step].value;

		setStep(step);
		setLeverage(leverage);

		setFormLeverage(leverage);
	};

	const inputProps = {
		name: 'leverage',
		label: t('open.leverage.label'),
		placeholder: formatPlaceholder(t('open.leverage.placeholder')),
		steps: custom ? [] : leverageSteps,
		className: custom ? (error ? 'bg-error-background' : 'bg-transparent') : 'w-[95%]',
		type: custom ? 'number' : 'range',
		min: custom ? 1 : 0,
		max: custom ? 100000 : leverageSteps.length - 1,
		value: custom ? leverage : step,
		onChange: custom ? handleNumberChange : handleRangeChange,
	};

	return (
		<div aria-label="Leverage input wrapper" className="relative h-20">
			<div className="absolute right-0 z-10 flex items-end gap-2">
				{error && <span className="text-[10px] text-error">{error}</span>}
				<Toggle checked={custom} onChange={setCustom} label={t('open.leverage.custom')} />
			</div>

			<Input {...inputProps} />
		</div>
	);
};
