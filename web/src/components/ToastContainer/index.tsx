import React from 'react';
import { useTransition } from 'react-spring';
import { Container } from './styles';
import { ToastMessage } from '../../hooks/toast';
import Toast from './Toast';

interface ToastContainerProps {
    messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
    const transition = useTransition(messages, {
        from: { right: '-120%', opacity: 0 },
        enter: { right: '0%', opacity: 1 },
        leave: { right: '-120%', opacity: 0 },
    });

    return (
        <Container>
            {transition((style, item) => (
                <Toast key={item.id} message={item} style={style} />
            ))}
        </Container>
    );
};

export default ToastContainer;
