import { useEffect, useState } from "react"
import { GroupContext } from "../Contexts/GroupContext"
import InfoAboutServer from "../InfoAboutServer"

const GroupProvider = ({ children }) => {
  const serverInfo = InfoAboutServer()
  const gateway = serverInfo.gateway

  const [groupLoadObject, setGroupLoadObject] = useState({
    state: "ready",
    error: "null"
  })

  async function getGroup(groupId) {
    setGroupLoadObject((current) => ({ ...current, state: "pending" }))

    const bodyToSend = {
        "id": groupId
      }

    const response = await fetch(`${gateway}/group/get`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyToSend),
      })
    // console.log('fetched')
    const responseJson = await response.json()

    if (response.status < 400) {

        return responseJson
    } else {
      setGroupLoadObject((current) => ({
        state: "error",
        error: responseJson.error,
      }))
      throw new Error(JSON.stringify(responseJson, null, 2))
    }
  }

  async function getGroupUsers(eventMembers) {
    setGroupLoadObject((current) => ({ ...current, state: "pending" }))

    const bodySend = {
      "members": eventMembers
    }
    const response = await fetch(`${gateway}/group/getGroupUsers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodySend),
    })

    const responseJson = await response.json()

    if (response.status < 400) {
      setGroupLoadObject((current) => ({
        ...current,
        state: "ready",
      }))

      return responseJson
    } else {
      setGroupLoadObject((current) => ({
        ...current,
        state: "error",
        error: responseJson.error,
      }))
      throw new Error(JSON.stringify(responseJson, null, 2))
    }
  }


  const value = {
    state: groupLoadObject.state,
    handlerMapForGroup: { getGroup, getGroupUsers }
  }

  return (
    <GroupContext.Provider value={value}>
        {children}
    </GroupContext.Provider>
  )
}

export default GroupProvider
