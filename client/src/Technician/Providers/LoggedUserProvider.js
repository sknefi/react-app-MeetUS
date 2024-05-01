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
    id: '034b8f67ceb463dd032731ead323b5b9',
    name: 'Emily',
    surname: 'Williams',
    rola: '2',
    email: 'emily@example.com',
    password: '123',
    streak: 5,
    rating: 9,
    ratedUsers: [ '1', '2', '3' ],
    igName: 'emily_williams',
    photo: 'emily.jpg'
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
        //console.log(user)

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
      setLoadObject((current) => ({ ...current, state: 'pending' }));
      const response = await fetch(`${serverInfo.gateway}/user/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
  
      if (response.status < 400) {
        const registeredUser = await response.json();
        setLoadObject((current) => ({ ...current, state: 'ready' }));
        return registeredUser;
      } else {
        const responseBody = await response.json();
        if (response.status === 400 && responseBody.code === "emailAlreadyExists") {
          //console.log('chytil som chybu')
          throw new Error("Email already exists");
        } else {
          setLoadObject((current) => ({ ...current, state: 'error' }));
          throw new Error("Failed to register user");
        }
      }
    } catch (error) {
      setLoadObject((current) => ({ ...current, state: 'error' }));
      console.error("Error registering user:", error.message);
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
