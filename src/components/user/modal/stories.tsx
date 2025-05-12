import { StoryFn } from '@storybook/react';
import { UserFormModal } from './index';

export default {
    title: 'User/FormModal',
    tags: ['autodocs'],
    component: UserFormModal,
    args: {
        open: true,
    },
};

const Template: StoryFn<typeof UserFormModal> = (args) => (
    <UserFormModal {...args} />
);

export const Default = Template.bind({});

export const WithInitialValues = Template.bind({});
WithInitialValues.args = {
    initialValues: {
        id: 1,
        name: '홍길동',
        address: '서울시 강남구',
        memo: '메모 테스트',
        joinDate: '2025-05-11T00:00:00Z',
        action: 'DEV',
        hasAgreedEmail: true,
    },
};
