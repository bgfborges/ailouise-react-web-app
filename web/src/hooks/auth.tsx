import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
    id: string;
    name: string;
    email: string;
    avatar_url: string;
}

interface signInCredentials {
    email?: string;
    password?: string;
    code?: string;
}

interface AuthState {
    token: string;
    user: User;
}

interface AuthContextData {
    user: User;
    signIn(credentials: signInCredentials): Promise<void>;
    signOut(): void;
    updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@aiLouise:token');
        const user = localStorage.getItem('@aiLouise:user');

        if (token && user) {
            api.defaults.headers.authorization = `Bearer ${token}`;
            return { token, user: JSON.parse(user) };
        }

        return {} as AuthState;
    });

    const signIn = useCallback(async ({ email, password, code }) => {
        if (code) {
            const response = await api.post('sessions/auth/google', {
                code,
            });

            const { token, user, is_new_user } = response.data;

            localStorage.setItem('@aiLouise:token', token);
            localStorage.setItem('@aiLouise:user', JSON.stringify(user));

            if (is_new_user) {
                localStorage.setItem('@aiLouise:googleCalendar', 'pending');
            }

            setData({ token, user });
            return;
        }
        const response = await api.post('sessions', {
            email,
            password,
        });
        const { token, user } = response.data;
        localStorage.setItem('@aiLouise:token', token);
        localStorage.setItem('@aiLouise:user', JSON.stringify(user));

        setData({ token, user });

        api.defaults.headers.authorization = `Bearer ${token}`;
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@aiLouise:token');
        localStorage.removeItem('@aiLouise:user');
        setData({} as AuthState);
    }, []);

    const updateUser = useCallback(
        (user: User) => {
            localStorage.setItem('@aiLouise:user', JSON.stringify(user));
            setData({
                token: data.token,
                user,
            });
        },
        [setData, data.token],
    );

    return (
        <AuthContext.Provider
            value={{ user: data.user, signIn, signOut, updateUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };
