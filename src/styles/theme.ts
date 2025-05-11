import type { DefaultTheme } from 'styled-components';
import { keyframes } from 'styled-components';

const breakpoint: Record<'sm' | 'md' | 'lg', `${number}px`> = {
    /** @media (min-width: 576px) { ... } */
    sm: '576px',
    /** @media (min-width: 768px) { ... } */
    md: '768px',
    /** @media (min-width: 1440px) { ... }*/
    lg: '1440px',
};

const zIndex = {
    modal: 200,
};

const animation = {
    skeletonGradientWave: keyframes`
  to {
      background-position-x: -200%;
    }
  `,
};

export type ZIndex = typeof zIndex;
export type Breakpoint = typeof breakpoint;
export type Animation = typeof animation;

export const theme: DefaultTheme = {
    breakpoint,
    zIndex,
    animation,
};

export const antdTheme = {
    token: {
        colorPrimary: '#4A7CFE',
        fontFamily: 'Pretendard',
    },
    components: {
        Button: {
            borderRadius: 8,
        },
    },
};
