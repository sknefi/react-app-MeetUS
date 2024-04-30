import { useEffect, useState } from "react"
import { useLocation, useSearchParams, useNavigate } from "react-router-dom"
import InfoAboutServer from "../InfoAboutServer"

import { EventContext } from "../Contexts/EventContext"

function EventProvider({ children }) {
  const serverInfo = InfoAboutServer()
  const gateway = serverInfo.gateway

  const [event, setEvent] = useState({})
  const [eventGroups, setEventGroups] = useState([])

  const [eventLoadObject, setEventLoadObject] = useState({
    state: "ready",
    error: null,
  })

  const location = useLocation()
  //console.log(location)

  //console.log(searchParams.get("id"))

  async function handleGetEvent() {
    setEventLoadObject((current) => ({ ...current, state: "pending" }))

    const eventId = location.pathname.split("/").pop()

    const response = await fetch(`${gateway}/event/get?id=${eventId}`, {
      method: "GET",
    })
    const responseJson = await response.json()
    if (response.status < 400) {
      setEventLoadObject((current) => ({ ...current, state: "ready" }))
      setEvent(responseJson)
      handleGetEventGroups({
        listOfGroups: responseJson.listOfGroups
      })
      console.log(responseJson)

      return responseJson
    } else {
      setEventLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }))
      throw new Error(JSON.stringify(responseJson, null, 2))
    }
  }

  async function handleGetEventGroups(dtoIn) {
    setEventLoadObject((current) => ({ ...current, state: "pending" }))
    console.log(dtoIn)

    const response = await fetch(`${gateway}/event/getEventGroups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    })

    const responseJson = await response.json()

    if (response.status < 400) {
      setEventLoadObject((current) => ({
        ...current,
        state: "ready",
        data: responseJson,
      }))

      setEventGroups(responseJson)

      return responseJson
    } else {
      setEventLoadObject((current) => ({
        ...current,
        state: "error",
        error: responseJson.error,
      }))
      throw new Error(JSON.stringify(responseJson, null, 2))
    }
  }

  const value = {
    event: event,
    eventGroups: eventGroups,
    state: eventLoadObject.state,
    handlerMap: { handleGetEvent, handleGetEventGroups },
  }

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  )
}

export default EventProvider
