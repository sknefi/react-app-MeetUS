import UserCard from "../UserCardF/UserCard"
import david from "../images/userPhotos/david.jpg"
import filip from "../images/userPhotos/filip.jpg"
import klausik from "../images/userPhotos/klausik.jpg"
import vlada from "../images/userPhotos/vlada.jpg"

import './ShowGroup.css'

import { EventContext } from "../../Technician/Contexts/EventContext"
import { useContext, useEffect, useState } from "react"

function ShowGroup(props) {
  const { groupMembers } = props
  const { handlerMap } = useContext(EventContext)
  const [groupUsers, setGroupUsers] = useState([])

  useEffect(() => {
    const dataObject = {
      members: groupMembers
    }
    handlerMap
      .handleGetGroupUsers(dataObject)
      .then((groupData) => {
        setGroupUsers(groupData)
      })
      .catch((error) => {
        console.error("Error fetching event data:", error)
      })
  }, [])



  return (
    <div className="d-flex justify-content-around zes">
      {/* { 
        temp.map( (user) => {
            <UserCard photo={user.photo} streak={user.streak} rating={user.rating}/>
        })
    } */}

    {groupUsers && groupUsers.map( (user) => {
      return <UserCard photo={filip} streak={user.streak} rating={user.rating} igName={user.igName} key={user.id}/>
    })}

      
    </div>
  )
}

export default ShowGroup
