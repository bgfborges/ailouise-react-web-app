import styled, { css } from 'styled-components';

interface IPropsContainerPopPuo {
    isChat: boolean;
    index: number;
    display: boolean;
}

export const PopUpContainer = styled.div<IPropsContainerPopPuo>`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    top: 0;
    z-index: 2000;
    display: none;
    visibility: hidden;
    ${props =>
        props.display &&
        css`
            display: flex;
            visibility: visible;
        `}
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

    > div {
        width: 50vw;
        min-height: 70vh;
        padding: 30px;
        position: absolute;
        top: 15%;
        left: 50vw;
        margin-left: -25vw;
        background: white;
        border-radius: 10px;
        color: black;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        display: flex;
        transition: left 300ms;

        ${props =>
            props.isChat &&
            css`
                & {
                    left: 35vw;
                }
            `}

        & {
            display: none;
        }
        &:nth-child(${props => props.index}) {
            display: flex;
        }
    }
`;

export const PopUpContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > div:nth-child(1) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        > svg {
            font-size: 40px;
            color: #61ce70;
            margin-bottom: 20px;
        }
    }

    > div:nth-child(2) {
        input {
            border: none;
            background-image: none;
            background-color: transparent;
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
            box-shadow: none;

            margin-top: 40px;
            width: 400px;
            border: 1px solid #f0f0f0;
            border-radius: 40px;
            padding: 15px 30px;
            background: #fafafa;
            color: #888;
        }
    }
`;

interface IDesignChosen {
    display: boolean;
}

export const DesignsProject = styled.div<IDesignChosen>`
    width: 150px;
    background: #8176ff;
    margin: 20px;
    border-radius: 10px;
    cursor: pointer;
    height: 0;
    transition: height 300ms;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #e9e9e9;

    > svg {
        font-size: 30px;
        margin-bottom: 5px;
        visibility: hidden;
        opacity: 0;
        transition: opacity 3s;
    }

    > h5 {
        visibility: hidden;
        opacity: 0;
        transition: opacity 3s;
        font-weight: 600;
        font-size: 20px;
        text-align: center;
    }

    ${props =>
        props.display &&
        css`
            & {
                height: 200px;

                > svg {
                    visibility: visible;
                    opacity: 1;
                }

                > h5 {
                    visibility: visible;
                    opacity: 1;
                }
            }
        `}
`;

interface SeetingItemsPopUp {
    checked: number[];
}

export const PopUpContentSettings = styled.div<SeetingItemsPopUp>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > div:nth-child(1) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        > svg {
            font-size: 40px;
            color: #61ce70;
            margin-bottom: 20px;
        }
    }

    > div:nth-child(2) {
        width: 100%;
        padding: 20px;
        ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            margin-top: 30px;
            flex: 1;

            li {
                border: 1px solid #eee;
                padding: 10px;
                margin-bottom: 10px;
                width: 100%;
                cursor: pointer;
                color: #777;
                border-radius: 4px;

                &:hover {
                    background: #f5f5f5;
                }

                ${props =>
                    props.checked.map(
                        item =>
                            css`
                                &:nth-child(${item}) {
                                    background: #8176ff;
                                    color: white;
                                }
                            `,
                    )}
        }
    }

    button {
        padding: 10px;
        border: 0;
        color: white;
        background: #8176ff;
        float: right;
        border-radius: 6px;
    }
`;

export const ItemSettingProject = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    h4 {
        font-size: 13px;
        font-weight: 600;
        margin-left: 10px;
    }
`;
