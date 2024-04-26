import { useEffect, useState } from "react"
import { EventListContext } from "../Contexts/EventListContext"
import InfoAboutServer from "../InfoAboutServer"

const EventProvider = ( {children} ) => {
    const serverInfo = InfoAboutServer()
    const gateway = serverInfo.gateway

    const [eventLoadObject, setEventLoadObject] = useState(
        {
            state: 'ready',
            error: 'null',
            data:  'null',
        })

    useEffect( () => {
        const handleLoad = async () => {
            setEventLoadObject( (current) => ( {...current, state: 'pending'} ))

            try {
                const response = await fetch(`${gateway}/event/list`, {
                    method: 'GET'
                });

                if (response.ok) {
                    const responseJson = await response.json();
                    setEventLoadObject({ state: 'ready', data: responseJson });
                } else {
                    const errorResponse = await response.json();
                    setEventLoadObject((current) => ({ state: 'error', data: current.data, error: errorResponse.error }));
                    throw new Error(JSON.stringify(errorResponse, null, 2));
                }
            } catch (error) {
                console.error('Error fetching event list:', error);
            }
        };

        handleLoad();
    }, [gateway]);

    const value = {
        eState: eventLoadObject.state,
        eventList: eventLoadObject.data || [],
        eHandlerMap: {},
    };

    return ( 
        <EventListContext.Provider value={value}>
            {children}
        </EventListContext.Provider>
    );
};

export default EventProvider;
