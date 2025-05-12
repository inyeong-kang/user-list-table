import { StoryFn } from '@storybook/react';
import { UserFilterOptionList } from './index';

export default {
    title: 'User/FilterOptionList',
    tags: ['autodocs'],
    component: UserFilterOptionList,
    args: {
        options: [
            { value: '1', text: '1' },
            { value: '2', text: '2' },
        ],
        selectedKeys: [],
        setSelectedKeys: () => {},
        confirm: () => true,
        clearFilters: () => {},
        close: () => {},
        visible: true,
        prefixCls: 'ant-table-filter',
        filters: [],
    },
};

const Template: StoryFn<typeof UserFilterOptionList> = (args) => (
    <UserFilterOptionList {...args} />
);

export const Default = Template.bind({});

export const WithSelectedValues = Template.bind({});
WithSelectedValues.args = {
    selectedKeys: ['1'],
};
