import type { MouseEvent, ChangeEvent } from 'react';
import { forwardRef, useState, useCallback, useEffect, useRef } from 'react';
import { ArrowDown } from '~/components/icons/ArrowDown';
import { Search } from '~/components/icons/Search';
import { InputContainer } from './variants/elements/InputContainer';
import { Option } from './variants/elements/Option';
import type { SelectProps, TOption } from './types';
import { useTranslation } from 'react-i18next';

export const Select = forwardRef<HTMLInputElement, SelectProps>(
	({ label, options, value, error, onChange, defaultOption, maxHeight = 220, ...props }, ref) => {
		const { t } = useTranslation(['common']);
		const containerRef = useRef<HTMLDivElement | null>(null);

		const [showOptions, setShowOptions] = useState(false);
		const [localValue, setLocalValue] = useState(''); // local value for uncontrolled component

		const [search, setSearch] = useState('');
		const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
			setSearch(e.target.value);
		};

		const visibleOptions = options.filter((option) => new RegExp(search, 'i').test(option.label));
		const currentValue = value ?? localValue;
		const currentOption =
			options.find(({ value }) => value === currentValue) || defaultOption || options[0];

		const handleChange = useCallback(
			(e: MouseEvent<HTMLDivElement>, option: TOption) => {
				setShowOptions(false);
				setSearch('');
				setLocalValue(option.value);
				// trigger form change and validation
				const pseudoEvent = {
					target: {
						type: '', // keep empty
						name: props.name || '',
						value: option.value,
					},
				} as ChangeEvent<HTMLInputElement>;
				onChange?.(pseudoEvent);
			},
			[onChange, props.name],
		);

		useEffect(() => {
			const handleKeyDown = (e: KeyboardEvent) => {
				const activeElement = document.activeElement;

				if (e.key === 'Escape') {
					setShowOptions(false);
					setSearch('');
				}

				if (e.key === 'Enter' && activeElement) {
					const role = activeElement.getAttribute('role');
					if (role === 'combobox') setShowOptions((shown) => !shown);
					if (role === 'option') {
						handleChange(null as unknown as MouseEvent<HTMLDivElement>, {
							value: activeElement.getAttribute('data-value') || '',
							label: activeElement.getAttribute('data-label') || '',
						});
					}
				}
			};

			const container = containerRef.current;
			container?.addEventListener('keydown', handleKeyDown);
			return () => container?.removeEventListener('keydown', handleKeyDown);
		}, [handleChange]);

		return (
			<InputContainer label={label} error={error} containerRef={containerRef}>
				<input type="hidden" ref={ref} {...props} value={currentOption.value} />

				<div className="relative flex items-center">
					<input
						readOnly
						role="combobox"
						type="select"
						className={`w-full cursor-pointer border-0 border-b border-primary px-[6px] py-1 ${
							error ? 'bg-error-background' : 'bg-transparent'
						}`}
						value={currentOption.label}
						onClick={() => setShowOptions((shown) => !shown)}
					/>

					<ArrowDown
						width="10"
						height="10"
						aria-current={showOptions}
						className="absolute right-[13px] transition duration-300 aria-current:rotate-180"
					/>
				</div>

				{showOptions && (
					<div
						aria-label="Click outside to close options"
						className="fixed inset-0 z-0 m-0"
						onClick={() => setShowOptions(false)}
					/>
				)}

				<div
					aria-label="Select an option"
					aria-expanded={showOptions}
					role="listbox"
					className="invisible absolute top-12 left-0 z-10 w-full rounded-b-lg border-none bg-light py-2 opacity-0 shadow-10 transition-all duration-300 aria-expanded:visible aria-expanded:opacity-100 dark:bg-dark"
				>
					<div role="search" className="mb-1 flex items-center gap-[6px] px-5 py-1">
						<Search width="14" height="14" className="text-primary" />

						<input
							type="search"
							value={search}
							onChange={handleSearch}
							placeholder={`${t('search')}...`}
							className="w-full bg-transparent outline-offset-2"
							autoFocus
						/>
					</div>

					<hr tabIndex={-1} />

					<div role="list" className="my-1 overflow-y-auto" style={{ maxHeight }}>
						{defaultOption && (
							<Option
								option={defaultOption}
								isSelected={!currentValue}
								handleChange={handleChange}
							/>
						)}

						{visibleOptions.map((option) => (
							<Option
								key={option.value}
								option={option}
								isSelected={option.value === currentValue}
								handleChange={handleChange}
							/>
						))}
					</div>

					{visibleOptions.length === 0 && <div className="px-2 py-1 text-gray-400">No results</div>}
				</div>
			</InputContainer>
		);
	},
);

Select.displayName = 'Select';
