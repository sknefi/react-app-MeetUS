import UserCard from "../UserCardF/UserCard"

import './ShowGroup.css'
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
