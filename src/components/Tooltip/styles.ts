import styled from 'styled-components';

export const Container = styled.div`
    position: relative;

    span {
        width: 160px;
        background: #61ce70;
        padding: 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 700;
        opacity: 0;
        transition: opacity 0.4s;
        visibility: hidden;

        position: absolute;
        bottom: calc(100% + 10px);
        left: 50%;
        transform: translateX(-50%);

        &::before {
            content: '';
            border-style: solid;
            border-color: #61ce70 transparent;
            border-width: 6px 6px 0 6px;
            position: absolute;
            bottom: 20px;
            top: 100%;
            left: calc(50% + 8px);
            transform: translateX(-50%);
        }
    }

    &:hover span {
        opacity: 1;
        visibility: visible;
    }
`;
