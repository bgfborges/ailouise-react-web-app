import { shade } from 'polished';
import styled from 'styled-components';

export const PopUpCalendars = styled.section`
    > section {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
`;

interface ICalendarsIds {
    selected: string[];
}

const isSelected = (props: ICalendarsIds): string[] => {
    const selected = props.selected.map(index => {
        // console.log('consoling log here --->', index);
        return `&[data-index="${index}"] {
            > div {
                border: 4px solid #8176ff;
                background: #534d9f;

                svg {
                    color: #8176ff;
                }
            }
        }`;
    });

    return selected;
};

export const Calendars = styled.ul`
    > div {
        color: black;
        max-width: 800px;
        margin-top: 40px;
        margin-bottom: 10px;

        li {
            ${isSelected}
        }
    }
`;

export const CalendarItem = styled.li`
    margin: 5px;
    cursor: pointer;
    transition: background 200ms;
    list-style-type: none;
    float: left;
`;

export const CalendarTitle = styled.div`
    padding: 10px 15px;
    border-radius: 40px;
    background: ${shade(0.1, '#61ce70')};
    display: flex;
    align-items: center;
    color: white;
    border: 4px solid white;

    &:hover {
        background: ${shade(0.15, '#61ce70')};
    }

    div {
        display: flex;
        flex-direction: row;
        items-align: center;
        justify-content: center;

        > div {
            display: flex;
            flex-direction: column;
            items-align: center;
            justify-content: center;
            h3 {
                font-size: 11px;
                font-weight: 800;
                margin-left: 10px;
            }
            svg {
                font-size: 20px !important;
                margin: 0 !important;
            }
        }
    }
`;
