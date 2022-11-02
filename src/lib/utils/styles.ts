import { Theme } from "@emotion/react";
import { Breakpoint } from 'styles/theme';

export const mediaQueryUp = (breakpoint: Breakpoint) => (
  ({ theme }: { theme: Theme }) => `@media (min-width: ${theme.breakpoints[breakpoint] + 0.01}px)`
);

export const mediaQueryUpTo = (breakpoint: Breakpoint) => (
  ({ theme }: { theme: Theme }) => `@media (max-width: ${theme.breakpoints[breakpoint]}px)`
);
