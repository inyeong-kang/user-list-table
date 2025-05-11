export interface User {
    id: number;
    name: string;
    address: string;
    memo: string;
    joinDate: string;
    action: 'DEV' | 'PO' | 'DESIGN';
    hasAgreedEmail: boolean;
}
