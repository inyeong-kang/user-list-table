import dayjs from 'dayjs';
import { FilterOption } from '@/types';
import { DEFAULT_DATE_FORMAT } from '@/constants';
import { isString } from './type-check';

export const getFilterOptions = <T extends Record<string, unknown>>(
    data: T[],
    dataIndex: keyof T,
): FilterOption[] => {
    const uniqueOptions = new Map<string, string>();

    data.forEach((item) => {
        const recordValue = item[dataIndex];

        if (!recordValue) {
            return;
        }

        const displayValue =
            dayjs(recordValue as string).isValid() && isString(recordValue)
                ? dayjs(recordValue).format(DEFAULT_DATE_FORMAT)
                : String(recordValue);

        if (!uniqueOptions.has(displayValue)) {
            uniqueOptions.set(displayValue, String(recordValue));
        }
    });

    return Array.from(uniqueOptions).map(([text, value]) => ({
        text,
        value,
    }));
};
