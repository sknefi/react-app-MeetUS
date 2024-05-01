import { useEffect, useState } from "react"
import { useLocation, useSearchParams, useNavigate } from "react-router-dom"
import InfoAboutServer from "../InfoAboutServer"

import { EventContext } from "../Contexts/EventContext"

function EventProvider({ children }) {
  const serverInfo = InfoAboutServer()
  const gateway = serverInfo.gateway

  const [event, setEvent] = useState({})
  const [eventGroups, setEventGroups] = useState([])
  const [groupUsers, setGroupUsers] = useState([])

  const [loadObject, setLoadObject] = useState({
    state: "ready",
    error: null,
  })

  const location = useLocation()
  //console.log(location)

  //console.log(searchParams.get("id"))

  async function handleGetEvent() {
    setLoadObject((current) => ({ ...current, state: "pending" }))

    const eventId = location.pathname.split("/").pop()

    const response = await fetch(`${gateway}/event/get?id=${eventId}`, {
      method: "GET",
    })
    const responseJson = await response.json()
    if (response.status < 400) {
      setLoadObject((current) => ({ ...current, state: "ready" }))
      setEvent(responseJson)
      handleGetEventGroups({
        listOfGroups: responseJson.listOfGroups
      })
      //console.log(responseJson)

      return responseJson
    } else {
      setLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }))
      throw new Error(JSON.stringify(responseJson, null, 2))
    }
  }

  async function handleGetEventGroups(dtoIn) {
    setLoadObject((current) => ({ ...current, state: "pending" }))
    //console.log(dtoIn)

    const response = await fetch(`${gateway}/event/getEventGroups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    })

    const responseJson = await response.json()

    if (response.status < 400) {
      setLoadObject((current) => ({
        ...current,
        state: "ready",
        data: responseJson,
      }))

      setEventGroups(responseJson)

      return responseJson
    } else {
      setLoadObject((current) => ({
        ...current,
        state: "error",
        error: responseJson.error,
      }))
      throw new Error(JSON.stringify(responseJson, null, 2))
    }
  }

  async function handleGetGroupUsers(eventMembers) {
    setLoadObject((current) => ({ ...current, state: "pending" }))
    //console.log(dtoIn)

    const response = await fetch(`${gateway}/group/getGroupUsers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventMembers),
    })

    const responseJson = await response.json()

    if (response.status < 400) {
      setLoadObject((current) => ({
        ...current,
        state: "ready",
      }))

      setGroupUsers(responseJson)

      return responseJson
    } else {
      setLoadObject((current) => ({
        ...current,
        state: "error",
        error: responseJson.error,
      }))
      throw new Error(JSON.stringify(responseJson, null, 2))
    }
  }

  async function createGroup(group, eventId, userId) {
    try {
      setLoadObject((current) => ({ ...current, state: "pending" }))

      const groupDesc = {
        group: group,
        eventID: eventId,
        userID: userId
      }
      //console.log(JSON.stringify(groupDesc))

      const response = await fetch(`${serverInfo.gateway}/group/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(groupDesc),
      })

      if (response.status < 400) {
        const createdGroup = await response.json()
        setLoadObject((current) => ({
          state: "ready",
          error:  null
        }))

        setEventGroups((current) => [...current, group]) 

        return createdGroup
      } else {
        setLoadObject((current) => ({ ...current, state: "error" }))
      }
    } catch (error) {
      setLoadObject((current) => ({ ...current, state: "error" }))
      console.error("Error creating event:", error.message)
    }
  }

  async function handleAddUserToGroup(userId, groupId) {
    setLoadObject((current) => ({ ...current, state: "pending" }))
    const sendData = {
      'userID': userId,
      'groupID': groupId
    }

    const response = await fetch(`${gateway}/group/addUserToGroup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    })

    const responseJson = await response.json()

    if (response.status < 400) {
      setLoadObject((current) => ({
        ...current,
        state: "ready",
      }))

      //setEventGroups((current) => ({...current, responseJson}))

      return responseJson
    } else {
      setLoadObject((current) => ({
        ...current,
        state: "error",
        error: responseJson.error,
      }))
      throw new Error(JSON.stringify(responseJson, null, 2))
    }
  }
  

  const value = {
    event: event,
    eventGroups: eventGroups,
    state: loadObject.state,
    handlerMap: { handleGetEvent, handleGetEventGroups, createGroup, handleGetGroupUsers, handleAddUserToGroup },
  }

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  )
}

export default EventProvider
