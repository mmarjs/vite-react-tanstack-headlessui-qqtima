import { useEffect, useRef, useState } from 'react';
import type { TStep } from '../../types';

export const Datalist = (props: { id: string; steps: TStep[] }) => {
	const ref = useRef<HTMLDataListElement>(null);
	const fullWidth = useRef<number | null>(null);

	const [steps, setSteps] = useState(props.steps);

	// measure the width of the datalist on mount
	useEffect(() => {
		if (ref.current) fullWidth.current = ref.current.scrollWidth;
	}, []);

	// on resize, check if overflowing. If so remove each 2nd step, but not the last one
	useEffect(() => {
		const resizeObserver = new ResizeObserver(() => {
			if (fullWidth.current && ref.current) {
				const isOverflowing = fullWidth.current > ref.current.clientWidth;
				const newSteps = isOverflowing
					? props.steps.filter((_, i) => i % 2 === 0 || i === props.steps.length - 1)
					: props.steps;
				setSteps(newSteps);
			}
		});

		const { current } = ref;
		if (current) resizeObserver.observe(current);

		return () => {
			if (current) resizeObserver.unobserve(current);
		};
	}, [props.steps]);

	return (
		<datalist
			id={props.id}
			ref={ref}
			className="mt-1 grid auto-cols-fr grid-flow-col justify-items-start text-[11px] text-gray-400 sm:text-xs"
		>
			{steps.map(({ value, label }) => (
				<option
					key={value}
					value={value}
					label={label}
					className="before:flex before:justify-center before:content-['|']"
				/>
			))}
		</datalist>
	);
};
