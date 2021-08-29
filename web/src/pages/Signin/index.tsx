import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoMdMail, IoMdLock } from 'react-icons/io';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Content, Background, AnimatedContent } from './styles';
import logoImg from '../../assets/ailouise.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import GoogleButtonLogin from '../../components/GoogleLogin';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface signInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { signIn } = useAuth();
    const { addToast } = useToast();
    // eslint-disable-next-line @typescript-eslint/ban-types
    const handleSubmit = useCallback(
        // eslint-disable-next-line @typescript-eslint/ban-types
        async (data: signInFormData) => {
            formRef.current?.setErrors({});
            try {
                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('Email is Required')
                        .email('Write a valid e-mail'),
                    password: Yup.string().required('Password is Required'),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });
                await signIn({
                    email: data.email,
                    password: data.password,
                });

                addToast({
                    type: 'success',
                    title: 'Authentication Success',
                    description: 'Now you are logged in',
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                }

                addToast({
                    type: 'error',
                    title: 'Authentication Error',
                    description: 'Check Email/password conbination',
                });

                // Send a toast
            }
        },
        [signIn, addToast]
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
                        <h1>Login into your account</h1>
                        <Input
                            name="email"
                            icon={IoMdMail}
                            placeholder="Email"
                        />
                        <Input
                            name="password"
                            icon={IoMdLock}
                            type="password"
                            placeholder="Password"
                        />
                        <span>
                            <Link to="/forgot-password">
                                Forgot my password
                            </Link>
                        </span>
                        <Button type="submit">GO NOW!</Button>
                        <Link to="/signup">
                            Don't have an account? <span>Register</span>
                        </Link>
                        <GoogleButtonLogin />
                    </Form>
                </AnimatedContent>
            </Content>
            <Background />
        </Container>
    );
};

export default SignIn;
