import { mediaQueries } from '~/config/breakpoints';
import { useMediaQuery } from './useMediaQuery';
import type { breakpoints } from '~/config/breakpoints';

export const useBreakpoint = (breakpoint: keyof typeof breakpoints) => {
	return useMediaQuery(mediaQueries[breakpoint]);
};
