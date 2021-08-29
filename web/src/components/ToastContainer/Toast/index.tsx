import React, { useEffect } from 'react';
import {
    IoMdAlert,
    IoMdCheckmarkCircle,
    IoMdInformationCircle,
    IoMdClose,
} from 'react-icons/io';
import { Container } from './styles';
import { ToastMessage, useToast } from '../../../hooks/toast';

interface MessageProps {
    message: ToastMessage;
    // eslint-disable-next-line @typescript-eslint/ban-types
    style: object;
}

const icons = {
    info: <IoMdInformationCircle size={20} />,
    success: <IoMdCheckmarkCircle size={20} />,
    error: <IoMdAlert size={20} />,
};

// eslint-disable-next-line @typescript-eslint/ban-types
const Toast: React.FC<MessageProps> = ({ message, style }) => {
    const { removeToast } = useToast();

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(message.id);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [removeToast, message.id]);

    return (
        <Container key={message.id} type={message.type} style={style}>
            <span>{icons[message.type || 'info']}</span>

            <div>
                <strong>{message.title}</strong>
                {message.description && <p>{message.description}</p>}
            </div>

            <button onClick={() => removeToast(message.id)} type="button">
                <IoMdClose size={18} />
            </button>
        </Container>
    );
};
export default Toast;
