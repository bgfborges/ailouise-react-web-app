import styled, { css } from 'styled-components';
import { shade } from 'polished';
import Tooltip from '../Tooltip/index';

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
    background: #232129;
    border-radius: 4px;
    border: 2px solid #232129;
    color: #f5f5f5;
    padding: 16px;
    width: 100%;
    transition: border-color 0.3s, background 0.3s;
    display: flex;
    align-items: center;

    svg {
        margin-right: 16px;
        color: #292929;
        cursor: pointer;
    }

    ${props =>
        props.isErrored &&
        css`
            border-color: #ff6a71;
            svg {
                color: #ff6a71;
            }
        `}

    ${props =>
        props.isFocused &&
        css`
            border-color: #61ce70;
            background: ${shade(0.5, '#232129')};
            svg {
                color: #61ce70;
            }
        `}

    ${props =>
        props.isFilled &&
        css`
            border-color: #232129;
            background: ${shade(0.5, '#232129')};
            svg {
                color: #61ce70;
            }
        `}

    & + div {
        margin-top: 8px;
    }

    input {
        background: transparent;
        flex: 1;
        border: 0;
        color: #f5f5f5;

        &::placeholder {
            color: #666360;
        }
    }
`;

export const Error = styled(Tooltip)`
    display: flex;
    justify-content: center;
    svg {
        margin: 0;
        margin-left: 16px;
        align-self: center;
        color: #ff6a71;
    }

    span {
        background: #ff6a71;
        color: #fff;

        &::before {
            border-color: #ff6a71 transparent;
        }
    }
`;
