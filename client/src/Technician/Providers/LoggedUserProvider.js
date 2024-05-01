import React, { useState } from "react"

import { LoggedUserContext } from "../Contexts/LoggedUserContext"
import filip from "../../forApplication/images/userPhotos/filip.jpg"
import InfoAboutServer from "../InfoAboutServer"

const LoggedUserProvider = ({ children }) => {
  const serverInfo = InfoAboutServer()

  const [loadObject, setLoadObject] = useState({
    state: ""
  })

  const [loggedUser, setLoggedUser] = useState(
    // {
  //   name: 'admin',
  //   surname: 'admin',
  //   email: 'admin@admin.admin',
  //   password: 'a',
  //   igName: 'admin',
  //   id: '04f0ba2765c2fd8e89d604c0fb7f6bae',
  //   streak: 89,
  //   rating: 100,
  //   rola: 2
  // }

  // {
  //   id: '8b2b893648d34fcc16a46abaf5ed3639',
  //   name: 'David',
  //   surname: 'Brown',
  //   rola: '1',
  //   email: 'david@example.com',
  //   password: 'david123',
  //   streak: 2,
  //   rating: 5,
  //   igName: 'david_brown',
  //   photo: 'david.jpg'
  // }

  {
    name: 'John',
    surname: 'Doe',
    email: 'johndoe@example.com',
    password: 'a',
    igName: 'johndoe_ig',
    photo: 'a',
    id: 'c13b6c6e17b749735950c09e41bd8449',
    streak: 0,
    rating: 0,
    rola: 1
  }
  )

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
