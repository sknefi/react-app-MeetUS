import { useContext, useEffect, useState } from "react"

import { EventListContext } from "../../Technician/Contexts/EventListContext"
import { LoggedUserContext } from "../../Technician/Contexts/LoggedUserContext"

import "./Events.css"


import ModalCreateEvent from "../AddEventWebF/ModalCreateEvent.js"
import EventDiv from "./EventDiv"

const Events = () => {
  const { allEvents } = useContext(EventListContext)
  const { loggedUser } = useContext(LoggedUserContext)

  return (
    <div className="all-event-dashboard">
      {loggedUser && loggedUser.rola === 2 && <ModalCreateEvent />}

      {allEvents.map((event) => (

        <EventDiv event={event} loggedUser={loggedUser}/>
      ))}
    </div>
  )
}

export default Events
