import { create } from 'zustand';

type TDrawerStore = {
	isOpen: boolean;
	toggle: () => void;
	close: () => void;
};

// only one simultanious drawer is expected. To add more drawers, use a keyed map instead
export const useDrawerStore = create<TDrawerStore>((set) => ({
	isOpen: false,
	toggle: () => set((state) => ({ isOpen: !state.isOpen })),
	close: () => set({ isOpen: false }),
}));
