import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdMail } from 'react-icons/io';
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

interface forgotPasswordFormData {
    email: string;
}

const ForgotPassword: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    // eslint-disable-next-line @typescript-eslint/ban-types
    const handleSubmit = useCallback(
        // eslint-disable-next-line @typescript-eslint/ban-types
        async (data: forgotPasswordFormData) => {
            formRef.current?.setErrors({});

            setLoading(true);

            try {
                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('Email is Required')
                        .email('Write a valid e-mail'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                // Recover Password
                await api.post('/password/forgot', {
                    email: data.email,
                });

                addToast({
                    type: 'success',
                    title: 'Password Recovery Success',
                    description:
                        'If this address exists, you will receive instructions in your inbox',
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }

                addToast({
                    type: 'error',
                    title: 'Recovery Error',
                    description:
                        'There was an error trying to recovery the password',
                });
            } finally {
                setLoading(false);
            }
        },
        [addToast]
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
                        <h1>Password Recovery</h1>
                        <Input
                            name="email"
                            icon={IoMdMail}
                            placeholder="Email"
                        />
                        <Button loading={loading} type="submit">
                            Recovery
                        </Button>
                        <Link to="/">
                            <span>I know my password</span>
                        </Link>
                    </Form>
                </AnimatedContent>
            </Content>
            <Background />
        </Container>
    );
};

export default ForgotPassword;
