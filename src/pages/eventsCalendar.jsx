import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export const EventsCalendar = () => {
    const [events, setEvents] = useState([]);
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const session = useSession();
    const supabase = useSupabaseClient();
    const { isLoading } = useSessionContext();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const { data, error } = await supabase
            .from('events')
            .select('*');
        
        if (error) {
            console.error('Error fetching events:', error);
        } else {
            setEvents(data.map(event => ({
                ...event,
                start: new Date(event.start_time),
                end: new Date(event.end_time)
            })));
        }
    };

    const createEvent = async () => {
        const { data, error } = await supabase
            .from('events')
            .insert([
                {
                    title: eventName,
                    description: eventDescription,
                    start_time: start.toISOString(),
                    end_time: end.toISOString(),
                    created_by: session.user.id
                }
            ]);

        if (error) {
            console.error('Error creating event:', error);
            alert('Error creating event');
        } else {
            console.log('Fetched events:', data);
            alert('Event created successfully');
            fetchEvents(); 
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-outfit">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, width: '100%', maxWidth: 800 }}
            />

            {session && (
                <div className="mt-8">
                    <h2>Create New Event</h2>
                    <div className="mb-4">
                        <p className="mb-2">Start of your event</p>
                        <DateTimePicker onChange={setStart} value={start} />
                    </div>
                    <div className="mb-4">
                        <p className="mb-2">End of your event</p>
                        <DateTimePicker onChange={setEnd} value={end} />
                    </div>
                    <p className="mb-2">Event name</p>
                    <input type="text" onChange={(e) => setEventName(e.target.value)} className="p-2 border rounded mb-4"/>
                    <p className="mb-2">Event description</p>
                    <input type="text" onChange={(e) => setEventDescription(e.target.value)} className="p-2 border rounded mb-4"/>
                    <button onClick={createEvent} className="bg-primary text-white p-4 rounded-lg hover:bg-opacity-40">Create Event</button>
                </div>
            )}
        </div>
    );
};

export default EventsCalendar;