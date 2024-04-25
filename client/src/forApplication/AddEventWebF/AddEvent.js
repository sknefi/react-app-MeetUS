import React, { useState } from 'react';
import Modal from 'react-modal';
import './AddEvent.css'
import Calendar from './Calendar.js'
import Datetime from 'react-datetime'
import "react-datetime/css/react-datetime.css"
import SuccessfullyCreatedEvent from './SuccessfullyCreatedEvent';



const AddEvent = ({ onClose }) => { // Pass onClose function as a prop
    const [inName, setInName] = useState("")
    const [inLocation, setInLocation] = useState("")
    const [inExpectedCountOfMembers, setInExpectedCountOfMembers] = useState("")
    const [inPrice, setInPrice] = useState("")
    const [inInfo, setInInfo] = useState("")
    const [eventDateTime, setEventDateTime] = useState(null)
    const [validDateTime, setValidDateTime] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (
            inName.trim() !== "" &&
            inLocation.trim() !== "" &&
            inExpectedCountOfMembers.trim() !== "" &&
            inPrice.trim() !== "" &&
            inInfo.trim() !== "" &&
            validDateTime
        ) {
            setSubmitted(true)
    
            setInName(inName)
            setInLocation(inLocation)
            setInExpectedCountOfMembers(inExpectedCountOfMembers)
            setInPrice(inPrice)
            setInInfo(inInfo)
        
            console.log(inName, inLocation, inExpectedCountOfMembers, inPrice, inInfo, eventDateTime)
            onClose()
            
        }
    }

    const handleDatetimeChange = (selectedDate) => {
        try {
            const isoDateString = selectedDate.toISOString()
            setEventDateTime(isoDateString)
            setValidDateTime(true)
        }
        catch (error){
            setValidDateTime(false)
            console.log('invalid datetime');
        }
        

    }

    return (
        <>
                
        <form className='all-add-event' onSubmit={handleSubmit}>
            <div className="left-add-event">
                <label className="label-add-event">Názov eventu:
                    <input className='input-add-event' type="text" value={inName} onChange={(e) => setInName(e.target.value)} />
                </label>

                <label className="label-add-event">Lokácia:
                    <input className='input-add-event' type="text" value={inLocation} onChange={(e) => setInLocation(e.target.value)} />
                </label>

                <label className="label-add-event">Predpokládaný počet účastníkov:
                    <input className='input-add-event half-input' type="text" value={inExpectedCountOfMembers} onChange={(e) => setInExpectedCountOfMembers(e.target.value)} />
                </label>

                <label className="label-add-event">Cena vstupenky:
                    <input className='input-add-event half-input' type="text" value={inPrice} onChange={(e) => setInPrice(e.target.value)} />
                </label>

            </div>
            <div className="right-add-event">
                <label className="label-add-event">Informácie o evente:
                    <textarea className='input-add-event custom-text-area' type="text" value={inInfo} onChange={(e) => setInInfo(e.target.value)} />
                </label>

                <div className="btn-and-date-time">
                    <p className='label-add-event date-time-text'>Zadajte dátum a čas eventu</p>
                    <Datetime onChange={handleDatetimeChange}/>
                
                    <button type="submit" className='submit-btn-create-event'>Submit</button>
                 </div>  

                </div>
        </form>

        </>

    )
}

export default AddEvent

