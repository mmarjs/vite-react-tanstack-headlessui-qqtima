import { useTranslation } from 'react-i18next';
import { Input } from '~/components/input/Input';
import { hasFeature } from '~/config/features';
import type { TPinMethod } from '~/services/pin';

export const PinMethodsRadioGroup = ({
	method,
	setMethod,
}: {
	method: TPinMethod;
	setMethod: (_method: TPinMethod) => void;
}) => {
	const { t } = useTranslation(['profile']);

	// const isSmsSupported = hasFeature('sms');
	// if (!isSmsSupported) return null;

	return (
		<div className="flex gap-5">
			<label className="flex cursor-pointer gap-[10px] text-xs font-bold">
				<Input type="radio" checked={method === 'email'} onChange={() => setMethod('email')} />
				{t('account.method.sendViaEmail')}
			</label>

			<label className="flex cursor-pointer gap-[10px] text-xs font-bold">
				<Input type="radio" checked={method === 'phone'} onChange={() => setMethod('phone')} />
				{t('account.method.sendViaSms')}
			</label>
		</div>
	);
};
