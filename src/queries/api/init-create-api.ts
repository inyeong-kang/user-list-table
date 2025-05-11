/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';

import { ErrorResponse } from './types';

export function initCreateAPI(
    prefix: string,
): (
    baseURL: string,
    onRequest?: (
        config: InternalAxiosRequestConfig,
    ) => InternalAxiosRequestConfig,
    onRequestError?: (error: AxiosError) => Promise<AxiosError>,
    onResponse?: (config: AxiosResponse) => AxiosResponse,
    onResponseError?: (
        error: AxiosError<ErrorResponse>,
    ) => Promise<void | { data: any }> | Promise<AxiosError>,
) => AxiosInstance {
    axios.defaults.baseURL = prefix;
    axios.defaults.withCredentials = true;

    return (
        baseURL: string,
        onRequest?: (
            config: InternalAxiosRequestConfig,
        ) => InternalAxiosRequestConfig,
        onRequestError?: (error: AxiosError) => Promise<AxiosError>,
        onResponse?: (config: AxiosResponse) => AxiosResponse,
        onResponseError?: (
            error: AxiosError<ErrorResponse>,
        ) => Promise<void | { data: any }> | Promise<AxiosError>,
    ) => {
        const axiosInstance = axios.create({
            baseURL: `${prefix}${baseURL}`,
        });

        axiosInstance.interceptors.request.use(onRequest, onRequestError);
        axiosInstance.interceptors.response.use(onResponse, onResponseError);

        return axiosInstance;
    };
}
