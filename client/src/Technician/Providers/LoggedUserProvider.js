import React, { useState } from "react"

import { LoggedUserContext } from "../Contexts/LoggedUserContext"
import filip from "../../forApplication/images/userPhotos/filip.jpg"
import InfoAboutServer from "../InfoAboutServer"

const LoggedUserProvider = ({ children }) => {
  const serverInfo = InfoAboutServer()

  const [loadObject, setLoadObject] = useState({
    state: ""
  })

  const [loggedUser, setLoggedUser] = useState({
  })

  const logout = () => {
    setLoggedUser( {} )
  }

  const userIsLoggingIn = (user) => {
    setLoggedUser(user)
  }

  async function findUserInDatabase(email, password) {
    // funtion returns either object of user {id: '...', name: '...', ...}
    // or if user is not in database it will return {} - empty object
    try {
      setLoadObject((current) => current.state = 'pending')
      const response = await fetch(`${serverInfo.gateway}/user/exists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })

      if (response.status < 400) {
        const user = await response.json()
        setLoadObject((current) => ({ ...current, state: 'ready' }))
        console.log(user)

        return user
      } else {
        setLoadObject((current) => ({ ...current, state: 'error' }))
        throw new Error("Invalid email or password")
      }
    } catch (error) {
      setLoadObject((current) => ({ ...current, state: 'error' }))
      console.error("Error logging in:", error.message)
    }
  }

  async function userRegistration(newUser) {
    try {
      setLoadObject((current) => ({ ...current, state: 'pending' }))
      //console.log(JSON.stringify(newUser))
      const response = await fetch(`${serverInfo.gateway}/user/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })
  
      const registeredUser = await response.json()
      if (response.status < 400) {
        setLoadObject((current) => ({ ...current, state: 'ready' }))

        return registeredUser

      } else {
        setLoadObject((current) => ({ ...current, state: 'error' }))
        throw new Error("Failed to register user")
      }
    } catch (error) {
      setLoadObject((current) => ({ ...current, state: 'error' }))
      console.error("Error registering user:", error.message)
    }
  }

  const value = {
    loggedUser: loggedUser,
    state: loadObject.state,
    handlerMapForLogin: { logout, userIsLoggingIn, findUserInDatabase },
    handlerMapForRegistration: { userRegistration }
  }

  return (
    <LoggedUserContext.Provider value={value}>
      {children}
    </LoggedUserContext.Provider>
  )
}

export default LoggedUserProvider
