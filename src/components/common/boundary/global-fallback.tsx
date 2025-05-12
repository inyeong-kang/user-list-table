import { FallbackProps } from 'react-error-boundary';
import { getErrorDataByCode } from '@/utils';
import { Button, Flex } from 'antd';
import { Typography } from '../typography';

export const GlobalErrorFallback = ({
    error,
    resetErrorBoundary,
}: FallbackProps) => {
    const navigatePage = (to: string) => {
        // resetErrorBoundary를 호출하여 에러를 초기화
        resetErrorBoundary();
        window.location.href = to;
    };
    const errorData = getErrorDataByCode(error);
    return (
        <Flex vertical align="center" justify="center" gap={16}>
            <Typography variant="heading5">{errorData.code}</Typography>
            <Typography variant="content">{errorData.message}</Typography>
            <Button
                onClick={() =>
                    navigatePage(errorData.requireLogin ? '/login' : '/')
                }
            >
                {errorData.requireLogin ? '로그인 이동' : '메인화면 이동'}
            </Button>
        </Flex>
    );
};
