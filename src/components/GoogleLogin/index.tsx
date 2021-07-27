import React from 'react';
import {
    GoogleLogin,
    GoogleLoginResponse,
    GoogleLoginResponseOffline,
} from 'react-google-login';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { Container, ButtonContainer } from './styles';

const GoogleButtonLogin: React.FC = () => {
    const { addToast } = useToast();
    const { signIn } = useAuth();
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const responseGoogleSuccess = async (
        response: GoogleLoginResponse | GoogleLoginResponseOffline,
    ) => {
        try {
            if ('googleId' in response) {
                const profile = response.getBasicProfile();
                signIn({
                    googleId: profile.getId(),
                    name: profile.getName(),
                    email: profile.getEmail(),
                });
                addToast({
                    type: 'success',
                    title: 'Authentication Success',
                    description: 'Now you are logged in',
                });
            }
        } catch (err) {
            addToast({
                type: 'error',
                title: 'Something bad happened',
                description: 'No worry! Try again.',
            });
        }
    };

    return (
        <Container>
            <hr />
            <ButtonContainer>
                <p>Or keep with: </p>
                <GoogleLogin
                    clientId="451143107038-28dgglhc7rftcsefci8djuvk1hpfk5ll.apps.googleusercontent.com"
                    buttonText="Continue with Google"
                    onSuccess={responseGoogleSuccess}
                />
            </ButtonContainer>
        </Container>
    );
};

export default GoogleButtonLogin;
