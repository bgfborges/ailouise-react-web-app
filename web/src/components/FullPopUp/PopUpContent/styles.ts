import { shade } from 'polished';
import styled from 'styled-components';

export const PopUpCalendars = styled.section`
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

    hr {
        margin: 5px 0 20px;
    }
`;

interface ICalendars {
    selected: (string | undefined)[];
}

const isSelected = (props: ICalendars): string[] => {
    const selected = props.selected.map(index => {
        return `&:nth-child(${index}) {
            border: 4px solid #8176ff;
            background: #534d9f;
            > div:nth-child(1) {
                background: #534d9f !important;
            }
            div > svg {color: #f5f5f5 !important;}
            &:hover {
                background: ${shade(0.15, '#534d9f')} !important;
            }
        }`;
    });

    return selected;
};

export const Calendars = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    svg {
        color: white !important;
    }
    li {
        ${isSelected}
    }
`;

export const CalendarItem = styled.li`
    width: 180px;
    margin: 5px;
    height: 200px;
    background: #61ce70;
    border-radius: 6px;
    cursor: pointer;
    transition: background 200ms;
    list-style-type: none;
    border: 4px solid white;

    &:hover {
        background: ${shade(0.15, '#61ce70')};
    }
`;

export const CalendarTitle = styled.div`
    width: 100%;
    padding: 10px;
    border-radius: 6px;
    background: ${shade(0.1, '#61ce70')};
    display: flex;
    align-items: center;
    svg {
        font-size: 20px !important;
        margin: 0 !important;
    }
    h3 {
        color: white;
        font-size: 11px;
        font-weight: 800;
        margin-left: 15px;
    }
`;

export const CalendarContent = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    svg {
        color: white !important;
    }
`;
