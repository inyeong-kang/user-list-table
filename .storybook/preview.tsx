import type { Preview } from '@storybook/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { initialize, mswLoader } from 'msw-storybook-addon';
import React from 'react';
import { GlobalStyle } from '../src/styles/globalStyle';

// MSW 초기화
initialize();

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
});

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
    loaders: [mswLoader],
};

export default preview;
