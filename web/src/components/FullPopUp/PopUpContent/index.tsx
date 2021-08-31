import React, { useState, useCallback, useEffect } from 'react';
import { FiCalendar } from 'react-icons/fi';
import { AiFillCheckCircle } from 'react-icons/ai';
import api from '../../../services/api';
import {
    PopUpCalendars,
    Calendars,
    CalendarItem,
    CalendarTitle,
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
    const [selected, setSelected] = useState<string[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        api.get(`calendars/${user.id}/google/`).then(response => {
            setCalendars(response.data.calendars);
        });
    }, [user.id]);

    const selectCalendar = useCallback(
        (e): ICalendarJson => {
            const calendarClicked = e.currentTarget.dataset.index;

            const returnValue = selected.find(item => item === calendarClicked);
            if (!returnValue) {
                setSelected([...selected, calendarClicked]);
                return {
                    calendar: calendarClicked,
                    action: 'update',
                };
            }
            setSelected(selected.filter(item => item !== calendarClicked));
            return {
                calendar: calendarClicked,
                action: 'exclude',
            };
        },
        [selected],
    );

    useEffect(() => {
        api.post('/', {
            selectCalendar,
        });
    }, [selectCalendar]);

    const calendarsAppend = calendars.map(item => (
        <CalendarItem
            key={item.gid}
            data-index={item.gid}
            onClick={selectCalendar}
        >
            <CalendarTitle>
                <div>
                    <div>
                        <AiFillCheckCircle />
                    </div>
                    <div>
                        <h3>{item.summary}</h3>
                    </div>
                </div>
            </CalendarTitle>
        </CalendarItem>
    ));

    return (
        <>
            <PopUpCalendars>
                <section>
                    <FiCalendar />
                    <h3>Welcome to aiLouise</h3>
                    <p>Freemium for While</p>
                    <button type="button" onClick={nextFunc}>
                        Next
                    </button>
                </section>
            </PopUpCalendars>
            <PopUpCalendars>
                <section>
                    <FiCalendar />
                    <h3>Manage as a PRO</h3>
                    <p>All you need as a CTO</p>
                    <div>
                        <button type="button" onClick={nextFunc}>
                            Next
                        </button>
                    </div>
                </section>
            </PopUpCalendars>
            <PopUpCalendars>
                <section>
                    <FiCalendar />
                    <h3>The best for your Client</h3>
                    <p>Offer the Best with Lowest Costs</p>
                    <div>
                        <button type="button" onClick={nextFunc}>
                            Next
                        </button>
                    </div>
                </section>
            </PopUpCalendars>
            <PopUpCalendars>
                <section>
                    <FiCalendar />
                    <h3>Choose Calendars from Google</h3>
                    <p>Sync with the Power of Gmail</p>
                    <Calendars selected={selected}>
                        <div>{calendarsAppend}</div>
                    </Calendars>
                    <div>
                        <button type="button">Finish</button>
                    </div>
                </section>
            </PopUpCalendars>
        </>
    );
};

export default PopUpContent;
