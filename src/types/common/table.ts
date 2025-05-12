import { FilterDropdownProps } from 'antd/es/table/interface';

export interface FilterOption {
    text: string;
    value: string;
}

export interface CustomFilterDropdownProps extends FilterDropdownProps {
    options: FilterOption[];
}
