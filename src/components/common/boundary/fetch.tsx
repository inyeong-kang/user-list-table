import { Flex, Spin } from 'antd';
import { Suspense, ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { FetchErrorFallback } from './fetch-fallback';

export const FetchBoundary = ({ children }: { children: ReactNode }) => {
    return (
        <ErrorBoundary FallbackComponent={FetchErrorFallback}>
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
