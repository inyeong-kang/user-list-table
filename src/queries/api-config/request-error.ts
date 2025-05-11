import { AxiosError } from 'axios';

export function requestError(error: AxiosError) {
    return Promise.reject(error);
}
