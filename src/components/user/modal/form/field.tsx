import { Form, Input, FormItemProps, DatePicker, Select, Checkbox } from 'antd';
import { CSSProperties, ElementType } from 'react';
import { FORM_VALIDATION } from '@/constants';
import { StyledRequiredMark } from './mark';

interface FormFieldProps extends FormItemProps {
    type?: 'text' | 'textarea' | 'select' | 'date' | 'checkbox';
    required?: boolean;
    requiredMessage?: string;
    options?: { value: string; label: string }[];
    style?: CSSProperties;
}

export const FormField = ({
    type = 'text',
    required,
    requiredMessage,
    rules = [],
    options,
    style,
    ...props
}: FormFieldProps) => {
    const validation =
        FORM_VALIDATION[
            type === 'select' || type === 'date' || type === 'checkbox'
                ? 'text'
                : type
        ];

    const fieldRules = [
        ...(required ? [{ required: true, message: requiredMessage }] : []),
        ...(type === 'text' || type === 'textarea'
            ? [
                  {
                      max: validation.MAX_LENGTH,
                      message: validation.ERROR_MESSAGE,
                  },
              ]
            : []),
        ...rules,
    ];

    let Component: ElementType;

    switch (type) {
        case 'textarea':
            Component = Input.TextArea;
            break;
        case 'select':
            Component = Select;
            break;
        case 'date':
            Component = DatePicker;
            break;
        case 'checkbox':
            Component = Checkbox;
            break;
        default:
            Component = Input;
    }

    const inputFieldProps = {
        style,
        options,
    };

    return (
        <Form.Item
            {...props}
            label={
                required ? (
                    <p>
                        {props.label}
                        <StyledRequiredMark> *</StyledRequiredMark>
                    </p>
                ) : (
                    props.label
                )
            }
            rules={fieldRules}
            valuePropName={type === 'checkbox' ? 'checked' : 'value'}
        >
            <Component {...inputFieldProps} />
        </Form.Item>
    );
};
