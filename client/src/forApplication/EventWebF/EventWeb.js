import React, { useContext, useEffect, useState } from "react" // Import useEffect

import "./EventWeb.css"
import party from "../images/party.jpeg"

import EventWebDiv from "./EventWebDiv"
import ModalCreateNewGroup from "../CreateNewGroup/ModalCreateNewGroup"

import { EventContext } from "../../Technician/Contexts/EventContext"

const EventWeb = () => {
  const { handlerMap, eventGroups } = useContext(EventContext)
  const [event, setEvent] = useState()

  useEffect(() => {
    handlerMap
      .handleGetEvent()
      .then((eventData) => {
        setEvent(eventData)
      })
      .catch((error) => {
        console.error("Error fetching event data:", error)
      })
  }, [])

  console.log(event)
  console.log(eventGroups)
  return (
    <div className="all-event-web">
      <h2 className="event-name">{event ? event.name : ""}</h2>
      <img className="event-image" src={party} alt={event ? event.name : ""} />
      <p className="event-info">{event ? event.info : ""}</p>

      <ModalCreateNewGroup />
      {event && eventGroups &&
            eventGroups.map( (group) => {
                return <EventWebDiv
                          key={group.id}
                          groupName={group.name}
                          groupLenMembers={group.members.length}
                          groupMaxMembers={group.maxMembers}
                          groupMembers={group.members}
                        />
            })
        }
    </div>
  )
}

export default EventWeb
