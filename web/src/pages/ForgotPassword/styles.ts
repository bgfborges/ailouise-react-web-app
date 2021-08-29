import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signInBackgroundImage from '../../assets/back-recovery.jpeg';

export const Container = styled.div`
    height: 100vh;
    max-height: 100vh;
    display: flex;
    align-items: stretch;
`;
export const Content = styled.div`
    display: flex;
    place-content: center;
    flex-direction: column;
    width: 100%;
    max-width: 700px;
    align-items: center;

    form {
        margin: 20px 0;
        width: 440px;
        text-align: center;
        background: #030304;
        padding: 50px;
        border-radius: 3px;

        h1 {
            margin-bottom: 12px;
            font-size: 16px;
            text-align: left;
        }

        span {
            a {
                margin: 0;
                padding: 0;
                color: #534d9f;
                font-weight: bold;
                font-size: 11px;
                text-align: left;
                padding: 5px;
            }
        }

        a {
            color: #f5f5f5;
            display: block;
            margin-top: 25px;
            text-decoration: none;
            transition: color 0.2s;
            font-size: 12px;
            font-weight: 500;

            span {
                font-weight: bold;
                color: #534d9f;
                font-size: 15px;
            }

            &:hover {
                color: ${shade(0.2, '#F5F5F5')};
            }
        }
    }

    img {
        width: 40%;
    }

    > a {
        color: #61ce70;
        margin-top: 0px;
        text-decoration: none;
        transition: color 0.2s;
        display: flex;
        align-items: center;
        text-weight: bold;

        &:hover {
            color: ${shade(0.2, '#61CE70')};
        }

        svg {
            margin-right: 16px;
        }
    }
`;

const appearFromLeft = keyframes`
    from {
        opacity: 0;
        transform: translateX(-50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const AnimatedContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: ${appearFromLeft} 1s;
`;

export const Background = styled.div`
    flex: 1;
    background: url(${signInBackgroundImage}) no-repeat center center;
    background-size: cover;
`;
