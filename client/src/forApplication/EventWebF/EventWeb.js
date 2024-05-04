import React, { useContext, useEffect, useState } from "react" // Import useEffect

import "./EventWeb.css"
import party from "../images/party.jpeg"

import EventGroupDiv from "./EventGroupDiv"
import ModalCreateNewGroup from "../CreateNewGroup/ModalCreateNewGroup"

import { EventContext } from "../../Technician/Contexts/EventContext"
import { ColorPalletContext } from "../../Technician/Contexts/ColorPalletContext"

const EventWeb = () => {
  const { colorPallet } = useContext(ColorPalletContext)
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

  //console.log(event)
  //console.log(eventGroups)
  return (
    <div className="all-event-web">
      <h2 className="event-name" style={{color: `${colorPallet.fourthcolor}`}}>{event ? event.name : ""}</h2>
      <img className="event-image" src={party} alt={event ? event.name : ""} />
      <p className="event-info" style={{color: `${colorPallet.fourthcolor}`, borderBottom: `2px solid ${colorPallet.fourthcolor}`}}>{event ? event.info : ""}</p>

      <ModalCreateNewGroup />

      {event && eventGroups &&
            eventGroups.map( (group, index) => {
              //console.log(group)
                return <EventGroupDiv
                          // v tomto momente ešte server nevytvoril ID pre skupinu
                          key={index}
                          groupp={group}
                        />
            })
        }
    </div>
  )
}

export default EventWeb
