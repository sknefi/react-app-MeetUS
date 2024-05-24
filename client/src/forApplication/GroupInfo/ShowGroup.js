import UserCard from "../UserCardF/UserCard"
import david from "../images/userPhotos/david.jpg"
import filip from "../images/userPhotos/filip.jpg"
import klausik from "../images/userPhotos/klausik.jpg"
import vlada from "../images/userPhotos/vlada.jpg"

import './ShowGroup.css'

import { EventContext } from "../../Technician/Contexts/EventContext"
import { useContext, useEffect, useState } from "react"
import InfoAboutServer from "../../Technician/InfoAboutServer"

function ShowGroup(props) {
  const serverInfo = InfoAboutServer()
  const { groupMembers } = props

  return (
    <div className="d-flex justify-content-around zes">

    {groupMembers && groupMembers.map( (user) => {
      return <UserCard photo={user ? `${serverInfo.userPhotosPath}/${user.photo}` : ''} streak={user.streak} rating={user.rating} igName={user.igName} key={user.id}/>
    })}

      
    </div>
  )
}

export default ShowGroup
