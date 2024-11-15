import type { SVGProps } from 'react';
import { Approved } from '~/components/icons/Approved';
import { Declined } from '~/components/icons/Declined';
import { Expired } from '~/components/icons/Expired';
import { NotUploaded } from '~/components/icons/NotUploaded';
import { Pending } from '~/components/icons/Pending';

export type TStatusData = {
	label: string;
	color: string;
	Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

export const statuses: Record<string, TStatusData> = {
	approved: { label: 'status.approved', color: '#00FF67', Icon: Approved },
	pending: { label: 'status.pending', color: '#FFCB4E', Icon: Pending },
	declined: { label: 'status.declined', color: '#FF4E4E', Icon: Declined },
	expired: { label: 'status.expired', color: '#FF4E4E', Icon: Expired },
	notUploaded: { label: 'status.notUploaded', color: '#FF4E4E', Icon: NotUploaded },
};

export const getStatusData = (status: string): TStatusData => {
	const data = statuses[status];
	if (!data) throw new Error(`Status "${status}" is not supported in statuses config`);
	return data;
};
