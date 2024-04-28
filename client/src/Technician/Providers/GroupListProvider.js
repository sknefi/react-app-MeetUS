import { useEffect, useState } from "react"
import { GroupListProvider } from "../Contexts/GroupListContext"
import InfoAboutServer from "../InfoAboutServer"

const GroupProvider = ( {children} ) => {
    const serverInfo = InfoAboutServer()
    const gateway = serverInfo.gateway
    // console.log(serverInfo.gateway)


    const [groupLoadObject, setGroupLoadObject] = useState(
        {
            state: 'ready',
            error: 'null',
            data:  'null',
        })
    
    useEffect( () => {
        handleLoad()
    }, [])
    
    async function handleLoad() {
        setGroupLoadObject( (current) => ( {...current, state: 'pending'} ))

        // console.log('fetching')
        const response = await fetch(`${gateway}/group/list`, {
            method: 'GET'
        })
        // console.log('fetched')
        const responseJson = await response.json()

        if (response.status < 400) {
            setGroupLoadObject( {state: 'ready', data: responseJson} )
            return responseJson
        } else {
            setGroupLoadObject( (current) => ( 
                {
                    state: 'error',
                    data: current.data,
                    error: responseJson.error
                }))
            throw new Error(JSON.stringify(responseJson, null, 2))
        }

    }

    async function REWRITEMEBITCH(dtoIn) {
        setGroupLoadObject( (current) => ( {...current, state: 'pending'} ))

        // console.log('fetching')
        const response = await fetch(`${gateway}/group/list`, {
            method: 'GET'
        })
        // console.log('fetched')
        const responseJson = await response.json()

        if (response.status < 400) {
            setGroupLoadObject( {state: 'ready', data: responseJson} )
            return responseJson
        } else {
            setGroupLoadObject( (current) => ( 
                {
                    state: 'error',
                    data: current.data,
                    error: responseJson.error
                }))
            throw new Error(JSON.stringify(responseJson, null, 2))
        }

    }

    const value = {
        gState: groupLoadObject.state,
        groupList: groupLoadObject.data || [],
        gHandlerMap: { },
    }

  return ( 
    <GroupListProvider.Provider value={value}>
        {children}
    </GroupListProvider.Provider>
  )
}

export default GroupProvider