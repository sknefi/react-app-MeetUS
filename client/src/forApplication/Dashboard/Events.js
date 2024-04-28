import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'

import { EventListContext } from '../../Technician/Contexts/EventListContext'

import './Events.css'
import ModalCreateEvent from "../AddEventWebF/ModalCreateEvent.js"


const Events = () => {
    const { eventList, eHandlerMap, eState } = useContext(EventListContext)
    
    const navigate = useNavigate()

    const redirectToEvent = (eventId) => {
        navigate(`/event/${eventId}`);
    }

    if (!eventList) {
        return <div>Loading...</div>
    }

    //console.log(eventList)


    //eventList.map( (x) => console.log(x))  // error: 'eventList.map is not a function'

    const allEvents = [
        {
            id:                     'a3cd3dbfab81719a8cdb9f783384ff86',
            name:                   'Art Exhibiton',
            listOfGroups:           [1, 2, 3],
            dateTime:               new Date("2024-04-18T12:30:00Z"),
            location:               "Praha 2",
            price:                  '200 KČ',
            info:                   'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reprehenderit ipsum aperiam sapiente voluptates dolores!',
            expectedCountOfMembers: 300,
            photo:                  null,

        },

        {
            id:                     '2db13c923776be7d80993fbd4455dc4f',
            name:                   'Jazz Night',
            listOfGroups:           [3, 4],
            dateTime:               new Date("2026-04-18T12:30:00Z"),
            location:               "Praha 1",
            price:                  '250 KČ',
            info:                   'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reprehenderit ipsum aperiam sapiente voluptates dolores!',
            expectedCountOfMembers: 500,
            photo:                  null,

        },

        {
            id:                     'fe7dfbdd8f5b2604708c09b36302949d',
            name:                   'Summer Festival',
            listOfGroups:           [1, 2, 3, 4],
            dateTime:               new Date("2025-04-18T12:30:00Z"),
            location:               "Šumava",
            price:                  'FREE',
            info:                   'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reprehenderit ipsum aperiam sapiente voluptates dolores!',
            expectedCountOfMembers: 1000,
            photo:                  null,
        },

    ]
    
    const Groups = [
        {
            id: 1,
            name: 'Crocodiles',
            members: [1, 3, 4],
            maxMembers: 5,
            info: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi ea a, aliquam ratione quo voluptate.',
            groupCreator: 1
        },
        {
            id: 2,
            name: 'Tigers',
            members: [2, 4],
            maxMembers: 6,
            info: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi ea a, aliquam ratione quo voluptate.',
            groupCreator: 2
        },
        {
            id: 3,
            name: 'Lions',
            members: [1, 2, 3],
            maxMembers: 4,
            info: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi ea a, aliquam ratione quo voluptate.',
            groupCreator: 3
        },
        {
            id: 4,
            name: 'Elephants',
            members: [4, 5, 6],
            maxMembers: 6,
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac sagittis urna. Fusce euismod magna non dolor aliquet, nec hendrerit augue aliquet.',
            groupCreator: 5
        }
    ]



    function eventGroups(event) {
        return event.listOfGroups.map( eGroupId => 
            Groups.map( group => {
                if (group.id === eGroupId) {

                    return <div key={group.id} className='group-counts'>
                        {group.members.length} / {group.maxMembers}
                    </div>
                }
                
                return null
            }))
    }

    function convertIsoToDate(isoStr){
        const year = isoStr.getFullYear();
        const month = isoStr.getMonth() + 1; // Adjusting to get 1-based month
        const day = isoStr.getDate();

        return `${day}.${month} ${year}`
    }

    function convertIsoToTime(isoStr){
        const hours = isoStr.getHours();
        const minutes = isoStr.getMinutes();

        return `${hours}:${minutes}`
    }

    function leftSide(event) {
        return <div className="left-side">
            <div className="left-up">
                <h2 className='event-name'>{event.name}</h2>
                <div className='left-up-right'>
                    <p className='date-time'>{convertIsoToDate(event.dateTime)}</p>
                    <p className='date-time'>{convertIsoToTime(event.dateTime)}</p>
                </div>
            </div>

            <div className="left-down">

            {eventGroups(event)}

            </div>
        </div>
    }

    function rightSide(event) {
        return <div className="right-side">
            <div className="right-up">
                <p>Počet ľudí</p>
                <p>{event.expectedCountOfMembers}</p>
            </div>
            <p>{event.price}</p>
        </div>
    }

  return (
    <div className='all-event-dashboard'>
        <ModalCreateEvent/>
        {/* <div>{eventList}</div> */}


        {(allEvents.map(event =>
            <div className='event' key={event.id} onClick={() => redirectToEvent(event.id)}>
                {leftSide(event)}
                {rightSide(event)}
            </div>

        
        ))}
        
    
    </div>
  )
}

export default Events