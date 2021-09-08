import styled, { css } from 'styled-components';

interface isOpen {
    active: boolean;
}

export const CalendarContainer = styled.div`
    position: fixed;
    z-index: 2001;
    bottom: 0;
    left: 0;
    right: 0;
    background: blue;
    height: 0;
`;

export const ChatItemLouise = styled.div<isOpen>`
    position: relative;
    > button {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        right: 4vh;
        bottom: 4vh;
        float: right;
        background: white;
        position: absolute;
        cursor: pointer;
        border: 2px solid #61ce70;
        z-index: 2002;
        transition: right 200ms;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
        }

        ${props =>
            props.active &&
            css`
                right: -80px;
            `}
    }

    > main {
        width: 350px;
        height: 0;
        background: white;
        bottom: 0;
        right: 6vw;
        position: fixed;
        z-index: 2001;
        transition: height 200ms ease-in-out;
        border-radius: 10px 10px 0px 0px;
        display: flex;
        flex-direction: column;

        ${props =>
            props.active &&
            css`
                height: 450px;
            `}

        > button {
            width: 100%;
            background: #534d9f;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 10px 10px;
            cursor: pointer;
            border: 0;
            color: white;
            border-radius: 6px 6px 0px 0px;

            div:nth-child(1) {
                flex: 1;
                display: flex;
                flex-direction: row;
                justify-content: start;
                align-items: center;
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-right: 10px;
                    border: 2px solid #61ce70;
                }

                > div {
                    display: flex;
                    flex-direction: column;

                    h4 {
                        font-weight: 700;
                        font-size: 13px;
                        margin-left: -9px;
                    }

                    p {
                        font-size: 9px;
                        font-weight: 600;
                    }
                }
            }

            div:nth-child(2) {
                display: flex;
                flex-direction: row;
                align-items: center;
                > div {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 5px;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    margin: 0 5px;
                    transition: background 100ms;

                    svg {
                        font-size: 16px;
                        font-weight: 700;
                        color: #f5f5f5;
                        transition: color 100ms;
                    }

                    &:hover {
                        background: #ffffff2f;
                        svg {
                            color: #fff;
                        }
                    }
                }
            }
        }

        > div {
            flex: 1;
            overflow-x: scroll;
            margin-bottom: 20px;

            ul {
                list-style-type: none;
                padding: 20px;
                font-size: 12px;
                font-weight: 600;
                width: 100%;
                display: flex;
                flex-direction: column;
            }
        }

        > div {
            flex: 1;
            overflow-x: scroll;
            margin-bottom: 20px;

            ul {
                list-style-type: none;
                padding: 20px;
                font-size: 12px;
                font-weight: 600;
                width: 100%;
                display: flex;
                flex-direction: column;
            }
        }

        > footer {
            > form {
                border-top: 1px solid #ccc;
                background: #f8f8f8;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                padding: 10px;

                > div {
                    width: 80%;
                    height: auto;
                    position: relative;
                    textarea {
                        border: none;
                        background-image: none;
                        background-color: transparent;
                        -webkit-box-shadow: none;
                        -moz-box-shadow: none;
                        box-shadow: none;
                        overflow: hidden;
                        border: 1px solid #ccc;
                        border-radius: 30px;
                        padding: 13px 15px 10px;
                        bottom: 0;
                        width: 95%;
                        max-height: 70px;
                        resize: none;
                    }
                }

                button[type='submit'] {
                    flex: 1;
                    border: 0;
                    border-radius: 50px;
                    background: #61ce70;
                    color: white;
                    height: 40px;

                    svg {
                        font-weight: 900;
                        font-size: 15px;
                        margin-top: 5px;
                    }
                }
            }
        }
    }
`;

interface IMess {
    origin: string;
}

export const MessItem = styled.li<IMess>`
    flex: 1;
    max-height: auto;
    > div {
        background: #8176ff;
        padding: 20px;
        border-radius: 6px;
        margin-bottom: 20px;
        max-width: 80%;
        border: 1px solid #f3f3f3;

        ${props =>
            props.origin === 'user' &&
            css`
                & {
                    background: #f5f5f5;
                    float: right;
                    color: #555;
                }
            `}

        ${props =>
            props.origin === 'lu' &&
            css`
                & {
                    background: #8176ff;
                    float: left;
                    color: #f5f5f5;
                }
            `}
    }
`;
