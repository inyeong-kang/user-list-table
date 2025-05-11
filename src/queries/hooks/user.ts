import {
    useMutation,
    UseMutationResult,
    useQuery,
    UseQueryResult,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { User } from '@/types';
import { ErrorResponse, UserAPI } from '../api';
import { USER_QUERY_KEYS } from '../keys';

export const useUserListQuery = (): UseQueryResult<
    User[],
    AxiosError<ErrorResponse>
> => {
    return useQuery([USER_QUERY_KEYS.LIST], UserAPI.getUsers, {
        suspense: true,
    });
};

export const useCreateUserMutation = (): UseMutationResult<
    AxiosResponse,
    AxiosError,
    {
        data: User;
        errorCallback: (error: AxiosError<ErrorResponse>) => void;
        successCallback: () => void;
    }
> => {
    return useMutation(
        ({ data }) => {
            return UserAPI.createUser(data);
        },
        {
            onError: (error: AxiosError<ErrorResponse>, { errorCallback }) => {
                errorCallback(error);
            },
            onSuccess: (_, { successCallback }) => {
                successCallback();
            },
        },
    );
};

export const useUpdateUserMutation = (): UseMutationResult<
    AxiosResponse,
    AxiosError,
    {
        data: User;
        errorCallback: (error: AxiosError<ErrorResponse>) => void;
        successCallback: () => void;
    }
> => {
    return useMutation(
        ({ data }) => {
            return UserAPI.updateUser(data);
        },
        {
            onError: (error: AxiosError<ErrorResponse>, { errorCallback }) => {
                errorCallback(error);
            },
            onSuccess: (_, { successCallback }) => {
                successCallback();
            },
        },
    );
};

export const useDeleteUserMutation = (): UseMutationResult<
    AxiosResponse,
    AxiosError,
    {
        id: number;
        errorCallback: (error: AxiosError<ErrorResponse>) => void;
        successCallback: () => void;
    }
> => {
    return useMutation(
        ({ id }) => {
            return UserAPI.deleteUser(id);
        },
        {
            onError: (error: AxiosError<ErrorResponse>, { errorCallback }) => {
                errorCallback(error);
            },
            onSuccess: (_, { successCallback }) => {
                successCallback();
            },
        },
    );
};
