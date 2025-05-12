import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import { Nullable, User } from '@/types';
import { useBooleanState } from '@/hooks';
import { UserFormModal } from './modal';
import { UserTable } from './table';
import { Typography } from '../common';

const StyledHeader = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    padding: 12px 14px;
    background-color: var(--white);
    z-index: 100;
`;

const StyledMain = styled.main`
    width: 100%;
    margin: 0 auto;
    padding-top: 48px;
`;

export const UserList = () => {
    const [modalOpen, toggleModalOpen] = useBooleanState();
    const [selectedUser, setSelectedUser] = useState<Nullable<User>>(null);

    const setModalContext = (user: Nullable<User>, open: boolean) => {
        setSelectedUser(user);
        toggleModalOpen(open);
    };

    const onCancel = () => {
        setModalContext(null, false);
    };

    return (
        <>
            <StyledHeader>
                <Typography variant="heading5">회원 목록</Typography>
                <Button onClick={toggleModalOpen} type="primary">
                    <PlusOutlined /> 추가
                </Button>
            </StyledHeader>
            <StyledMain>
                <UserTable setModalContext={setModalContext} />
            </StyledMain>
            <UserFormModal
                key={selectedUser?.id}
                open={modalOpen}
                onCancel={onCancel}
                initialValues={selectedUser}
            />
        </>
    );
};
