import { AxiosResponse } from 'axios';

export function response(responseData: AxiosResponse): AxiosResponse {
    return responseData.data;
}
