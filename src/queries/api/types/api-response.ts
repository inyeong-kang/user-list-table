/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';

export type APIResponse<T = any> = Promise<AxiosResponse<T>>;
