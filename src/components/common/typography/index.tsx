import styled from 'styled-components';
import { HTMLAttributes, PropsWithChildren } from 'react';

type TypographyVariant =
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'heading4'
    | 'heading5'
    | 'heading6'
    | 'title'
    | 'content';

type TypographyColor =
    | 'primary'
    | 'secondary'
    | 'error'
    | 'white'
    | 'gray'
    | 'text-default'
    | 'text-disabled';

interface TypographyProps
    extends HTMLAttributes<HTMLElement>,
        PropsWithChildren {
    variant: TypographyVariant;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
    color?: TypographyColor;
}

const StyledTypography = styled.p<{
    variant: TypographyVariant;
    color?: TypographyColor;
}>`
    font: var(
        ${({ variant }) => {
            switch (variant) {
                case 'heading1':
                    return '--heading1';
                case 'heading2':
                    return '--heading2';
                case 'heading3':
                    return '--heading3';
                case 'heading4':
                    return '--heading4';
                case 'heading5':
                    return '--heading5';
                case 'heading6':
                    return '--heading6';
                case 'title':
                    return '--text-title';
                case 'content':
                    return '--text-content';
            }
        }}
    );
    color: ${({ color }) => (color ? `var(--${color})` : 'inherit')};
    margin: 0;
`;

const variantToElement = {
    heading1: 'h1',
    heading2: 'h2',
    heading3: 'h3',
    heading4: 'h4',
    heading5: 'h5',
    heading6: 'h6',
    title: 'p',
    content: 'p',
} as const;

export const Typography = ({ variant, as, ...props }: TypographyProps) => (
    <StyledTypography
        variant={variant}
        as={as || variantToElement[variant]}
        {...props}
    />
);
