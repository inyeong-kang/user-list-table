import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, theme } from 'antd';
import { ThemeProvider } from 'styled-components';

import App from './app';
import { antdTheme, GlobalStyle } from './styles';

async function enableMocking() {
    if (process.env.NODE_ENV !== 'development') {
        return;
    }

    const { worker } = await import('./mocks/browser');
    return worker.start();
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retry: false,
        },
    },
});

enableMocking().then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <ConfigProvider theme={antdTheme}>
                    <ThemeProvider theme={theme}>
                        <GlobalStyle />
                        <App />
                    </ThemeProvider>
                </ConfigProvider>
            </QueryClientProvider>
        </React.StrictMode>,
    );
});
