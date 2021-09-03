import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { AiFillCaretDown } from 'react-icons/ai';
import { BsCameraVideoFill } from 'react-icons/bs';
import { CalendarContainer, ChatItemLouise, MessItem } from './styles';
import avatar from '../../assets/avatar.png';
import api from '../../services/api';
import PopUpPresentation from './PopUpPresentation';

interface IMessage {
    origin: string;
    content: string;
    action?: string;
}

const ChatLouise: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState<IMessage[]>([
        {
            origin: 'lu',
            content:
                'Ai, Louise aqui! Sua IA favorita 💖 O que vamos construir hoje?',
        },
    ]);
    const [value, setValue] = useState<string>();
    const [showPresentation, setShowPresentation] = useState<boolean>(false);

    const openChat = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const messageFormRef = useRef<HTMLFormElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const messageListRef = useRef<HTMLUListElement | null>(null);

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

    useEffect(() => {
        api.get('/messages/lu/me').then(response => {
            const messages = response.data.map((mss: IMessage) => ({
                origin: mss.origin,
                content: mss.content,
            }));
            setMessage([...message, ...messages]);
        });
        // Eslint doesn't permit me to put this [] without the dependencies that will be applied
        // As long I could take it off, it wouldn't work because I need to put this [] then he fire only once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sendPostUpdateGetAnswer = useCallback(async content => {
        const answerLuMessages = await api.post('messages/lu/new', {
            text: content,
        });
        if (answerLuMessages.data instanceof Array) {
            const appendAnswers = answerLuMessages.data.map(
                (item: IMessage) => ({
                    content: item.content,
                    origin: item.origin,
                }),
            );
            setMessage(oldVal => [...oldVal, ...appendAnswers]);

            const isAction = answerLuMessages.data.find(
                (item: IMessage) => item.action === 'presentation',
            );

            if (isAction) {
                setShowPresentation(true);
            }
        }
    }, []);

    const sendMessage = useCallback(
        async e => {
            e.preventDefault();
            let content: string = e.target.elements.messagebox.value;
            if (!content && content === '') {
                return;
            }
            const newMessage = {
                content,
                origin: 'user',
            };
            setMessage([...message, newMessage]);
            e.target.reset();
            await sendPostUpdateGetAnswer(content);
            content = '';
        },
        [message, sendPostUpdateGetAnswer],
    );

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'end',
            });
        }
    }, [message]);

    return (
        <CalendarContainer>
            <PopUpPresentation isChat={open} display={showPresentation} />
            <ChatItemLouise active={open}>
                <button type="button" onClick={openChat}>
                    <img src={avatar} alt="Louise Profile Avatar" />
                </button>
                <main>
                    <button type="button" onClick={openChat}>
                        <div>
                            <img src={avatar} alt="Louise Profile Avatar" />
                            <h4>Louise</h4>
                        </div>
                        <div>
                            <div>
                                <BsCameraVideoFill />
                            </div>
                            <div>
                                <AiFillCaretDown />
                            </div>
                        </div>
                    </button>
                    <div>
                        <ul ref={messageListRef}>
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
                            <span />
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
