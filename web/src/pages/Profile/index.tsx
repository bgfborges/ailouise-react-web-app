import React, { useCallback, useRef, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { IoMdMail, IoMdLock, IoMdPerson } from 'react-icons/io';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { FiCamera } from 'react-icons/fi';
import api from '../../services/api';
import { Content, AvatarInput } from './styles';
import DashBoardStructure from '../DashBoardStructure';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
    old_password?: string;
    password_confirmation?: string;
}

const Profile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    const { user, updateUser } = useAuth();

    const handleSubmit = useCallback(
        async (data: SignUpFormData) => {
            formRef.current?.setErrors({});
            try {
                const schema = Yup.object().shape({
                    name: Yup.string().required('Name is Required'),
                    email: Yup.string()
                        .required('Email is Required')
                        .email('Write a valid e-mail'),
                    old_password: Yup.string().when('password', {
                        is: (val: string | undefined) =>
                            val ? !!val.length : false,
                        then: Yup.string().required(
                            'Old password is required to set a new password'
                        ),
                    }),
                    password: Yup.string(),
                    password_confirmation: Yup.string().oneOf(
                        [Yup.ref('password'), null],
                        'Password must match'
                    ),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });

                const {
                    name,
                    email,
                    old_password,
                    password,
                    password_confirmation,
                } = data;

                const formData = {
                    name,
                    email,
                    ...(old_password
                        ? {
                              old_password,
                              password,
                              password_confirmation,
                          }
                        : {}),
                };

                const response = await api.put('/profile', formData);

                updateUser(response.data);

                history.push('/dashboard');

                addToast({
                    type: 'success',
                    title: 'Profile Updated',
                    description: 'Your profile info was successfully updated',
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                }
                addToast({
                    type: 'error',
                    title: 'Update Profile Error',
                    description: 'There was some error updating profile',
                });
            }
        },
        [addToast, history, updateUser]
    );

    const handleAvatarChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const data = new FormData();

            if (event.target.files) {
                data.append('avatar', event.target.files[0]);

                api.patch('/users/avatar', data).then((response) => {
                    updateUser(response.data.user);
                    addToast({
                        type: 'success',
                        title: 'Avatar updated',
                        description: 'Your new avatar was successfully updated',
                    });
                });
            }
        },
        [addToast, updateUser]
    );

    return (
        <DashBoardStructure>
            <Content>
                <Form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initialData={{
                        name: user.name,
                        email: user.email,
                    }}
                >
                    <AvatarInput>
                        <img src={user.avatar_url} alt={user.name} />
                        <label htmlFor="user-avatar">
                            <FiCamera />
                            <input
                                type="file"
                                id="user-avatar"
                                onChange={handleAvatarChange}
                            />
                        </label>
                    </AvatarInput>

                    <h1>Edit Account</h1>
                    <Input name="name" icon={IoMdPerson} placeholder="Name" />
                    <Input name="email" icon={IoMdMail} placeholder="Email" />
                    <Input
                        name="old_password"
                        icon={IoMdLock}
                        type="password"
                        placeholder="Your Current Password"
                    />
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
                        placeholder="Confirm your password"
                    />
                    <Button type="submit">PUBLISH</Button>
                </Form>
            </Content>
        </DashBoardStructure>
    );
};

export default Profile;
