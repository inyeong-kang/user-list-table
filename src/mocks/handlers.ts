import { http, HttpResponse } from 'msw';
import { User } from '@/types';
import { BASE_URL, STORAGE_KEY } from './const';

const initialUsers: User[] = [
    {
        id: 1,
        name: 'John Doe',
        address: '서울 강남구',
        memo: '외국인',
        joinDate: '2024-10-10T00:00:00Z',
        action: 'DEV',
        hasAgreedEmail: true,
    },
    {
        id: 2,
        name: 'Foo Bar',
        address: '서울 서초구',
        memo: '한국인',
        joinDate: '2024-10-02T00:00:00Z',
        action: 'PO',
        hasAgreedEmail: false,
    },
    {
        id: 3,
        name: '이영희',
        address: '인천시 연수구',
        memo: '외국인',
        joinDate: '2024-10-03T00:00:00Z',
        action: 'DESIGN',
        hasAgreedEmail: true,
    },
    {
        id: 4,
        name: '박철수',
        address: '서울시 광진구',
        memo: '한국인',
        joinDate: '2024-10-04T00:00:00Z',
        action: 'DESIGN',
        hasAgreedEmail: false,
    },
];

let memoryUsers = [...initialUsers];

const useLocalStorage = STORAGE_KEY.includes('LocalStorage');

if (useLocalStorage && !localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialUsers));
}

const getUsers = (): User[] => {
    if (useLocalStorage) {
        const users = localStorage.getItem(STORAGE_KEY);
        return users ? JSON.parse(users) : [];
    }
    return memoryUsers;
};

const saveUsers = (users: User[]) => {
    if (useLocalStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    } else {
        memoryUsers = users;
    }
};

export const handlers = [
    http.get(`${BASE_URL}/users`, () => {
        return HttpResponse.json({ data: getUsers() });
    }),

    http.post(`${BASE_URL}/users`, async ({ request }) => {
        const newUser = (await request.json()) as Omit<User, 'id' | 'joinDate'>;
        const users = getUsers();
        const user: User = {
            ...newUser,
            id: Math.max(...users.map((u) => u.id), 0) + 1,
            joinDate: new Date().toISOString(),
        };
        users.push(user);
        saveUsers(users);
        return HttpResponse.json(user, { status: 201 });
    }),

    http.put(`${BASE_URL}/users/:id`, async ({ params, request }) => {
        const { id } = params;
        const updatedUser = (await request.json()) as Partial<User>;
        const users = getUsers();
        const index = users.findIndex((u) => u.id === Number(id));

        if (index === -1) {
            return new HttpResponse(null, { status: 404 });
        }

        users[index] = { ...users[index], ...updatedUser };
        saveUsers(users);
        return HttpResponse.json(users[index]);
    }),

    http.delete(`${BASE_URL}/users/:id`, ({ params }) => {
        const { id } = params;
        const users = getUsers();
        const index = users.findIndex((u) => u.id === Number(id));

        if (index === -1) {
            return new HttpResponse(null, { status: 404 });
        }

        users.splice(index, 1);
        saveUsers(users);
        return new HttpResponse(null, { status: 204 });
    }),
];
