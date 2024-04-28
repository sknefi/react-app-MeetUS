import React, { useState } from 'react'
import Modal from 'react-modal'
import './AddEvent.css'
import Calendar from './Calendar.js'
import Datetime from 'react-datetime'
import "react-datetime/css/react-datetime.css"
import SuccessfullyCreatedEvent from './SuccessfullyCreatedEvent'

const AddEvent = ({ onClose }) => { 
    const [inName, setInName] = useState("")
    const [inLocation, setInLocation] = useState("")
    const [inExpectedCountOfMembers, setInExpectedCountOfMembers] = useState("")
    const [inPrice, setInPrice] = useState("")
    const [inInfo, setInInfo] = useState("")
    const [eventDateTime, setEventDateTime] = useState(null)
    const [validDateTime, setValidDateTime] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)

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
    
            console.log(inName, inLocation, inExpectedCountOfMembers, inPrice, inInfo, eventDateTime, selectedFile)
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
            console.log('invalid datetime')
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const extension = file.name.split('.').pop().toLowerCase()
            if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
                setSelectedFile(file) 
            } else {
                setSelectedFile(null) 
                alert("Only JPG, JPEG, or PNG files are allowed.")
            }
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
                        <label htmlFor="photoUpload" className="label-add-event">Upload a photo (JPG, JPEG, PNG)</label>
                        <input
                            type="file"
                            id="photoUpload"
                            accept=".jpg, .jpeg, .png"
                            onChange={handleFileChange}
                            style={{ display: 'none' }} 
                        />
                        <button type="button" className="btn-upload-photo" onClick={() => document.getElementById('photoUpload').click()}>Upload Photo</button>
                        {selectedFile && <p>Selected File: {selectedFile.name}</p>}
                        <button type="submit" className='submit-btn-create-event'>Submit</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddEvent
