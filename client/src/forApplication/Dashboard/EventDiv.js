import { useNavigate } from "react-router-dom"
import { useContext } from "react";

import { ColorPalletContext } from '../../Technician/Contexts/ColorPalletContext';

import "./Events.css"
import './EventDiv.css'

const EventDiv = (props) => {
  const { colorPallet } = useContext(ColorPalletContext)
  const { event } = props

  const navigate = useNavigate()

  const redirectToEvent = (eventId) => {
    navigate(`/event/${eventId}`)
  }

  function convertIsoToDate(isoStr) {
    const date = new Date(isoStr)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return `${day}.${month} ${year}`
  }

  function convertIsoToTime(isoStr) {
    const date = new Date(isoStr)
    const hours = date.getHours()
    const minutes = date.getMinutes()

    // Ensure minutes are formatted with leading zero if less than 10
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

    return `${hours}:${formattedMinutes}`
  }

  function leftSide(event) {
    return (
      <div className="left-side" style={ {borderRight: `2px solid ${colorPallet.maincolor}`}} >
        <div className="left-up">
          <h2 className="event-name" style={ {color: `${colorPallet.fourthcolor}`}}>{event.name}</h2>
          <div className="left-up-right">
            <p className="date-time date" style={ {color: `${colorPallet.fourthcolor}`}}>{convertIsoToDate(event.dateTime)}</p>
            <p className="date-time" style={ {color: `${colorPallet.fourthcolor}`}}>{convertIsoToTime(event.dateTime)}</p>
          </div>
        </div>
      </div>
    )
  }

  function rightSide(event) {
    return (
      <div className="right-side">
        <div className="right-up">
          <p style={ {color: `${colorPallet.fourthcolor}`}} className="hide-when-small-resolution">Počet ľudí</p>
          <p style={ {color: `${colorPallet.fourthcolor}`}} className="count-of-people">{event.expectedCountOfMembers}</p>
        </div>
        <p style={ {color: `${colorPallet.fourthcolor}`}} className="event-price">{event.price} €</p>
      </div>
    )
  }

  function isDatetimePassed(datetimeString) {
    const givenDate = new Date(datetimeString)

    const currentDate = new Date();

    return givenDate < currentDate;
}

  const dateTimePassed = isDatetimePassed(event.dateTime)

  return (
    <div className="event-div">
      <div
        className="event"
        key={event.id}
        onClick={() => redirectToEvent(event.id)}
        style={ {border: `2px solid ${colorPallet.maincolor}`, backgroundColor: dateTimePassed ? colorPallet.thirdcolor : 'inherit'}}

      >
        {leftSide(event)}
        {rightSide(event)}
      </div>
    </div>
  )
}

export default EventDiv
