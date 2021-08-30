import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface IPopUpContainer {
    index: number;
    displayPopup: boolean;
}

export const PopUpContainer = styled.div<IPopUpContainer>`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    top: 0;
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
    background: -moz-radial-gradient(
        center,
        ellipse cover,
        rgba(83, 77, 159, 0.88) 0%,
        rgba(78, 73, 150, 0.88) 6%,
        rgba(4, 4, 6, 0.62) 99%,
        rgba(3, 3, 4, 0.62) 100%
    ); /* FF3.6-15 */
    background: -webkit-radial-gradient(
        center,
        ellipse cover,
        rgba(83, 77, 159, 0.88) 0%,
        rgba(78, 73, 150, 0.88) 6%,
        rgba(4, 4, 6, 0.62) 99%,
        rgba(3, 3, 4, 0.62) 100%
    ); /* Chrome10-25,Safari5.1-6 */
    background: radial-gradient(
        ellipse at center,
        rgba(83, 77, 159, 0.88) 0%,
        rgba(78, 73, 150, 0.88) 6%,
        rgba(4, 4, 6, 0.62) 99%,
        rgba(3, 3, 4, 0.62) 100%
    ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e0534d9f', endColorstr='#9e030304',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */

    ${props =>
        props.displayPopup === false &&
        css`
            display: none;
        `}

    > div {
        width: 60vw;
        height: 70vh;
        position: sticky;
        top: 15%;
        background: white;
        border-radius: 10px;
        color: black;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        display: flex;

        svg {
            color: #8176ff;
            font-size: 40px;
            margin-bottom: 20px;
        }

        > main {
            & > * {
                display: none;
            }

            & *:nth-child(${props => props.index}) {
                display: flex;
            }
        }

        button {
            padding: 10px 20px;
            background: #8176ff;
            color: white;
            border: 0;
            border-radius: 5px;
            margin-top: 20px;
            margin-bottom: 50px;
            font-weight: bold;
            transition: background 0.15s;
            display: block;

            &:hover {
                background: ${shade(0.1, '#8176ff')};
            }
        }
    }
`;

interface IPopUpSliderBullets {
    index: number;
}

export const PopUpSliderBullets = styled.div<IPopUpSliderBullets>`
    width: 100%;
    position: absolute;
    height: 20px;
    bottom: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    span {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #f5f5f5;
        z-index: 1000;
        margin: 0 5px;
        &:nth-child(${props => props.index}) {
            width: 12px;
            height: 12px;
            background: #8176ff;
        }
    }
`;
