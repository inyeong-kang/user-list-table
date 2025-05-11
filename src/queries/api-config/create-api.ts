import { initCreateAPI } from '../api/init-create-api';
import { request } from './request';
import { requestError } from './request-error';
import { response } from './response';
import { responseError } from './response-error';

const BASE_URL = import.meta.env.VITE_DEV_API_URL;

export const createAPI = (path: string) =>
    initCreateAPI(`${BASE_URL}`)(
        path,
        request,
        requestError,
        response,
        responseError,
    );
