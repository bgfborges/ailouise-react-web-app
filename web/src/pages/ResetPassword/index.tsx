import React, { useCallback, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IoMdLock } from 'react-icons/io';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Content, Background, AnimatedContent } from './styles';
import logoImg from '../../assets/ailouise.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface resetPasswordFormData {
    password: string;
    password_confirmation: string;
}

const ResetPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    const location = useLocation();
    const handleSubmit = useCallback(
        async (data: resetPasswordFormData) => {
            formRef.current?.setErrors({});
            try {
                const schema = Yup.object().shape({
                    password: Yup.string().min(6, 'Password is Required'),
                    password_confirmation: Yup.string().oneOf(
                        [Yup.ref('password'), null],
                        'Password must match',
                    ),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                const { password, password_confirmation } = data;
                const token = location.search.replace('?token=', '');

                if (!token) {
                    throw new Error();

                    return;
                }

                await api.post('/password/reset', {
                    password,
                    password_confirmation,
                    token,
                });

                addToast({
                    type: 'success',
                    title: 'Authentication Success',
                    description: 'Now you are logged in',
                });

                history.push('/');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }

                addToast({
                    type: 'error',
                    title: 'Password Recovery Error',
                    description:
                        'There was an error recovering your password. Try again.',
                });
            }
        },
        [addToast, history, location.search],
    );

    return (
        <Container>
            <Content>
                <AnimatedContent>
                    <img
                        src={logoImg}
                        alt="Logo aiLouise Marketing e Tecnologia"
                    />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Reset Password</h1>
                        <Input
                            name="password"
                            icon={IoMdLock}
                            type="password"
                            placeholder="New Password"
                        />
                        <Input
                            name="password_confirmation"
                            icon={IoMdLock}
                            type="password"
                            placeholder="Password Confirmation"
                        />
                        <Button type="submit">Change Password</Button>
                    </Form>
                </AnimatedContent>
            </Content>
            <Background />
        </Container>
    );
};

export default ResetPassword;
