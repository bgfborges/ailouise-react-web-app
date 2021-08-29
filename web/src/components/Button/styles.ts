import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
    background: #61ce70;
    border-radius: 4px;
    height: 56px;
    border: 0;
    padding: 0 16px;
    color: #f5f5f5;
    font-weight: bold;
    width: 100%;
    margin-top: 16px;
    transition: background-color 0.2s;

    &:hover {
        background: ${shade(0.2, '#61CE70')};
    }
`;
