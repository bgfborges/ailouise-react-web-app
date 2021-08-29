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
        if ('code' in response) {
            // const profile = response.getBasicProfile();
            // const { accessToken } = response;
            const googleCode = response.code;

            try {
                await signIn({
                    code: googleCode,
                });

                addToast({
                    type: 'success',
                    title: 'Authentication Success',
                    description: 'Now you are logged in',
                });
            } catch (err) {
                if (err instanceof Error) {
                    addToast({
                        type: 'error',
                        title: 'Authentication failed',
                        description: 'Internal Error',
                    });
                }
                addToast({
                    type: err.response.data.status,
                    title: 'Authentication Failed',
                    description: err.response.data.message,
                });
            }
        }
    };

    return (
        <Container>
            <hr />
            <ButtonContainer>
                <p>Or keep with: </p>
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
                    buttonText="Continue with Google"
                    onSuccess={responseGoogleSuccess}
                    cookiePolicy="single_host_origin"
                    scope="https://www.googleapis.com/auth/calendar"
                    accessType="offline"
                    responseType="code"
                />
            </ButtonContainer>
        </Container>
    );
};

export default GoogleButtonLogin;
