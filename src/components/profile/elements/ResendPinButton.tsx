import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextLink } from '~/components/link/TextLink';
import { PIN_RESEND_TIMEOUT } from '~/config/requests';

export const ResendPinButton = ({
	onClick,
	className = '',
}: {
	onClick: VoidFunction;
	className?: string;
}) => {
	const { t } = useTranslation(['profile']);
	const [timeLeft, setTimeLeft] = useState(PIN_RESEND_TIMEOUT);
	const interval = useRef<NodeJS.Timer | null>(null);

	const countdown = () => {
		setTimeLeft(PIN_RESEND_TIMEOUT);
		if (interval.current) clearInterval(interval.current);

		interval.current = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 0) {
					if (interval.current) clearInterval(interval.current);
					return prev;
				}

				return prev - 1;
			});
		}, 1000);
	};

	useEffect(countdown, []);

	const handleClick = () => {
		countdown();
		onClick();
	};

	return (
		<TextLink onClick={handleClick} disabled={timeLeft > 0} className={className}>
			{timeLeft > 0
				? t('account.pin.resendInXSeconds', { seconds: timeLeft })
				: t('account.pin.resend')}
		</TextLink>
	);
};
