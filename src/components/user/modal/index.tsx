import { useQueryClient } from '@tanstack/react-query';
import { Form, Modal, ModalProps } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import {
    useCreateUserMutation,
    USER_QUERY_KEYS,
    useUpdateUserMutation,
} from '@/queries';
import { Nullable, User } from '@/types';
import { useMessage } from '@/hooks';
import { UserForm } from './form';

interface UserFormModalProps extends ModalProps {
    initialValues: Nullable<User>;
    onCancel: () => void;
}

export const UserFormModal = ({
    open,
    onCancel,
    initialValues,
}: UserFormModalProps) => {
    const queryClient = useQueryClient();
    const messageApi = useMessage();
    const [form] = Form.useForm<User>();
    const [isFormValid, setIsFormValid] = useState(false);

    const { mutate: createMutate, isLoading: isCreateLoading } =
        useCreateUserMutation();
    const { mutate: updateMutate, isLoading: isUpdateLoading } =
        useUpdateUserMutation();

    const actionText = initialValues ? '수정' : '추가';

    const handleFormChange = () => {
        const values = form.getFieldsValue();
        setIsFormValid(!!values.name && !!values.joinDate);
    };

    const handleSubmit = async () => {
        const errorCallback = () => {
            messageApi.error(`회원 정보 ${actionText} 실패`);
        };
        const successCallback = () => {
            form.resetFields();
            queryClient.invalidateQueries([USER_QUERY_KEYS.LIST]);
            messageApi.success(`회원 정보를 ${actionText}했습니다.`);
            setTimeout(() => {
                onCancel();
            }, 100);
        };

        const values = await form.validateFields();
        const submitData: User = {
            ...values,
            joinDate: dayjs(values.joinDate).toISOString(),
            memo: values.memo || '',
            address: values.address || '',
            hasAgreedEmail: values.hasAgreedEmail || false,
        };

        if (initialValues) {
            updateMutate({
                data: { ...submitData, id: initialValues.id },
                errorCallback,
                successCallback,
            });
        } else {
            createMutate({
                data: submitData,
                errorCallback,
                successCallback,
            });
        }
    };

    useEffect(() => {
        if (open) {
            const values = form.getFieldsValue();
            setIsFormValid(!!values.name && !!values.joinDate);
        }
    }, [form, open, initialValues]);

    return (
        <>
            <Modal
                cancelText="취소"
                okText={actionText}
                open={open}
                title={`회원 ${actionText}`}
                onCancel={onCancel}
                onOk={handleSubmit}
                okButtonProps={{ disabled: !isFormValid }}
                confirmLoading={isCreateLoading || isUpdateLoading}
            >
                <UserForm
                    form={form}
                    initialValues={initialValues || undefined}
                    onFieldsChange={handleFormChange}
                />
            </Modal>
        </>
    );
};
