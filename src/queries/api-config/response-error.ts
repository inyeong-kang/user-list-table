import { AxiosError } from 'axios';

import { ErrorResponse } from '@/queries';

async function handleUnauthorized(error: AxiosError<ErrorResponse>) {
    console.log(error);

    return {
        status: error.response?.status,
        data: error.response?.data,
    };
}

export async function responseError(error: AxiosError<ErrorResponse>) {
    const authError = error.response?.status === 401;
    const errorCode = error.response?.data?.data?.code;
    const isSessionExpired = errorCode?.includes('AUTH');

    if (authError && isSessionExpired) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response: any = await handleUnauthorized(error);

            return { status: response.status, ...response.data };
        } catch (error) {
            alert('로그아웃되었습니다.');
            window.location.href = '/';

            throw error;
        }
    }

    return Promise.reject(error);
}
