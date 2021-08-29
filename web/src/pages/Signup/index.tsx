import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IoMdMail, IoMdLock, IoMdPerson } from 'react-icons/io';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import api from '../../services/api';
import { Container, Content, Background, AnimatedContent } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import logoImg from '../../assets/ailouise.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import GoogleButtonLogin from '../../components/GoogleLogin';
import { useToast } from '../../hooks/toast';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const Signup: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    // eslint-disable-next-line @typescript-eslint/ban-types
    const handleSubmit = useCallback(
        async (data: SignUpFormData) => {
            formRef.current?.setErrors({});
            try {
                const schema = Yup.object().shape({
                    name: Yup.string().required('Name is Required'),
                    email: Yup.string()
                        .required('Email is Required')
                        .email('Write a valid e-mail'),
                    password: Yup.string().min(6, 'Minimun 6 characters'),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });

                api.post('/users', data);

                history.push('/');

                addToast({
                    type: 'success',
                    title: 'Success',
                    description: 'Now you are part of our community',
                });
            } catch (err) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);

                addToast({
                    type: 'error',
                    title: 'SignUp Error',
                    description: 'There was some error on SignUp',
                });
            }
        },
        [addToast, history]
    );

    return (
        <Container>
            <Background />
            <Content>
                <AnimatedContent>
                    <img
                        src={logoImg}
                        alt="Logo aiLouise Marketing e Tecnologia"
                    />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Create a new account</h1>
                        <Input
                            name="name"
                            icon={IoMdPerson}
                            placeholder="Name"
                        />
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
                        <Button type="submit">CREATE</Button>
                        <Link to="/">
                            Already have an account? <span>Login</span>
                        </Link>
                        <GoogleButtonLogin />
                    </Form>
                </AnimatedContent>
            </Content>
        </Container>
    );
};

export default Signup;
