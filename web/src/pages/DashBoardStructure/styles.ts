import styled, { css } from 'styled-components';
import { lighten, shade, linearGradient } from 'polished';

export const Container = styled.div`
    display: flex;
`;

export const SideBar = styled.div`
    max-width: 15vw;
    width: auto;
    height: 100vh;
    position: sticky;
    top: 0px;
`;

export const SidebarHeaderContent = styled.div`
    max-width: 15vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #8176ff;
    position: -webkit-sticky; /* Safari & IE */
    position: sticky;
    left: 0;
    height: 100vh;

    > span {
        width: 100%;
        height: 61px;
        display: flex;
        flex-direction: column;
        padding: 0 30px;
        justify-content: center;
        background: ${linearGradient({
            colorStops: [shade(0.18, '#8176ff'), lighten(0, '#8176ff')],
            toDirection: 'to bottom right',
        })};
        > img {
            width: 70%;
        }
    }

    > div {
        width: 100%;
        padding: 10px;
        margin-top: 0px;
        color: ${shade(0.05, '#f5f5f5')};

        ul {
            padding: 0;
            margin: 0;

            li {
                width: 180px;
                margin: 20px 0;
                padding: 10px 20px;
                list-style-type: none;
                transition: border-radius 1s, background 100ms, color 100ms;
                border-radius: 20px;
                cursor: pointer;
                display: flex;
                align-items: center;
                font-weight: 600;
                font-size: 13px;

                div {
                    display: flex;
                    align-items: center;
                    width: 40px;

                    svg {
                        font-size: 20px;
                    }
                }

                &:hover {
                    border-radius: 0px;
                    background: white;
                    color: #8176ff;
                }
            }
        }
    }

    button {
        background: transparent;
        border: 0;
        position: absolute;
        bottom: 13px;
        color: white;
        display: flex;
        align-items: center;
        font-weight: 600;

        svg {
            margin-right: 5px;
            font-size: 16px;
        }
    }
`;

export const RightSide = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const TopBar = styled.div`
    width: 100%;
    padding: 5px 20px;
    max-height: 60px;
    background: #202020;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 1000;
`;

export const Welcome = styled.div`
    max-width: 400px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    > span {
        background: #272727;
        display: flex;
        flex-direction: column;
        position: absolute;
        left: 0;
        bottom: 0;
        top: 0;
        width: 60px;

        button {
            flex: 1;
            background: transparent;
            border: 0;
            svg {
                color: #f5f5f5;
                font-size: 22px;
            }
        }
    }

    div {
        display: flex;
        flex-direction: column;
        margin-left: 60px;
        color: black;

        span {
            font-size: 12px;
            font-weight: 600;
            color: #8176ff;
        }

        strong {
            font-size: 15px;
            color: #61ce70;
        }
    }
`;

export const ProfilePhoto = styled.img``;

interface ProfileStatus {
    active: boolean;
}

export const Profile = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    img {
        height: 45px;
        width: 45px;
        border-radius: 50%;
        object-fit: cover;
        cursor: pointer;
    }
`;

export const MenuWrapper = styled.div<ProfileStatus>`
    width: 250px;
    padding: 10px;
    background: #534d9f;
    position: absolute;
    top: 60px;
    right: 0;
    z-index: 1000;
    border-radius: 8px;
    visibility: hidden;
    display: none;

    &::before {
        content: '';
        border-style: solid;
        border-color: #534d9f transparent;
        border-width: 0px 6px 6px 6px;
        position: absolute;
        bottom: 20px;
        bottom: 100%;
        right: 10px;
        transform: translateX(-50%);
    }

    ul {
        margin: 0;
        padding: 0;

        li {
            list-style-type: none;
            font-weight: 600;
            padding: 10px;
            font-size: 12px;
            display: flex;
            align-items: center;
            color: #f5f5f5;
            text-decoration: none;

            a {
                text-decoration: none;
                color: #f5f5f5;
            }

            svg {
                margin-right: 10px;
                font-size: 15px;
            }

            &:hover {
                opacity: 0.8;
            }
        }
    }

    ${props =>
        props.active &&
        css`
            & {
                display: block;
                visibility: visible;
            }
        `}

    button {
        background: transparent;
        border: none;
        color: #f5f5f5;
    }
`;

export const Content = styled.div`
    padding: 60px;
`;
