import { Flex, Checkbox } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { FilterOption } from '@/types';

interface UserFilterOptionListProps extends FilterDropdownProps {
    options: FilterOption[];
}

export const UserFilterOptionList = ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    options,
}: UserFilterOptionListProps) => (
    <Flex vertical gap={8} style={{ padding: '4px 12px', margin: '8px' }}>
        {options.map(({ value, text }) => (
            <Checkbox
                key={value}
                checked={selectedKeys.includes(value)}
                onChange={(e) => {
                    setSelectedKeys(
                        e.target.checked
                            ? [...selectedKeys, value]
                            : selectedKeys.filter((key) => key !== value),
                    );
                    confirm();
                }}
            >
                {text}
            </Checkbox>
        ))}
    </Flex>
);
