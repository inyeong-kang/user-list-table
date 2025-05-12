import type { Preview } from '@storybook/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import React from 'react';
import { GlobalStyle } from '../src/styles/globalStyle';

const queryClient = new QueryClient();

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        (Story) => (
            <QueryClientProvider client={queryClient}>
                <GlobalStyle />
                <Story />
            </QueryClientProvider>
        ),
    ],
};

export default preview;
