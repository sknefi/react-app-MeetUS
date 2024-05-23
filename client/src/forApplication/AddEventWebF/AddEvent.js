import React, { useState, useContext } from "react";
import "./AddEvent.css";
import Calendar from "./Calendar.js";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import { EventListContext } from "../../Technician/Contexts/EventListContext";
import { ColorPalletContext } from "../../Technician/Contexts/ColorPalletContext";

const AddEvent = ({ onClose }) => {
  const { colorPallet } = useContext(ColorPalletContext);
  const { handleCreateEvent, handleFileUpload } = useContext(EventListContext);

  const [inName, setInName] = useState("");
  const [inLocation, setInLocation] = useState("");
  const [inExpectedCountOfMembers, setInExpectedCountOfMembers] = useState("");
  const [inPrice, setInPrice] = useState("");
  const [inInfo, setInInfo] = useState("");
  const [eventDateTime, setEventDateTime] = useState(null);
  const [validDateTime, setValidDateTime] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({});

  const [newCreatedEvent, setNewCreatedEvent] = useState({})

  const [notEverythingIsFilled, setNotEverythingIsFilled] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(parseInt(inPrice)) || isNaN(parseInt(inExpectedCountOfMembers))) {
      setNotEverythingIsFilled("Skontrolujte správnosť údajov");
      return;
    }

    if (
      inName.trim() !== "" &&
      inLocation.trim() !== "" &&
      inExpectedCountOfMembers.trim() !== "" &&
      inPrice.trim() !== "" &&
      inInfo.trim() !== "" &&
      validDateTime
    ) {
      setSubmitted(true);

      // Convert price and expectedCountOfMembers to integers
      const price = parseInt(inPrice);
      const expectedCountOfMembers = parseInt(inExpectedCountOfMembers);
      const formDataObject = {
        name: inName,
        location: inLocation,
        expectedCountOfMembers: expectedCountOfMembers,
        price: price,
        info: inInfo,
        dateTime: eventDateTime,
        photo: selectedFile
      };

      //console.log(formDataObject)

      setFormData(formDataObject)
      const newEvent = await handleCreateEvent(formDataObject)
      handleFileUpload(formDataObject.photo, newEvent.id)
      onClose();
    } else {
      setNotEverythingIsFilled("Prosím vyplňte všetky požadované údaje");
    }
  };

  const handleDatetimeChange = (selectedDate) => {
    try {
      const isoDateString = selectedDate.toISOString();
      setEventDateTime(isoDateString);
      setValidDateTime(true);
    } catch (error) {
      setValidDateTime(false);
      console.log("invalid datetime");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const extension = file.name.split(".").pop().toLowerCase();
      if (extension === "jpg" || extension === "jpeg" || extension === "png") {
        setSelectedFile(file);
      } else {
        setSelectedFile(null);
        alert("Only JPG, JPEG, or PNG files are allowed.");
      }
    }
  };
  
  return (
    <>
      <form
        className="all-add-event"
        onSubmit={handleSubmit}
        style={{ backgroundColor: colorPallet.secondarycolor }}
      >
        <div className="left-add-event">
          <label
            className="label-add-event"
            style={{ color: colorPallet.fourthcolor }}
          >
            Názov eventu:
            <input
              className="input-add-event"
              type="text"
              value={inName}
              onChange={(e) => setInName(e.target.value)}
            />
          </label>

          <label
            className="label-add-event"
            style={{ color: colorPallet.fourthcolor }}
          >
            Lokácia:
            <input
              className="input-add-event"
              type="text"
              value={inLocation}
              onChange={(e) => setInLocation(e.target.value)}
            />
          </label>

          <label
            className="label-add-event"
            style={{ color: colorPallet.fourthcolor }}
          >
            Predpokládaný počet účastníkov:
            <input
              className="input-add-event half-input"
              type="text"
              value={inExpectedCountOfMembers}
              onChange={(e) => setInExpectedCountOfMembers(e.target.value)}
            />
          </label>

          <label
            className="label-add-event"
            style={{ color: colorPallet.fourthcolor }}
          >
            Cena vstupenky:
            <input
              className="input-add-event half-input"
              type="text"
              value={inPrice}
              onChange={(e) => setInPrice(e.target.value)}
            />
          </label>
        </div>
        <div className="right-add-event">
          <label
            className="label-add-event"
            style={{ color: colorPallet.fourthcolor }}
          >
            Informácie o evente:
            <textarea
              className="input-add-event custom-text-area"
              type="text"
              value={inInfo}
              onChange={(e) => setInInfo(e.target.value)}
            />
          </label>
          <div className="btn-and-date-time">
            <p
              className="label-add-event date-time-text"
              style={{ color: colorPallet.fourthcolor }}
            >
              Zadajte dátum a čas eventu
            </p>
            <Datetime onChange={handleDatetimeChange} />
            <label
              htmlFor="photoUpload"
              className="label-add-event smaller-text"
              style={{ color: colorPallet.fourthcolor }}
            >
              Nahrajte fotku (JPG, JPEG, PNG)
            </label>
            <input
              type="file"
              id="photoUpload"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <button
              type="button"
              className="btn-upload-photo"
              onClick={() => document.getElementById("photoUpload").click()}
            >
              Upload Photo
            </button>
            {selectedFile && <p style={{color: colorPallet.fourthcolor}}>Selected File: {selectedFile.name}</p>}
            {submitted && (
              <>
                {(inName.trim() === "" ||
                  inLocation.trim() === "" ||
                  inExpectedCountOfMembers.trim() === "" ||
                  inPrice.trim() === "" ||
                  inInfo.trim() === "" ||
                  !validDateTime) && (
                  <p className="error-message">
                    Vyplnte všetky požadované políčka
                  </p>
                )}
              </>
            )}
            <p style={{ color: "red", textAlign: "center" }}>
              {notEverythingIsFilled}
            </p>
            <button
              type="submit"
              className="submit-btn-create-event"
              style={{
                color: colorPallet.fourthcolor,
                backgroundColor: colorPallet.maincolor,
                border: `2px solid ${colorPallet.fourthcolor}`,
                borderRadius: "10px",
                fontSize: '1.5rem'
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddEvent;
