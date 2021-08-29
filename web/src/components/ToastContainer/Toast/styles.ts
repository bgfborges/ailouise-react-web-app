import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

const toastTypeVariations = {
    info: css`
        background: #cad3ff;
        color: #f7f7f7;
        span {
            background: #534d9f;
        }
    `,
    success: css`
        background: #8ee1cf;
        color: #f7f7f7;
        span {
            background: #61ce70;
        }
    `,
    error: css`
        background: #fa9398;
        color: #f7f7f7;
        span {
            background: #ff6a71;
        }
    `,
};

interface ContainerProps {
    type?: 'success' | 'error' | 'info';
}

export const Container = styled(animated.div)<ContainerProps>`
    width: 360px;
    position: relative;
    padding: 16px 30px 16px 16px;
    border-radius: 6px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    margin: 30px;

    ${props => toastTypeVariations[props.type || 'info']}

    & + div {
        margin-top: 10px;
    }

    span {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        padding: 10px;
        display: flex;
        border-radius: 6px 0px 0px 6px;

        svg {
            align-self: center;
        }
    }

    div {
        flex: 1;
        margin-left: 40px;
        justify-content: center;
        items-align: center;

        strong {
            font-size: 16px;
        }

        p {
            margin-top: 4px;
            font-size: 12px;
            opacity: 0.8;
            line-height: 20px;
            font-weight: 600;
        }
    }

    button {
        position: absolute;
        right: 16px;
        border: 0;
        background: transparent;
        align-self: center;
        color: inherit;
        opacity: 0.5;
    }
`;
