import React, { useContext, useEffect, useState } from "react"

import UserGroupDiv from "./UserGroupDiv"

import { LoggedUserContext } from "../../Technician/Contexts/LoggedUserContext"

const UserGroups = () => {
  // getUserGroups
  const { handlerMapForUserGroups } = useContext(LoggedUserContext)
  const [userGroups, setUserGroups] = useState([])

  useEffect(() => {
    handlerMapForUserGroups
      .getUserGroups()
      .then((uGroups) => {
        setUserGroups(uGroups)
      })
      .catch((error) => {
        console.error("Error fetching event data:", error)
      })
  }, [])

  //console.log(userGroups)

  // // následne potrebujeme zmapovať userGroupsAllInfo a pomocou userGroupsAllInfo.id a group-dao/getGroupUsers si
  // // vytiahnem userov z danej skupiny

  // const clenoviaSkupin = userevoSkupinyVKtorychJe.map( (skupina) => {
  //     return group-dao/getGroupUsers(skupina.members)
  // })

  return (
    <div>
      {userGroups && userGroups.map((group) => {
        return <UserGroupDiv group={group} key={group.id} />
      })}
    </div>
  )
}

export default UserGroups
