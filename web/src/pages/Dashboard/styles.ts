import { shade } from 'polished';
import styled from 'styled-components';
import ArrowLeftIcon from '../../assets/ArrowLeftIcon.svg';
import ArrowRightIcon from '../../assets/ArrowRightIcon.svg';

export const Content = styled.main`
    display: flex;
    max-width: 100%;
`;

export const Schedule = styled.div`
    flex: 1;
    margin-right: 200px;

    p {
        margin-top: 8px;
        color: #61ce70;
        display: flex;
        align-items: center;
        font-weight: 600;

        span {
            display: flex;
            align-items: center;
            font-size: 13px;
            word-spacing: 0.1em;
        }

        span + span::before {
            content: '';
            width: 2px;
            height: 12px;
            background: #61ce70;
            margin: 0 8px;
        }
    }
`;

export const NextAppointment = styled.div`
    margin-top: 80px;
    > strong {
        font-size: 20px;
        font-weight: 700;
        color: ${shade(0.3, '#f5f5f5')};
    }

    div {
        background: #3e3b47;
        display: flex;
        align-items: center;
        padding: 16px 24px;
        border-radius: 10px;
        margin-top: 16px;
        position: relative;

        &::before {
            content: '';
            position: absolute;
            height: 80%;
            width: 2px;
            left: 0;
            top: 10%;
            background: #61ce70;
        }

        img {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 50%;
        }

        strong {
            margin-left: 24px;
            color: #f5f5f5;
            font-size: 14px;
        }

        span {
            margin-left: auto;
            display: flex;
            align-items: center;
            color: #f5f5f5;
            font-size: 12px;
            font-weight: 600;

            svg {
                font-size: 16px;
                color: #61ce70;
                margin-right: 8px;
            }
        }
    }
`;

export const Session = styled.section`
    margin-top: 48px;

    > p {
        font-size: 12px;
        color: #333;
        margin-top: 20px;
    }

    > strong {
        display: block;
        font-size: 15px;
        font-weight: 600;
        color: ${shade(0.3, '#f5f5f5')};
        line-height: 26px;
        padding-bottom: 16px;
        border-bottom: 1px solid ${shade(0.85, '#f5f5f5')};
    }
`;

export const Appointment = styled.div`
    display: flex;
    align-items: center;
    margin-top: 30px;
    cursor: pointer;

    & + div {
        margin-top: 16px;
    }

    > span {
        display: flex;
        color: #f5f5f5;
        font-size: 12px;
        font-weight: 700;
        width: 60px;

        svg {
            font-size: 16px;
            color: #61ce70;
            margin-right: 8px;
        }
    }

    div {
        flex: 1;
        background: #3e3b47;
        display: flex;
        align-items: center;
        padding: 16px 24px;
        border-radius: 10px;
        margin-left: 16px;
        position: relative;

        &::before {
            content: '';
            position: absolute;
            height: 6px;
            width: 6px;
            left: -3px;
            border-radius: 50%;
            top: calc(50% - 3px);
            background: #61ce70;
            transition: background 200ms, top 200ms, bottom 200ms, left 200ms,
                border-radius 200ms, height 200ms, width 200ms;
        }

        &:hover {
            &::before {
                top: 10%;
                bottom: 10%;
                left: 0;
                border-radius: 5px;
                height: 80%;
                width: 2px;
                background: #61ce70;
                margin-top: 0;
            }
        }

        img {
            width: 45px;
            height: 45px;
            object-fit: cover;
            border-radius: 50%;
        }

        strong {
            margin-left: 24px;
            color: #f5f5f5;
            font-size: 15px;
        }
    }
`;

export const Calendar = styled.aside`
    width: 350px;

    > div {
        position: -webkit-sticky; /* Safari & IE */
        position: sticky;
        top: 40px;
        .DayPicker {
            border-radius: 10px;
            left: 20px;
            &-wrapper {
                padding-bottom: 0;
                background: #28262e;
                border-radius: 10px;
                z-index: 0;
            }
            &-NavBar {
                position: relative;
                ::before {
                    content: '';
                    width: 100%;
                    height: 50px;
                    position: absolute;
                    background: #3e3b47;
                    border-radius: 10px 10px 0 0;
                    z-index: -1;
                }
            }
            &-NavButton {
                color: #999591 !important;
                margin-top: 0;
                top: 0;
                &--prev {
                    background: url(${ArrowLeftIcon}) no-repeat center;
                    margin-right: 0;
                    left: 12px;
                    width: 50px;
                    height: 50px;
                }
                &--next {
                    background: url(${ArrowRightIcon}) no-repeat center;
                    right: 12px;
                    width: 50px;
                    height: 50px;
                }
            }
            &-Month {
                border-collapse: separate;
                border-spacing: 8px;
                margin: 0;
                padding: 0 10px 10px;
            }
            &-Caption {
                line-height: 50px;
                color: #f4ede8;
                > div {
                    text-align: center;
                }
            }
            &-Weekday {
                color: #666360;
                font-size: 16px;
            }
            &-Day {
                width: 40px;
                height: 40px;
                transition: all 0.2s ease;
                border-radius: 10px;
                &--today {
                    font-weight: normal;
                    color: #fff;
                }
                &--available:not(.DayPicker-Day--outside) {
                    background: #3e3b47;
                    border-radius: 10px;
                }
                &--disabled {
                    color: #666360;
                    background: transparent !important;
                }
                &--selected:not(.DayPicker-Day--disabled) {
                    background: #61ce70 !important;
                    color: #ffffff !important;
                }
            }
            &:not(.DayPicker--interactionDisabled)
                .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
                background: ${shade(0.2, '#3e3b47')};
            }
        }
    }

    button {
        width: 100%;
        padding: 12px 30px;
        margin-top: 30px;
        border-radius: 8px;
        border: 0;
        background: #3e3b47;
        font-weight: 600;
        color: #999;
    }
`;
