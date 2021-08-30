import React, { useState, useCallback, useEffect } from 'react';
import { FiCalendar } from 'react-icons/fi';
import { BsFillCalendarFill } from 'react-icons/bs';
import { AiFillCheckCircle } from 'react-icons/ai';
import api from '../../../services/api';
import {
    PopUpCalendars,
    Calendars,
    CalendarItem,
    CalendarTitle,
    CalendarContent,
} from './styles';
import { useAuth } from '../../../hooks/auth';

interface IPopUpContent {
    index: number;
    nextFunc?: () => void;
    backFunc?: () => void;
}

interface ICalendar {
    id?: string;
    gid?: string;
    summary?: string;
    color?: string;
}

interface ICalendarJson {
    calendar: ICalendar;
    action: 'update' | 'exclude';
}

const PopUpContent: React.FC<IPopUpContent> = ({ nextFunc }) => {
    const [calendars, setCalendars] = useState<ICalendar[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        api.get(`/calendars/google/${user.id}/`, {}).then(response => {
            setCalendars(response.data);
        });
    }, [user.id]);

    const selectCalendar = useCallback(
        (e): ICalendarJson => {
            const calendarClicked = e.currentTarget.dataset.index;

            const selectedCalendar = {
                id: calendarClicked,
                gid: calendarClicked,
                color: 'red',
                summary: 'My Client Callendar',
            };

            const returnValue = calendars.find(
                item => item.gid === calendarClicked,
            );
            if (!returnValue) {
                setCalendars([...calendars, selectedCalendar]);
                return {
                    calendar: selectedCalendar,
                    action: 'update',
                };
            }
            setCalendars(
                calendars.filter(item => item.gid !== calendarClicked),
            );
            return {
                calendar: selectedCalendar,
                action: 'exclude',
            };
        },
        [calendars],
    );

    useEffect(() => {
        api.post('/', {
            selectCalendar,
        });
    }, [selectCalendar]);

    const selectedCalendars = useCallback(() => {
        const selected = calendars.map(item => item.gid);
        return selected;
    }, [calendars]);

    return (
        <>
            <PopUpCalendars>
                <FiCalendar />
                <h3>Set Your Calendars Now</h3>
                <p>Premium for free</p>
                <button type="button" onClick={nextFunc}>
                    Next
                </button>
            </PopUpCalendars>
            <PopUpCalendars>
                <FiCalendar />
                <h3>Connect with Google</h3>
                <p>The Powerful of Google Calendars</p>
                <div>
                    <button type="button" onClick={nextFunc}>
                        Next
                    </button>
                </div>
            </PopUpCalendars>
            <PopUpCalendars>
                <FiCalendar />
                <h3>Connect with Apple</h3>
                <p>The Calendars of Your Apple</p>
                <div>
                    <button type="button" onClick={nextFunc}>
                        Next
                    </button>
                </div>
            </PopUpCalendars>
            <PopUpCalendars>
                <h3>Choose from Google</h3>
                <hr />
                <Calendars selected={selectedCalendars()}>
                    <CalendarItem
                        key={1}
                        data-index={1}
                        onClick={selectCalendar}
                    >
                        <CalendarTitle>
                            <AiFillCheckCircle />
                            <h3>Meetings with Clients</h3>
                        </CalendarTitle>
                        <CalendarContent>
                            <BsFillCalendarFill />
                        </CalendarContent>
                    </CalendarItem>
                    <CalendarItem
                        key={2}
                        data-index={2}
                        onClick={selectCalendar}
                    >
                        <CalendarTitle>
                            <AiFillCheckCircle />
                            <h3>Meetings with Clients</h3>
                        </CalendarTitle>
                        <CalendarContent>
                            <BsFillCalendarFill />
                        </CalendarContent>
                    </CalendarItem>
                    <CalendarItem
                        key={3}
                        data-index={3}
                        onClick={selectCalendar}
                    >
                        <CalendarTitle>
                            <AiFillCheckCircle />
                            <h3>Meetings with Clients</h3>
                        </CalendarTitle>
                        <CalendarContent>
                            <BsFillCalendarFill />
                        </CalendarContent>
                    </CalendarItem>
                </Calendars>
                <div>
                    <button type="button">Update</button>
                </div>
            </PopUpCalendars>
        </>
    );
};

export default PopUpContent;
