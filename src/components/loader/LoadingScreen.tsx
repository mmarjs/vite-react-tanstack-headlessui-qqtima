import { useNavigation } from 'react-router-dom';
import { useGlobalLoadingStore } from './globalLoadingStore';
import { Loader } from './Loader';

export const LoadingScreen = () => {
	const { state } = useNavigation();
	const isGlobalLoading = useGlobalLoadingStore((state) => state.isLoading);
	const isLoading = state === 'loading' || isGlobalLoading;

	if (!isLoading) return null;

	return <Loader />;
};
