import { Suspense, ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Flex, Spin } from 'antd';
import { GlobalErrorFallback } from './global-fallback';

export const GlobalBoundary = ({ children }: { children: ReactNode }) => {
    return (
        <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
            <Suspense
                fallback={
                    <Flex align="center" justify="center">
                        <Spin />
                    </Flex>
                }
            >
                {children}
            </Suspense>
        </ErrorBoundary>
    );
};
