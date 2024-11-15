import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { Dialog as D, Transition } from '@headlessui/react';

type DialogProps = {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
};

export const Dialog = ({ isOpen, onClose, children }: DialogProps) => {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<D as="div" className="relative z-10" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-90"
					leave="ease-in duration-200"
					leaveFrom="opacity-90"
					leaveTo="opacity-0"
				>
					<div aria-hidden="true" className="fixed inset-0 bg-light dark:bg-dark" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<D.Panel className="transform overflow-hidden rounded-t-[10px] bg-light p-6 text-left align-middle shadow-10 transition-all before:absolute before:top-0 before:left-0 before:right-0 before:h-[10px] before:bg-primary dark:bg-background-elevated-dark">
								{children}
							</D.Panel>
						</Transition.Child>
					</div>
				</div>
			</D>
		</Transition>
	);
};
