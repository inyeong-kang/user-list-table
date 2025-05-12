import { Form, FormProps } from 'antd';
import dayjs from 'dayjs';
import { User } from '@/types';
import { ACTION_FILTER_OPTIONS } from '@/constants';
import { FormField } from './field';

interface UserFormProps extends FormProps {
    initialValues?: User;
    onFieldsChange?: () => void;
}

export const UserForm = ({
    form,
    initialValues,
    onFieldsChange,
}: UserFormProps) => {
    return (
        <>
            <Form
                form={form}
                layout="vertical"
                onFieldsChange={onFieldsChange}
                initialValues={
                    initialValues
                        ? {
                              ...initialValues,
                              joinDate: dayjs(initialValues.joinDate),
                          }
                        : undefined
                }
            >
                <FormField
                    name="name"
                    label="이름"
                    type="text"
                    required
                    requiredMessage="이름은 필수값입니다."
                />

                <FormField name="address" label="주소" type="text" />

                <FormField name="memo" label="메모" type="textarea" />

                <FormField
                    name="joinDate"
                    label="가입일"
                    type="date"
                    required
                    requiredMessage=""
                />

                <FormField
                    name="action"
                    label="직업"
                    type="select"
                    style={{ width: 360 }}
                    options={ACTION_FILTER_OPTIONS.map(({ value, text }) => ({
                        value,
                        label: text,
                    }))}
                />

                <FormField
                    name="hasAgreedEmail"
                    label="이메일 수신 동의"
                    type="checkbox"
                />
            </Form>
        </>
    );
};
