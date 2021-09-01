import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { CalendarContainer, ChatItemLouise, MessItem } from './styles';
import avatar from '../../assets/avatar.png';
import api from '../../services/api';

interface IMessage {
    origin: string;
    content: string;
}

const ChatLouise: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState<IMessage[]>([
        {
            origin: 'lu',
            content:
                'Hey, Louise aqui! Sua IA favorita 💖 O que vamos construir hoje?',
        },
    ]);
    // const [message, setMessage] = useState<IMessage[]>([
    //     {
    //         origin: 'lu',
    //         content:
    //             'Hey, Louise aqui! Sua IA favorita 💖 O que vamos construir hoje?',
    //     },
    // ]);
    const [value, setValue] = useState<string>();

    const openChat = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const messageFormRef = useRef<HTMLFormElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const textAreaChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ): void => {
        setValue(event.target.value);
    };

    useEffect(() => {
        if (textareaRef && textareaRef.current) {
            textareaRef.current.style.height = '0px';
            const { scrollHeight } = textareaRef.current;
            textareaRef.current.style.height = `${scrollHeight}px`;
        }
    }, [value]);

    try {
        useEffect(() => {
            api.get('/messages/lu/me').then(response => {
                const messages = response.data.map((mss: IMessage) => ({
                    origin: 'user',
                    content: mss.content,
                }));
                setMessage([...message, ...messages]);
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
    } catch {
        throw new Error('Internal Server Error');
    }

    const sendMessage = useCallback(
        async e => {
            e.preventDefault();
            let content: string = e.target.elements.messagebox.value;
            if (!content && content === '') {
                return;
            }
            await api.post('messages/lu/new', {
                text: content,
            });
            const newMessage = {
                content,
                origin: 'user',
            };
            setMessage([...message, newMessage]);
            e.target.reset();
            content = '';
        },
        [message],
    );

    return (
        <CalendarContainer>
            <ChatItemLouise active={open}>
                <button type="button" onClick={openChat}>
                    <img src={avatar} alt="Louise Profile Avatar" />
                </button>
                <main>
                    <button type="button" onClick={openChat}>
                        <img src={avatar} alt="Louise Profile Avatar" />
                        <h4>Louise</h4>
                    </button>
                    <div>
                        <ul>
                            {message.map(mess => (
                                <MessItem
                                    origin={mess.origin}
                                    key={
                                        mess.origin + Math.random() + Date.now()
                                    }
                                >
                                    <div>{mess.content}</div>
                                </MessItem>
                            ))}
                        </ul>
                    </div>
                    <footer>
                        <form ref={messageFormRef} onSubmit={sendMessage}>
                            <div>
                                <textarea
                                    ref={textareaRef}
                                    onChange={textAreaChange}
                                    name="messagebox"
                                />
                            </div>
                            <button type="submit">
                                <FiSend />
                            </button>
                        </form>
                    </footer>
                </main>
            </ChatItemLouise>
        </CalendarContainer>
    );
};

export default ChatLouise;
