import { Disclosure, Transition } from '@headlessui/react';
import { useMutation } from '@tanstack/react-query';
import { Trans, useTranslation } from 'react-i18next';
import { LeverageInput } from '~/components/accounts/open/LeverageInput';
import { PrimaryButton } from '~/components/button/PrimaryButton';
import { Header } from '~/components/dialog/Header';
import { ArrowDown } from '~/components/icons/ArrowDown';
import { Info } from '~/components/icons/Info';
import { TextLink } from '~/components/link/TextLink';
import { useGlobalLoadingStore } from '~/components/loader/globalLoadingStore';
import { DEFAULT_PLATFORM, platforms } from '~/config/accounts/open/platforms';
import { client, keys } from '~/config/query';
import { useZodForm } from '~/hooks/useZodForm';
import { useDialog } from '~/providers/DialogProvider';
import type { TAccount } from '~/services/accounts';
import { accountsService } from '~/services/accounts';
import { toastError, toastSuccess } from '~/utils/toast';
import { setLeverageSchema, type TSetLeverageSchema } from '~/validation/accounts/setLeverage';

export const ChangeMaxLeverageDialog = ({ account }: { account: TAccount }) => {
	const { t } = useTranslation(['accounts']);
	const dialog = useDialog();
	const globalLoading = useGlobalLoadingStore((state) => state.loading);

	const platform =
		platforms.find(({ title }) => title === account.type.platform)?.title || DEFAULT_PLATFORM;

	const { handleSubmit, getError, setValue } = useZodForm<TSetLeverageSchema>(setLeverageSchema, {
		leverage: account.leverage,
	});

	const mutation = useMutation({
		mutationFn: (data: TSetLeverageSchema) =>
			accountsService.changeLeverage(account.loginSid, data.leverage),
		onMutate: globalLoading.start,
		onSuccess: (result, data) => {
			toastSuccess(t('setLeverage.success', { leverage: data.leverage }));
			dialog.close();
		},
		onError: toastError,
		onSettled: () => {
			client.invalidateQueries({ queryKey: [keys.accounts] });
			globalLoading.end();
		},
	});

	return (
		<form
			name="set-max-leverage"
			className="flex w-[300px] flex-col gap-6 sm:w-[540px]"
			onSubmit={handleSubmit((data) => mutation.mutate(data))}
			noValidate
		>
			<Header>{t('setLeverage.title')}</Header>

			<div className="flex flex-col gap-6">
				<div>
					<span>{t('setLeverage.account')}: </span>
					<span className="font-bold">{account.type.title}</span>
				</div>

				<div aria-label="Leverage input">
					<LeverageInput
						platform={platform}
						defaultLeverage={account.leverage}
						setFormLeverage={(leverage) => setValue('leverage', leverage)}
						error={getError('leverage')}
					/>
				</div>

				<Disclosure as="div" className="flex flex-col rounded-[5px] px-4 py-4 text-xs shadow-10">
					<Disclosure.Button className="group flex items-center justify-between gap-2 p-0 font-normal">
						<div className="flex items-center gap-1">
							<Info />
							{t('setLeverage.tip')}
						</div>

						<ArrowDown
							width="8"
							height="8"
							strokeWidth="0.2"
							viewBox="-0.5 0 8.3 3"
							className="transition-transform duration-300 group-aria-expanded:rotate-180"
						/>
					</Disclosure.Button>

					<Transition
						className="overflow-hidden"
						enter="transition-all duration-300 ease-in"
						enterFrom="transform opacity-50 max-h-0"
						enterTo="transform opacity-100 max-h-screen"
						leave="transition-all duration-200 ease-out"
						leaveFrom="transform opacity-100 max-h-screen"
						leaveTo="transform opacity-50 max-h-0"
					>
						<Disclosure.Panel className="mt-2 pr-6">
							<Trans i18nKey="setLeverage.details" ns="accounts">
								<p className="py-2">
									Margin requirements for some instruments are fixed: e.g. margin requirements for
									BTCUSD is fixed at 1:400 (or 0.25% of trade amount).
									<TextLink to="/leverage#fixed">Read more</TextLink>
								</p>
								<p className="py-2">
									During high-impact news and before weekends and holidays, maximum leverage is
									capped at 1:200 for currency pairs and gold.
									<TextLink to="/leverage#capped">Read more</TextLink>
								</p>
								<p className="py-2">
									Maximum available leverage depends on your equity amount. Leverage of 1:2000 is
									only available when your equity is less than 5,000 USD.
									<TextLink to="/leverage#equity">Read more</TextLink>
								</p>
							</Trans>
						</Disclosure.Panel>
					</Transition>
				</Disclosure>
			</div>

			<PrimaryButton type="submit" className="h-10">
				{t('setLeverage.action')}
			</PrimaryButton>
		</form>
	);
};
