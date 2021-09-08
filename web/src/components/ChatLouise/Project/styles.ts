import styled, { css } from 'styled-components';

interface IDisplayProjectDoing {
    display: boolean;
}

interface IDisplayProjectDoingContent {
    display: boolean;
    visibilityContent: boolean;
}

export const DoingProject = styled.div<IDisplayProjectDoingContent>`
    position: absolute;
    left: 2vh;
    bottom: 2vh;
    background: white;
    border-radius: 20px;
    height: auto;
    width: 250px;
    transition: width 100ms, height 800ms;
    display: none;

    ${props =>
        props.visibilityContent &&
        css`
            display: block;
        `}

    ${props =>
        props.display &&
        css`
            width: 500px;
        `}
    > div:nth-child(1) {
        width: 100%;
        height: 50px;
        border-radius: 20px;
        color: white;
        background: #61ce70;
        position: relative;
        font-weight: 600;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        border: 3px solid white;
        cursor: pointer;

        svg:nth-child(1) {
            margin-right: 10px;
            font-size: 20px;
        }
        svg:nth-child(2) {
            margin-left: 10px;
            font-size: 13px;
        }
    }
`;

export const ContentProjectDoing = styled.div<IDisplayProjectDoing>`
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 10px;
    visibility: hidden;
    display: none;
    height: 0;
    transition: height 1000ms, visibility 1000ms;

    img {
        width: 100%;
        height: auto;
        border-radius: 20px;
    }

    h3 {
        color: black;
        font-size: 25px;
    }

    p {
        color: #444;
        font-size: 14px;
        margin-top: 10px;
    }

    div {
        margin-top: 30px;
        margin-bottom: 30px;
        a {
            padding: 10px;
            background: #8176ff;
            color: white;
            text-decoration: none;
            border-radius: 30px;
            font-weight: 600;
            font-size: 13px;
        }
    }
    ${props =>
        props.display &&
        css`
            visibility: visible;
            display: block;
            height: auto;
        `}
`;
