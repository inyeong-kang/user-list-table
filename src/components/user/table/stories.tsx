import { handlers } from '@/mocks/handlers';
import { UserTable } from './index';

export default {
    title: 'User/Table',
    tags: ['autodocs'],
    component: UserTable,
    parameters: {
        msw: {
            handlers,
        },
    },
};

export const Default = () => <UserTable setModalContext={() => {}} />;
