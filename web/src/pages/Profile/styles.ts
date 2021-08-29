import styled from 'styled-components';
import { shade } from 'polished';

export const Content = styled.div`
    width: 100%;
    display: flex;
    place-content: center;
    flex-direction: column;
    align-items: center;

    form {
        width: 440px;
        text-align: center;
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

    input[name='old_password'] {
        margin-top: 20px;
    }
`;

export const AvatarInput = styled.div`
    position: relative;
    width: 150px;
    margin: 0 auto;

    img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 30px;
    }

    label {
        position: absolute;
        width: 40px;
        height: 40px;
        background: #61ce70;
        border: 0;
        border-radius: 50%;
        color: #f5f5f5;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 30px;
        right: 0;
        transition: background 0.2s;
        cursor: pointer;

        &:hover {
            background: ${shade(0.2, '#61CE70')};
        }

        input#user-avatar {
            display: none;
        }
    }
`;
