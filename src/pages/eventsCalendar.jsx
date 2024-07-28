import React, {useState} from "react";
import { useSession, useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react";
import DateTimePicker from 'react-datetime-picker';


export const EventsCalendar = () => {

    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const session = useSession();
    const  supabase = useSupabaseClient();
    const {isLoading} = useSessionContext();

    if(isLoading) {
        return <div></div>;
    }

    const googleSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                scopes: 'https://www.googleapis.com/auth/calendar'
            },
        });

        if(error){
            alert("Error logging In");
            console.log(error);
        }
    }

    const signOut = async () => {
        await supabase.auth.signOut();
        alert("You've been logged out");
    }

    const createCalendarEvent = async () => {
        console.log('Creating Calendar Event');
        const event = {
            'summary': eventName,
            'description': eventDescription,
           'start': {
             'dateTime': start.toISOString(),
             'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'end': {
             'dateTime': end.toISOString(),
             'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
        }

        await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session.provider_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log('Event created successfully', data);
            alert('Event created successfully');
        })
    }

    console.log(session);
    console.log(start);
    console.log(eventName);
    console.log(eventDescription);
    return (
        <>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-outfit">
            {
                session ?
                <>
                    <h2>Hey {session.user.email}</h2>
                        <div className="mb-4">
                        <p className="mb-4">Start of your event</p>
                        <DateTimePicker onChange={setStart} value={start} className="w-full p-2 border rounded z-30" calendarClassName= 'bg-white shadow-lg rounded-lg'/>
                        </div>

                        <div className="mb-4">
                        <p className="mb-4">End of your event</p>
                        <DateTimePicker onChange={setEnd} value={end} className="w-full p-2 border rounded z-20" />
                        </div>
                    
                    
                    <p className="mb-2">Event name</p>
                    <input type="text" onChange={(e) => setEventName(e.target.value)} className="p-2 border rounded mb-4"/>
                    <p className="mb-2">Event description</p>
                    <input type="text" onChange={(e) => setEventDescription(e.target.value)} className="p-2 border rounded mb-4"/>
                    <button onClick={() => createCalendarEvent()} className="bg-primary text-white p-4 rounded-lg hover:bg-opacity-40">Create Calendar Event</button>
                    <button onClick={() => signOut()} className="p-4 rounded-lg hover:bg-opacity-40">Sign Out</button>

                </>
                :
                <>
                    <button onClick={() => googleSignIn()} className="p-4 rounded-lg hover:bg-opacity-40">Sign In With Google</button>
                </>
            }
        </div>
        </>
    );
}

export default EventsCalendar;