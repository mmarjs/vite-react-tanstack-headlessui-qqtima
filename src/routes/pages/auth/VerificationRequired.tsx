import { useLoaderData } from 'react-router-dom';
import { TextLink } from '~/components/link/TextLink';
import { notImplemented } from '~/utils/functional';

const VerificationRequired = () => {
	const email = useLoaderData() as string;

	// TODO: implement resend verification link

	return (
		<div className="flex flex-col gap-6 md:gap-8">
			<h1 className="text-2xl font-bold">Verification Required</h1>
			<p className="text-xs">
				<>
					Verification link is sent to <i>{email}</i>. If you did not receive the email, please
					check your spam folder or{' '}
					<TextLink onClick={notImplemented}>click here to resend</TextLink>.
				</>
			</p>
		</div>
	);
};

export default VerificationRequired;
