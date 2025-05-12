import { message } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import { createContext, PropsWithChildren } from 'react';

export const MessageContext = createContext<MessageInstance | null>(null);

export const MessageProvider = ({ children }: PropsWithChildren) => {
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <MessageContext.Provider value={messageApi}>
            {contextHolder}
            {children}
        </MessageContext.Provider>
    );
};
