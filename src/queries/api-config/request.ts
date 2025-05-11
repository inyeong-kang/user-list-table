import { InternalAxiosRequestConfig } from 'axios';

export function request(
    config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig {
    return {
        ...config,
        withCredentials: true,
    };
}
