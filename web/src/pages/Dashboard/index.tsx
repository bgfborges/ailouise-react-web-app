import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FiClock } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import DashBoardStructure from '../DashBoardStructure';
import {
    Content,
    Schedule,
    Calendar,
    NextAppointment,
    Session,
    Appointment,
} from './styles';

interface MonthAvailabilityItem {
    day: number;
    avaliable: boolean;
}

interface Appointment {
    id: string;
    date: string;
    hourFormatted: string;
    user: {
        name: string;
        avatar_url: string;
    };
}

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [monthAvailability, setMonthAvailability] = useState<
        MonthAvailabilityItem[]
    >([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const handleDateChange = useCallback((day, modifiers: DayModifiers) => {
        if (modifiers.available && !modifiers.disabled) {
            setSelectedDate(day);
        }
    }, []);

    const handleMonthChange = useCallback((month) => {
        setCurrentMonth(month);
    }, []);

    const disabledDays = useMemo(() => {
        const dates = monthAvailability
            .filter((monthDay) => {
                return monthDay.avaliable === false;
            })
            .map((monthDay) => {
                const year = currentMonth.getFullYear();
                const month = currentMonth.getMonth();
                return new Date(year, month, monthDay.day);
            });
        return dates;
    }, [currentMonth, monthAvailability]);

    useEffect(() => {
        api.get(`/providers/${user.id}/month-availability`, {
            params: {
                year: currentMonth.getFullYear(),
                month: currentMonth.getMonth() + 1,
            },
        }).then((response) => {
            setMonthAvailability(response.data);
        });
    }, [currentMonth, user.id]);

    useEffect(() => {
        api.get<Appointment[]>(`/appointments/me`, {
            params: {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
                day: selectedDate.getDate(),
            },
        }).then((response) => {
            const appointmentFormatted = response.data.map((appointment) => {
                return {
                    ...appointment,
                    hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
                };
            });
            setAppointments(appointmentFormatted);
        });
    }, [selectedDate, user.id]);

    const selectedDateAsText = useMemo(() => {
        return format(selectedDate, "'Day' dd 'of' MMMM");
    }, [selectedDate]);

    const selectedWeekAsText = useMemo(() => {
        return format(selectedDate, 'cccc');
    }, [selectedDate]);

    const morningAppointments = useMemo(() => {
        return appointments.filter((appointment) => {
            return parseISO(appointment.date).getHours();
        });
    }, [appointments]);

    const afternoonAppointments = useMemo(() => {
        return appointments.filter((appointment) => {
            return parseISO(appointment.date).getHours() >= 12;
        });
    }, [appointments]);

    const nextAppointment = useMemo(() => {
        return appointments.find((appointment) =>
            isAfter(parseISO(appointment.date), new Date())
        );
    }, [appointments]);

    return (
        <DashBoardStructure>
            <Content>
                <Schedule>
                    <h1>Scheduled Appointments</h1>
                    <p>
                        {isToday(selectedDate) && <span>Today</span>}
                        <span>{selectedDateAsText}</span>
                        <span>{selectedWeekAsText}</span>
                    </p>
                    {isToday(selectedDate) && nextAppointment && (
                        <NextAppointment>
                            <strong>Next Appointment</strong>
                            <div>
                                <img
                                    src={nextAppointment.user.avatar_url}
                                    alt={nextAppointment.user.name}
                                />
                                <strong>{nextAppointment.user.name}</strong>
                                <span>
                                    <FiClock />
                                    {nextAppointment.hourFormatted}
                                </span>
                            </div>
                        </NextAppointment>
                    )}
                    <Session>
                        <strong>Morning</strong>

                        {morningAppointments.length === 0 && (
                            <p>No appointments at morning! :)</p>
                        )}

                        {morningAppointments.map((appointment) => (
                            <Appointment key={appointment.id}>
                                <span>
                                    <FiClock />
                                    {appointment.hourFormatted}
                                </span>
                                <div>
                                    <img
                                        src={appointment.user.avatar_url}
                                        alt={appointment.user.name}
                                    />
                                    <strong>{appointment.user.name}</strong>
                                </div>
                            </Appointment>
                        ))}
                    </Session>
                    <Session>
                        <strong>Afternoon</strong>

                        {afternoonAppointments.length === 0 && (
                            <p>No appointments at afernoon! :)</p>
                        )}

                        {afternoonAppointments.map((appointment) => (
                            <Appointment key={appointment.id}>
                                <span>
                                    <FiClock />
                                    {appointment.hourFormatted}
                                </span>
                                <div>
                                    <img
                                        src={appointment.user.avatar_url}
                                        alt={appointment.user.name}
                                    />
                                    <strong>{appointment.user.name}</strong>
                                </div>
                            </Appointment>
                        ))}
                    </Session>
                </Schedule>
                <Calendar>
                    <div>
                        <DayPicker
                            fromMonth={new Date()}
                            disabledDays={[
                                { daysOfWeek: [0] },
                                ...disabledDays,
                            ]}
                            modifiers={{
                                available: { daysOfWeek: [1, 2, 3, 4, 5, 6] },
                            }}
                            onMonthChange={handleMonthChange}
                            selectedDays={selectedDate}
                            onDayClick={handleDateChange}
                        />

                        <button type="button">Past Meetings</button>
                    </div>
                </Calendar>
            </Content>
        </DashBoardStructure>
    );
};

export default Dashboard;
