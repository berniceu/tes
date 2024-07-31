import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { NavBar, Footer } from './homePage';

const localizer = momentLocalizer(moment);

const EventDetails = ({ event, onClose }) => {
    if (!event) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10" id="my-modal">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{event.title}</h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">
                {event.description}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Start: {new Date(event.start).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                End: {new Date(event.end).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {event.is_online ? "Online Event" : "In-Person Event"}
              </p>
              <p className="text-sm text-gray-500">
                {event.is_online ? `Meeting Link: ${event.Google_meet_link}` : "Location: "}
                {event.location}
              </p>
            </div>
            <div className="items-center px-4 py-3">
              <button
                id="ok-btn"
                className="px-4 py-2 bg-primary text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-pink-200 focus:outline-none focus:ring-2"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

export const EventsCalendar = () => {
    const [events, setEvents] = useState([]);
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [isOnline, setIsOnline] = useState(false);
    const [location, setLocation] = useState("");
    const [googleMeetLink, setGoogleMeetLink] = useState("");
    const session = useSession();
    const supabase = useSupabaseClient();
    const { isLoading } = useSessionContext();
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
    };

    const fetchEvents = async () => {
        try {
            const { data, error } = await supabase
                .from('events')
                .select('*');
            
            if (error) throw error;
            
            console.log('Fetched events:', data);
            setEvents(data.map(event => ({
                ...event,
                start: new Date(event.start_time),
                end: new Date(event.end_time)
            })));
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    

    const createEvent = async () => {
        const { data, error } = await supabase
            .from('events')
            .insert([
                {
                    title: eventName,
                    description: eventDescription,
                    start_time: start.toISOString(),
                    end_time: end.toISOString(),
                    created_by: session.user.id,
                    is_online: isOnline,
                    location: location,
                    Google_meet_link: googleMeetLink
                }
            ]);

        if (error) {
            console.error('Error creating event:', error);
            alert('Error creating event');
        } else {
            console.log('Fetched events:', data);
            alert('Event created successfully');
            fetchEvents(); 
            setEventName("");
            setEventDescription("");
            setIsOnline(false);
            setLocation("");
            setGoogleMeetLink("");
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <NavBar/>

<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-outfit">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, width: '100%', maxWidth: 800 }}
                onSelectEvent={handleSelectEvent}
            />
            <EventDetails event={selectedEvent} onClose={() => setSelectedEvent(null)} />

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
        </>
        
    );
};

export default EventsCalendar;