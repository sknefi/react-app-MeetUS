import { useEffect, useState } from "react"
import { EventListContext } from "../Contexts/EventListContext"
import InfoAboutServer from "../InfoAboutServer"

const EventProvider = ( {children} ) => {
    const serverInfo = InfoAboutServer()
    const gateway = serverInfo.gateway
    // console.log(serverInfo.gateway)


    const [eventLoadObject, setEventLoadObject] = useState(
        {
            state: 'ready',
            error: 'null',
            data:  'null',
        })
    
    useEffect( () => {
        handleLoad()
    }, [])
    
    async function handleLoad() {
        setEventLoadObject( (current) => ( {...current, state: 'pending'} ))

        // console.log('fetching')
        const response = await fetch(`${gateway}/event/list`, {
            method: 'GET'
        })
        // console.log('fetched')
        const responseJson = await response.json()

        if (response.status < 400) {
            setEventLoadObject( {state: 'ready', data: responseJson} )
            return responseJson
        } else {
            setEventLoadObject( (current) => ( 
                {
                    state: 'error',
                    data: current.data,
                    error: responseJson.error
                }))
            throw new Error(JSON.stringify(responseJson, null, 2))
        }

    }


    const value = {
        eState: eventLoadObject.state,
        eventList: eventLoadObject.data || [],
        eHandlerMap: { },
    }

  return ( 
    <EventListContext.Provider value={value}>
        {children}
    </EventListContext.Provider>
  )
}

export default EventProvider