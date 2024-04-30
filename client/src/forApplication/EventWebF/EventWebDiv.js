import React, { useState } from "react"
import "./EventWebDiv.css"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import ShowGroup from "../GroupInfo/ShowGroup"

const EventWebDiv = (props) => {
  const [modalOpen, setModalOpen] = useState(false)
  //console.log(props)

  const handleDivClick = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const handleJoinGroup = () => {
    setModalOpen(false)
  }

  return (
    <>
      <div className="clickable-event-web-div" onClick={handleDivClick}>
        <div className="all-event-web-div">
          <div className="left-event-name">{props.groupName}</div>
          <div className="mid-event-count-members">
            {props.groupLenMembers} / {props.groupMaxMembers}
          </div>
          <div className="right-event-members">
            {/*potrebujeme zmapovat array a pridat user.photo pre hodnotu (user.id) */}
            {props.groupMembers}
          </div>
        </div>
      </div>

      <Modal show={modalOpen} onHide={closeModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "3rem" }}>
            {props.groupName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShowGroup groupMembers={props.groupMembers} />
        </Modal.Body>
        <Modal.Footer>
          {props.groupMaxMembers > props.groupLenMembers && (
            <Button variant="primary" onClick={handleJoinGroup}>
              PRIDAŤ SA
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EventWebDiv
