import { useEffect, useState } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import InfoAboutServer from "../InfoAboutServer"


import { EventContext } from "../Contexts/EventContext";

function EventProvider({ children }) {
    const serverInfo = InfoAboutServer()
    const gateway = serverInfo.gateway

    const [eventLoadObject, setEventLoadObject] = useState({
        state: "ready",
        error: null,
        data: null,
    })

    const [eventGroupsLoadObject, setEventGroupsLoadObject] = useState({
        state: "ready",
        error: null,
        data: null,
    })



    const location = useLocation();
    //console.log(location);


    //console.log(searchParams.get("id"));

    useEffect(() => {
        handleLoad();
    }, [location.pathname]);

    async function handleLoad() {
        setEventLoadObject((current) => ({ ...current, state: "pending" }));

        const eventId = location.pathname.split("/").pop()

        const response = await fetch(
            `${gateway}/event/get?id=${eventId}`, // Append eventId to the URL
            {
                method: "GET",
            }
    )
    const responseJson = await response.json()
    if (response.status < 400) {
        setEventLoadObject({ state: "ready", data: responseJson });
        return responseJson;
    } else {
        setEventLoadObject((current) => ({
            state: "error",
            data: current.data,
            error: responseJson.error,
        }));
        throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

    async function handleGetEventGroups(dtoIn) {
        setEventGroupsLoadObject( (current) => ( {...current, state: 'pending'} ))

        // console.log('fetching')
        const response = await fetch(`${gateway}/event/getEventGroups`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(dtoIn),
        })
        // console.log('fetched')
        const responseJson = await response.json()

        if (response.status < 400) {
            setEventGroupsLoadObject( {state: 'ready', data: responseJson} )
            return responseJson
        } else {
            setEventGroupsLoadObject( (current) => ( 
                {
                    state: 'error',
                    data: current.data,
                    error: responseJson.error
                }))
            throw new Error(JSON.stringify(responseJson, null, 2))
        }
    }
  const value = {
    event: eventLoadObject.data,
    getEventGroups: handleGetEventGroups
  }

  return (
    <EventContext.Provider value={value}>
        {children}
    </EventContext.Provider>
  )
}

export default EventProvider;