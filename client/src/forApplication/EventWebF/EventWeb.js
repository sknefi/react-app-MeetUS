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

  const Event = {
    id: 2,
    name: "Epic techno",
    listOfGroups: [3, 1, 2],
    date: new Date("2024-12-23").toLocaleDateString(),
    time: new Date("2024-12-23").toLocaleTimeString(),
    location: "Praha 1",
    price: "250 KČ",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam eum accusamus ipsa excepturi tempora veniam quod. Quia, mollitia illum iste vitae architecto, dolorum aperiam, asperiores quam quisquam iure vel pariatur voluptatem accusantium esse nisi magni nemo? Harum dolores possimus magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reprehenderit ipsum aperiam sapiente voluptates dolores!",
    expectedCountOfMembers: 500,
    photo: null,
  }

  const Groups = [
    {
      id: "c13b6c6e17b749735950c09e41bd8449",
      name: "Crocodiles",
      members: [1, 3, 4, 2],
      maxMembers: 5,
      info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi ea a, aliquam ratione quo voluptate.",
      groupCreator: 1,
    },
    {
      id: "cb9bb1a4ccc7291970cc329c2bbe3031",
      name: "Tigers",
      members: [2, 4],
      maxMembers: 6,
      info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi ea a, aliquam ratione quo voluptate.",
      groupCreator: 2,
    },
    {
      id: 3,
      name: "Šmolkovia",
      members: [1, 2, 3],
      maxMembers: 4,
      info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi ea a, aliquam ratione quo voluptate.",
      groupCreator: 3,
    },
  ]

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

        // event.listOfGroups.map((eGroupId) =>
        //   eventGroups.map((group) => {
        //     if (group.id === eGroupId.id) {
        //       return (
        //         <EventWebDiv
        //           key={group.id}
        //           groupName={group.name}
        //           groupLenMembers={group.members.length}
        //           groupMaxMembers={group.maxMembers}
        //           groupMembers={group.members}
        //         />
        //       )
        //     }
        //   })
        // )
        }
    </div>
  )
}

export default EventWeb
