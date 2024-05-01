import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

import { EventListContext } from '../../Technician/Contexts/EventListContext'

import './Events.css'
import ModalCreateEvent from "../AddEventWebF/ModalCreateEvent.js"


const Events = () => {
    const { allEvents, } = useContext(EventListContext)
    const [events, setEvents] = useState()
    const navigate = useNavigate()



    //console.log(allEventss)

    const redirectToEvent = (eventId) => {
        navigate(`/event/${eventId}`);
    }
    
    const Groups = [] // toto tam nebudem dávať, bez toho to vyzerá lepšie



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
        const date = new Date(isoStr)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
    
        return `${day}.${month} ${year}`
    }

    function convertIsoToTime(isoStr){
        const date = new Date(isoStr)
        const hours = date.getHours()
        const minutes = date.getMinutes()
    
        // Ensure minutes are formatted with leading zero if less than 10
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    
        return `${hours}:${formattedMinutes}`
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
            <p>{event.price} €</p>
        </div>
    }

  return (
    <div className='all-event-dashboard'>
        <ModalCreateEvent/>

        { (allEvents.map(event =>
            <div className='event' key={event.id} onClick={() => redirectToEvent(event.id)}>
                
                {leftSide(event)}
                {rightSide(event)}
            </div>

        
        )) }
        
    
    </div>
  )
}

export default Events