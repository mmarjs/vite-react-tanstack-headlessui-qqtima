import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ChangeEvent } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Tooltip } from '~/components/tooltip/Tooltip';
import {
	fetchNotificationOptionsQuery,
	fetchProfileQuery,
	type TProfileLoaderData,
} from '~/routes/pages/profile/profileLoader';
import {
	profileService,
	type TProfile,
	type TNotification,
	type TNotificationPreferences,
} from '~/services/profile';
import { toastError } from '~/utils/toast';

export const NotificationPreferences = () => {
	const client = useQueryClient();
	const loaderData = useLoaderData() as TProfileLoaderData;
	const { data: profile } = useQuery({ ...fetchProfileQuery, initialData: loaderData[0] });
	const { data: notificationOptions } = useQuery({
		...fetchNotificationOptionsQuery,
		initialData: loaderData[1],
	});

	const mutation = useMutation({
		mutationFn: (data) => profileService.changeNotificationPreferences([data]),
		onMutate: async ({ key, value }: { key: TNotification; value: boolean }) => {
			await client.cancelQueries(fetchProfileQuery);

			const oldProfile = client.getQueryData<TProfile>(fetchProfileQuery.queryKey);
			if (!oldProfile) throw new Error('Profile not loaded');

			client.setQueryData<TProfile>(fetchProfileQuery.queryKey, {
				...oldProfile,
				notificationPreferences: { ...oldProfile.notificationPreferences, [key]: value },
			});

			return { oldProfile };
		},
		onError: (error: Error, data, context) => {
			client.setQueryData<TProfile>(fetchProfileQuery.queryKey, context?.oldProfile);
			toastError(error.message);
		},
		onSettled: () => {
			client.invalidateQueries(fetchProfileQuery);
		},
	});

	const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		const key = event.target.name as keyof TNotificationPreferences;
		const value = !profile.notificationPreferences[key];
		mutation.mutate({ key, value });
	};

	return (
		<form
			name="notification preferences"
			className="mr-[-28px] flex max-w-[460px] flex-wrap items-center justify-end gap-x-[10px] gap-y-[6px]"
		>
			{notificationOptions.map(({ key, title, description }) => {
				const isEnabled = profile.notificationPreferences[key];
				return (
					<Tooltip key={key} label={description} placement="top">
						<label
							aria-current={isEnabled}
							className="flex cursor-pointer select-none truncate rounded-[9px] bg-neutral-200 px-2 py-[1px] text-neutral-400 transition aria-current:bg-primary aria-current:text-light"
						>
							<input
								type="checkbox"
								className="hidden"
								checked={isEnabled}
								onChange={handleCheckboxChange}
								name={key}
							/>
							{title}
						</label>
					</Tooltip>
				);
			})}
		</form>
	);
};
