import type { ColumnsType, FilterDropdownProps } from 'antd/es/table/interface';
import { useQueryClient } from '@tanstack/react-query';
import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Table } from 'antd';
import dayjs from 'dayjs';
import { useState, Key } from 'react';
import {
    MORE_CONTROL_OPTIONS,
    EMAIL_FILTER_OPTIONS,
    ACTION_FILTER_OPTIONS,
    TABLE_COLUMN_INFO,
} from '@/constants';
import {
    useDeleteUserMutation,
    USER_QUERY_KEYS,
    useUserListQuery,
} from '@/queries';
import { User, FilterOption, Nullable } from '@/types';
import { useMessage } from '@/hooks';
import { getFilterOptions, isString } from '@/utils';
import { UserFilterOptionList } from './filter-option-list';

interface UserTableProps {
    setModalContext: (user: Nullable<User>, open: boolean) => void;
}

export const UserTable = ({ setModalContext }: UserTableProps) => {
    const queryClient = useQueryClient();
    const messageApi = useMessage();
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

    const { data: users = [], isLoading } = useUserListQuery();
    const { mutate: deleteMutate } = useDeleteUserMutation();

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
                        messageApi.success(
                            `${record.name} 회원이 삭제되었습니다.`,
                        );
                    },
                    errorCallback: () => {
                        messageApi.error(`${record.name} 회원 삭제 실패`);
                    },
                });
                break;
        }
    };

    const getFilterDropdownProps = (
        dataIndex: keyof User,
        customOptions?: FilterOption[],
    ) => {
        return {
            ...TABLE_COLUMN_INFO[dataIndex],
            dataIndex,
            key: dataIndex,
            filterDropdown: (props: FilterDropdownProps) => (
                <UserFilterOptionList
                    {...props}
                    options={
                        customOptions ||
                        getFilterOptions<Record<keyof User, unknown>>(
                            users,
                            dataIndex,
                        )
                    }
                />
            ),
            onFilter: (value: Key | boolean, record: User) => {
                const recordValue = record[dataIndex];

                console.log(recordValue, value, 'hi...');
                if (
                    isString(recordValue) &&
                    dayjs(recordValue).isValid() &&
                    isString(value)
                ) {
                    return dayjs(recordValue as string).isSame(
                        dayjs(value),
                        'day',
                    );
                }
                return String(recordValue) === String(value);
            },
        };
    };

    const filterableColumns: ColumnsType<User> = [
        ...['name', 'address', 'memo', 'joinDate'].map((column) =>
            getFilterDropdownProps(column as keyof User),
        ),
        getFilterDropdownProps('action', ACTION_FILTER_OPTIONS),
        getFilterDropdownProps('hasAgreedEmail', EMAIL_FILTER_OPTIONS),
    ];

    const moreControlColumns = {
        ...TABLE_COLUMN_INFO['id'],
        render: (_: unknown, record: User) => (
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
    };

    return (
        <Table<User>
            size="middle"
            columns={[...filterableColumns, moreControlColumns]}
            dataSource={users}
            rowSelection={{
                selectedRowKeys,
                onChange: (newSelectedRowKeys: Key[]) => {
                    setSelectedRowKeys(newSelectedRowKeys);
                },
                columnWidth: 32,
            }}
            rowKey="id"
            loading={isLoading}
            pagination={false}
            scroll={{ x: 'max-content' }}
        />
    );
};
