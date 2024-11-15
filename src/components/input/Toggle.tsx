import { Switch } from '@headlessui/react';

type ToggleProps = {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label?: string | null;
};

export const Toggle = ({ checked, onChange, label }: ToggleProps) => {
	return (
		<Switch.Group>
			{label && <Switch.Label className="text-xs">{label}</Switch.Label>}

			<Switch
				checked={checked}
				onChange={onChange}
				className={`${
					checked ? 'bg-primary' : 'bg-neutral-400'
				} relative inline-flex h-[16px] w-[28px] items-center rounded-full p-0 transition-colors`}
			>
				<span
					className={`${
						checked ? 'translate-x-3' : 'translate-x-[1px]'
					} h-[13px] w-[13px] transform rounded-full bg-light transition-transform`}
				/>
			</Switch>
		</Switch.Group>
	);
};
