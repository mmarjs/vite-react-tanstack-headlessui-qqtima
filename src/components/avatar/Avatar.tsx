import { useAuth } from '~/providers/AuthProvider';
import type { TProfile } from '~/services/profile';

const abbreviate = (user: TProfile) => {
	const { firstName, lastName } = user;
	return `${firstName[0]}${lastName[0]}`.toUpperCase();
};

export const Avatar = () => {
	const { user } = useAuth();
	const abbreviation = user ? abbreviate(user) : '';

	return (
		<div
			aria-label="User avatar"
			role="img"
			className="flex h-10 w-10 items-center justify-center rounded-full bg-light font-bold text-dark"
		>
			{abbreviation}
		</div>
	);
};
