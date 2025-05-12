import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { FallbackProps } from 'react-error-boundary';
import { Button, Flex } from 'antd';
import { getErrorDataByCode } from '@/utils';
import { Typography } from '../typography';

export const FetchErrorFallback = ({
    error,
    resetErrorBoundary,
}: FallbackProps) => {
    const { reset } = useQueryErrorResetBoundary();
    const errorData = getErrorDataByCode(error);

    // 인증이 필요한 에러일 경우 상위 Boundary로 Error를 전파
    if (errorData.requireLogin) throw error;

    const handleClickReset = () => {
        resetErrorBoundary();
        reset();
    };

    return (
        <Flex vertical align="center" justify="center" gap={16}>
            <Typography variant="heading5">{errorData.code}</Typography>
            <Typography variant="content">{errorData.message}</Typography>
            <Button onClick={handleClickReset}>재시도</Button>
        </Flex>
    );
};
