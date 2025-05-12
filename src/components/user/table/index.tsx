import type {
    TableRowSelection,
    ColumnsType,
    FilterDropdownProps,
} from 'antd/es/table/interface';
import { useQueryClient } from '@tanstack/react-query';
import { MoreOutlined } from '@ant-design/icons';
import { Table, Button, Checkbox, Dropdown, message } from 'antd';
import dayjs from 'dayjs';
import { useState, Key } from 'react';
import {
    DEFAULT_DATE_FORMAT,
    USER_ACTION_TYPE,
    MORE_CONTROL_OPTIONS,
    EMAIL_FILTER_OPTIONS,
    ACTION_FILTER_OPTIONS,
} from '@/constants';
import {
    useDeleteUserMutation,
    USER_QUERY_KEYS,
    useUserListQuery,
} from '@/queries';
import { User, FilterOption } from '@/types';
import { UserFilterOptionList } from './filter-option-list';

interface UserTableProps {
    setModalContext: (user: User | null, open: boolean) => void;
}

export const UserTable = ({ setModalContext }: UserTableProps) => {
    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = message.useMessage();
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

    const { data: users = [], isLoading } = useUserListQuery();
    const { mutate: deleteMutate } = useDeleteUserMutation();

    const rowSelection: TableRowSelection<User> = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys: Key[]) => {
            setSelectedRowKeys(newSelectedRowKeys);
        },
        columnWidth: 32,
    };

    const handleMenuClick = (key: string, record: User) => {
        switch (key) {
            case 'edit':
                setModalContext(record, true);
                break;
            case 'delete':
                deleteMutate({
                    id: record.id,
                    successCallback: () => {
                        queryClient.invalidateQueries([USER_QUERY_KEYS.LIST]);
                        messageApi.open({
                            type: 'success',
                            content: `${record.name} 회원이 삭제되었습니다.`,
                        });
                    },
                    errorCallback: () => {
                        messageApi.open({
                            type: 'error',
                            content: `${record.name} 회원 삭제 실패`,
                        });
                    },
                });
                break;
        }
    };

    const getFilterOptions = (
        data: User[],
        dataIndex: keyof User,
    ): FilterOption[] => {
        const uniqueOptions = new Map<string, string>();

        data.forEach((user) => {
            const displayValue =
                dataIndex === 'joinDate'
                    ? dayjs(user[dataIndex]).format(DEFAULT_DATE_FORMAT)
                    : String(user[dataIndex]);
            if (!uniqueOptions.has(displayValue)) {
                uniqueOptions.set(displayValue, String(user[dataIndex]));
            }
        });

        return Array.from(uniqueOptions).map(([text, value]) => ({
            text,
            value,
        }));
    };

    const getFilterDropdownProps = (
        dataIndex: keyof User,
        customOptions?: FilterOption[],
    ) => ({
        filterDropdown: (props: FilterDropdownProps) => (
            <UserFilterOptionList
                {...props}
                options={customOptions || getFilterOptions(users, dataIndex)}
            />
        ),
        onFilter: (value: Key | boolean, record: User) =>
            String(record[dataIndex]) === String(value),
    });

    const columns: ColumnsType<User> = [
        {
            title: '이름',
            dataIndex: 'name',
            key: 'name',
            minWidth: 120,
            width: 120,
            ellipsis: true,
            ...getFilterDropdownProps('name'),
        },
        {
            title: '주소',
            dataIndex: 'address',
            key: 'address',
            minWidth: 250,
            ellipsis: true,
            render: (address: string) => address || '-',
            ...getFilterDropdownProps('address'),
        },
        {
            title: '메모',
            dataIndex: 'memo',
            key: 'memo',
            minWidth: 250,
            render: (memo: string) => memo || '-',
            ellipsis: true,
            ...getFilterDropdownProps('memo'),
        },
        {
            title: '가입일',
            dataIndex: 'joinDate',
            key: 'joinDate',
            minWidth: 200,
            render: (date: string) => dayjs(date).format(DEFAULT_DATE_FORMAT),
            ...getFilterDropdownProps('joinDate'),
        },
        {
            title: '직업',
            dataIndex: 'action',
            key: 'action',
            minWidth: 250,
            render: (action: User['action']) => USER_ACTION_TYPE[action] || '-',
            ...getFilterDropdownProps('action', ACTION_FILTER_OPTIONS),
        },
        {
            title: '이메일 수신 동의',
            dataIndex: 'hasAgreedEmail',
            key: 'hasAgreedEmail',
            minWidth: 150,
            render: (agreed: boolean) => <Checkbox checked={agreed} />,
            ...getFilterDropdownProps('hasAgreedEmail', EMAIL_FILTER_OPTIONS),
        },
        {
            title: '',
            dataIndex: 'more',
            key: 'more',
            width: 48,
            minWidth: 48,
            render: (_, record) => (
                <Dropdown
                    menu={{
                        items: MORE_CONTROL_OPTIONS,
                        onClick: ({ key }) => handleMenuClick(key, record),
                    }}
                    placement="bottomRight"
                    trigger={['click']}
                >
                    <Button type="text" size="small">
                        <MoreOutlined />
                    </Button>
                </Dropdown>
            ),
        },
    ];

    return (
        <>
            {contextHolder}
            <Table<User>
                size="middle"
                columns={columns}
                dataSource={users}
                rowSelection={rowSelection}
                rowKey="id"
                loading={isLoading}
                pagination={false}
            />
        </>
    );
};
