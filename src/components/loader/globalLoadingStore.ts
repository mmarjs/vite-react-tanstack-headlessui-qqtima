import { create } from 'zustand';

type TGlobalLoadingStore = {
	isLoading: boolean;
	loading: {
		start: VoidFunction;
		end: VoidFunction;
	};
};

export const useGlobalLoadingStore = create<TGlobalLoadingStore>((set) => ({
	isLoading: false,
	loading: {
		start: () => set(() => ({ isLoading: true })),
		end: () => set(() => ({ isLoading: false })),
	},
}));
