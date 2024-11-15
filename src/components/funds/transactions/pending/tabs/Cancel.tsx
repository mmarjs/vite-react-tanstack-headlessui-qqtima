import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { CancelTransaction } from '~/components/icons/CancelTransaction';
import { useGlobalLoadingStore } from '~/components/loader/globalLoadingStore';
import { Tooltip } from '~/components/tooltip/Tooltip';
import { client, keys } from '~/config/query';
import { transactionsService } from '~/services/transactions';
import { toastError, toastSuccess } from '~/utils/toast';

export const Cancel = ({ id, canBeCanceled }: { id: string; canBeCanceled: boolean }) => {
	const { t } = useTranslation(['funds']);
	const globalLoading = useGlobalLoadingStore((state) => state.loading);

	const mutation = useMutation({
		mutationFn: () => transactionsService.cancel(id),
		onMutate: globalLoading.start,
		onSuccess: () => toastSuccess(t('transactions.pending.cancel.success')),
		onError: toastError,
		onSettled: () => {
			client.invalidateQueries({ queryKey: [keys.pendingTransactions] });
			client.invalidateQueries({ queryKey: [keys.transactionsHistory] });
			globalLoading.end();
		},
	});

	if (!canBeCanceled) return null;

	return (
		<button
			className="flex content-center rounded-none fill-primary p-1 text-dark transition-colors hover:text-primary dark:text-light"
			onClick={() => mutation.mutate()}
		>
			<Tooltip label={t('transactions.pending.cancel.tooltip')} placement="left">
				<CancelTransaction width={33} />
			</Tooltip>
		</button>
	);
};
