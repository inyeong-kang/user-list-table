import { useQueryClient } from '@tanstack/react-query';
import { Form, message, Modal, ModalProps } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import {
    useCreateUserMutation,
    USER_QUERY_KEYS,
    useUpdateUserMutation,
} from '@/queries';
import { User } from '@/types';
import { UserForm } from './form';

interface UserFormModalProps extends ModalProps {
    initialValues: User | null;
    onCancel: () => void;
}

export const UserFormModal = ({
    open,
    onCancel,
    initialValues,
}: UserFormModalProps) => {
    const queryClient = useQueryClient();
    const [form] = Form.useForm<User>();
    const [messageApi, contextHolder] = message.useMessage();
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
            {contextHolder}
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
