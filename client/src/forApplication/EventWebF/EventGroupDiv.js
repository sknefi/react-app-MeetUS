import React, { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'

import "./EventGroupDiv.css"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import ShowGroup from "../GroupInfo/ShowGroup"

import { EventContext } from "../../Technician/Contexts/EventContext"
import { LoggedUserContext } from "../../Technician/Contexts/LoggedUserContext"

import vlada from "../images/userPhotos/vlada.jpg"

const EventGroupDiv = (props) => {
  const { groupp } = props
  const [group, setGroup] = useState(groupp)

  const { handlerMap } = useContext(EventContext)
  const { loggedUser, handlerMapForUserUpdate } = useContext(LoggedUserContext)


  const navigate = useNavigate()

  const [modalOpen, setModalOpen] = useState(false)
  //console.log(props)

  const handleDivClick = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const isUserLogged = () => {
    return Object.keys(loggedUser).length !== 0
  }

  const redirectToLogin = () => {
    navigate('/login')
  }

  const handleJoinGroup = () => {
    if (isUserLogged()) {
      handlerMap.handleAddUserToGroup(loggedUser.id, group.id)
      setGroup((current) => ({
        ...current,
        members: [...current.members, loggedUser.id],
      }))

      handlerMapForUserUpdate.handleInkrementUserStreak()
      setModalOpen(false)
    } else {
      setModalOpen(false)
      redirectToLogin()
    }
  }
  

  //console.log(group.id)
  return (
    <>
      <div className="clickable-event-web-div" onClick={handleDivClick}>
        <div className="all-event-web-div">
          <div className="left-event-name">{group.name}</div>
          <div className="mid-event-count-members">
            {group.members ? group.members.length : 1} / {group.maxMembers === 'Infinity' ? '∞' : group.maxMembers}
          </div>
          <div className="right-event-members">
            {/*potrebujeme zmapovat array a pridat user.photo pre hodnotu (user.id) */}
            {group.members &&
              group.members.map((user, index) => {
                return (
                  <img
                    src={vlada}
                    alt=""
                    className="user-photo-in-div"
                    key={index} // Use a unique identifier as the key
                  />
                )
              })}
          </div>
        </div>
      </div>

      <Modal show={modalOpen} onHide={closeModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "3rem" }}>{group.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/*  */}
          <ShowGroup groupMembers={group.members} />
        </Modal.Body>
        <Modal.Footer>
          {/* v skupine je ešte miesto (nie je plná) a prihlásený user sa nenachádza v skupine */}
          {/* tu sa deje mágia, ktorej nerozumie ani chatgpt. takto to funguje tak NEPREPISOVAŤ */}
          {group !== undefined &&
            Object.keys(group).length !== 0 &&
            group.maxMembers > (group.members ? group.members.length : 1) &&
            group.members &&
            !group.members.includes(loggedUser.id) && (
              <Button variant="primary" onClick={handleJoinGroup}>
                PRIDAŤ SA
              </Button>
            )}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EventGroupDiv
