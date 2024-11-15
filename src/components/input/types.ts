import type { DetailedHTMLProps, InputHTMLAttributes, ReactNode, Ref } from 'react';

export type InputProps = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
> & {
	label?: string | ReactNode;
	inputRef?: Ref<HTMLInputElement>;
	error?: string;
	steps?: TStep[];
};

export type SelectProps = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
> & {
	label: string | ReactNode;
	options: TOption[];
	defaultOption?: TOption;
	value?: string; // set for controlled component only
	error?: string;
	maxHeight?: number;
};

export type TextAreaProps = DetailedHTMLProps<
	InputHTMLAttributes<HTMLTextAreaElement>,
	HTMLTextAreaElement
> & {
	label?: string | ReactNode;
	error?: string;
};

export type TOption = { value: string; label: string };

export type TStep = { value: number; label: string };
