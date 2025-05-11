import { createAPI } from '../api-config';
import { User } from '@/types';

const api = createAPI('/users');

async function getUsers(): Promise<User[]> {
    const { data } = await api.get('/');

    return data;
}

async function createUser(user: User) {
    return await api.post('/', user);
}

async function updateUser(user: User) {
    return await api.put(`/${user.id}`, user);
}

async function deleteUser(id: number) {
    return await api.delete(`/${id}`);
}

export const UserAPI = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};
