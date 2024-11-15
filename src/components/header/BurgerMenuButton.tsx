import { useDrawerStore } from '~/components/drawer/drawerStore';

export const BurgerMenuButton = () => {
	const isOpen = useDrawerStore((state) => state.isOpen);
	const toggle = useDrawerStore((state) => state.toggle);

	return (
		<button
			aria-label="Toggle menu"
			aria-expanded={isOpen}
			className="group flex h-full w-15 cursor-pointer flex-col items-center justify-center gap-[3px] rounded-none border-none bg-zinc-100 outline-none dark:bg-neutral-800"
			onClick={toggle}
		>
			<div className="scale-x-1 relative top-0 h-[3px] w-[16px] rounded-[3px] bg-dark transition group-aria-expanded:top-[6px] group-aria-expanded:rotate-45 group-aria-expanded:scale-x-[1.4] dark:bg-light" />
			<div className="tran relative h-[3px] w-[16px] rounded-[3px] bg-dark transition group-aria-expanded:opacity-0 dark:bg-light" />
			<div className="scale-x-1 relative top-0 h-[3px] w-[16px] rounded-[3px] bg-dark transition group-aria-expanded:top-[-6px] group-aria-expanded:rotate-[-45deg] group-aria-expanded:scale-x-[1.4] dark:bg-light" />
		</button>
	);
};
