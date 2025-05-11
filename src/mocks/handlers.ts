import { http, HttpResponse } from 'msw';
import { User } from '@/types';
import { BASE_URL, STORAGE_KEY } from './const';

const initialUsers: User[] = [
    {
        id: 1,
        name: '홍길동',
        address: '서울시 강남구',
        memo: 'VIP 고객',
        joinDate: '2024-01-01T00:00:00Z',
        action: 'DEV',
        hasAgreedEmail: true,
    },
    {
        id: 2,
        name: '김철수',
        address: '부산시 해운대구',
        memo: '신규 가입',
        joinDate: '2024-01-02T00:00:00Z',
        action: 'PO',
        hasAgreedEmail: false,
    },
    {
        id: 3,
        name: '이영희',
        address: '인천시 연수구',
        memo: '휴면 계정',
        joinDate: '2024-01-03T00:00:00Z',
        action: 'DESIGN',
        hasAgreedEmail: true,
    },
];

if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialUsers));
}

const getUsers = (): User[] => {
    const users = localStorage.getItem(STORAGE_KEY);
    return users ? JSON.parse(users) : [];
};

const saveUsers = (users: User[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
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
