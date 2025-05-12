import { FilterOption } from '@/types';
import type { MenuProps } from 'antd';

export const USER_ACTION_TYPE = {
    DEV: '개발자',
    DESIGN: '디자이너',
    PO: 'PO',
} as const;

export const MORE_CONTROL_OPTIONS: MenuProps['items'] = [
    {
        key: 'edit',
        label: '수정',
    },
    {
        type: 'divider',
    },
    {
        key: 'delete',
        label: '삭제',
        danger: true,
    },
] as const;

export const ACTION_FILTER_OPTIONS: FilterOption[] = [
    {
        value: 'DEV',
        text: '개발자',
    },
    {
        value: 'DESIGN',
        text: '디자이너',
    },
    {
        value: 'PO',
        text: 'PO',
    },
];

export const EMAIL_FILTER_OPTIONS: FilterOption[] = [
    {
        value: 'true',
        text: '선택됨',
    },
    {
        value: 'false',
        text: '선택 안함',
    },
];
