import { useEffect, useState } from "react"

import { EventListContext } from "../Contexts/EventListContext"

import InfoAboutServer from "../InfoAboutServer"
import { create } from "@mui/material/styles/createTransitions"

const EventProvider = ({ children }) => {
  const serverInfo = InfoAboutServer()
  const gateway = serverInfo.gateway

  const [loadObject, setLoadObject] = useState({
    state: "-",
    events: [],
  })

  useEffect(() => {
    getEventList()
  }, [])

  async function getEventList() {
    try {
      setLoadObject((current) => ({ ...current, state: "pending" }))
      const response = await fetch(`${serverInfo.gateway}/event/list`, {
        method: "GET",
      })

      if (response.status < 400) {
        const eventList = await response.json()
        setLoadObject((current) => ({
          ...current,
          state: "ready",
          events: eventList,
        }))

        return eventList
      } else {
        setLoadObject((current) => ({ ...current, state: "error" }))
        throw new Error("Invalid email or password")
      }
    } catch (error) {
      setLoadObject((current) => ({ ...current, state: "error" }))
      console.error("Error logging in:", error.message)
    }
  }

  async function createEvent(event) {
    try {
      setLoadObject((current) => ({ ...current, state: "pending" }))
      const response = await fetch(`${serverInfo.gateway}/event/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      })

      if (response.status < 400) {
        const createdEvent = await response.json()
        setLoadObject((current) => ({
          ...current,
          state: "ready",
          events: [...current.events, createdEvent], // Add the created event to the events array
        }))
        console.log(loadObject)
        console.log(event)
        return createdEvent
      } else {
        setLoadObject((current) => ({ ...current, state: "error" }))
      }
    } catch (error) {
      setLoadObject((current) => ({ ...current, state: "error" }))
      console.error("Error creating event:", error.message)
    }
  }

  const value = {
    state: loadObject.state,
    allEvents: loadObject.events,
    handleCreateEvent: createEvent,
  }

  return (
    <EventListContext.Provider value={value}>
      {children}
    </EventListContext.Provider>
  )
}

export default EventProvider
