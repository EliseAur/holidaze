import { useMediaQuery } from "react-responsive";

/**
 * Custom hook to manage responsive breakpoints.
 * Returns boolean values indicating whether the current screen size matches specific breakpoints.
 *
 * @returns {Object} An object containing boolean values for each breakpoint.
 */
export default function useResponsiveBreakpoints() {
  const isXs = useMediaQuery({ maxWidth: 575 });
  const isSm = useMediaQuery({ minWidth: 576, maxWidth: 767 });
  const isMd = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isLg = useMediaQuery({ minWidth: 992 });

  return { isXs, isSm, isMd, isLg };
}
