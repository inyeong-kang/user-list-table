import { Checkbox, type MenuProps } from 'antd';
import { FilterOption, User } from '@/types';
import { DEFAULT_DATE_FORMAT } from './common';
import dayjs from 'dayjs';

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
] as const;

export const EMAIL_FILTER_OPTIONS: FilterOption[] = [
    {
        value: 'true',
        text: '선택됨',
    },
    {
        value: 'false',
        text: '선택 안함',
    },
] as const;

export const TABLE_COLUMN_INFO: Record<keyof User, object> = {
    name: {
        title: '이름',
        minWidth: 120,
        width: 120,
        ellipsis: true,
    },
    address: {
        title: '주소',
        minWidth: 250,
        ellipsis: true,
        render: (address: string) => address || '-',
    },
    memo: {
        title: '메모',
        minWidth: 250,
        ellipsis: true,
        render: (memo: string) => memo || '-',
    },
    joinDate: {
        title: '가입일',
        minWidth: 200,
        ellipsis: true,
        render: (date: string) => dayjs(date).format(DEFAULT_DATE_FORMAT),
    },
    action: {
        title: '직업',
        minWidth: 250,
        render: (action: User['action']) => USER_ACTION_TYPE[action] || '-',
    },
    hasAgreedEmail: {
        title: '이메일 수신 동의',
        minWidth: 150,
        render: (agreed: boolean) => <Checkbox checked={agreed} />,
    },
    id: { title: '', dataIndex: 'more', key: 'more', width: 48, minWidth: 48 },
} as const;
