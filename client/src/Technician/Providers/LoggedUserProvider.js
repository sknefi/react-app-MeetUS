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
    {
    name: 'admin',
    surname: 'admin',
    email: 'admin@admin.admin',
    password: 'a',
    igName: 'admin',
    id: '04f0ba2765c2fd8e89d604c0fb7f6bae',
    streak: 89,
    rating: 100,
    rola: 2,
    photo: ''
  }

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

  // {
  //   name: 'John',
  //   surname: 'Doe',
  //   email: 'johndoe@example.com',
  //   password: 'a',
  //   igName: 'johndoe_ig',
  //   photo: 'a',
  //   id: 'c13b6c6e17b749735950c09e41bd8449',
  //   streak: 0,
  //   rating: 0,
  //   rola: 1
  // }

  // {
  //   name: 'Natural',
  //   surname: 'Tren',
  //   email: 'aasdasdsd@gmail.com',
  //   password: 'asd',
  //   igName: 'naturalizmus',
  //   id: '6e26bab7d8c576a71cdf876d884ebe53',
  //   streak: 1,
  //   rating: 0,
  //   rola: 1
  // }
  
  // {}
  )

  const [userGroups, setUserGroups] = useState([])

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
      setLoadObject((current) => ({ ...current, state: 'pending' }))
      const response = await fetch(`${serverInfo.gateway}/user/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })
  
      if (response.status < 400) {
        const registeredUser = await response.json()
        setLoadObject((current) => ({ ...current, state: 'ready' }))

        return registeredUser
      } else {
        const responseBody = await response.json()
        if (response.status === 400 && responseBody.code === "emailAlreadyExists") {
          //console.log('chytil som chybu')

          throw new Error("Email already exists")
        } else {
          setLoadObject((current) => ({ ...current, state: 'error' }))
          throw new Error("Failed to register user")
        }
      }
    } catch (error) {
      setLoadObject((current) => ({ ...current, state: 'error' }))
      console.error("Error registering user:", error.message)
    }
  }


  async function handleInkrementUserStreak() {
    setLoadObject((current) => ({ ...current, state: "pending" }))
    
    console.log(`${serverInfo.gateway}/user/inkrementUserStreak`)
    const bodyToSend = {
      "id": loggedUser.id
    }
    const response = await fetch(`${serverInfo.gateway}/user/inkrementUserStreak`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyToSend),
    })


    const responseJson = await response.json()
    if (response.status < 400) {
      setLoadObject((current) => ({ ...current, state: "ready" }))
      setLoggedUser(responseJson)


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
  
  async function getUserGroups() {
    setLoadObject((current) => ({ ...current, state: "pending" }))
    
    console.log(`${serverInfo.gateway}/group/getUserGroups`)

    const bodyToSend = {
      "id": loggedUser.id
    }

    const response = await fetch(`${serverInfo.gateway}/group/getUserGroups`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyToSend),
    })


    const responseJson = await response.json()
    if (response.status < 400) {
      setLoadObject((current) => ({ ...current, state: "ready" }))
      setUserGroups(responseJson)

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
  
  async function handleFileUpload(file, newUserId) {
    setLoadObject((current) => ({ ...current, state: "pending" }));
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("id", newUserId);

    console.log(formData)
  
    try {
      const response = await fetch(`${serverInfo.gateway}/user/uploadPhoto`, {
        method: "POST",
        body: formData,
      });
  
      if (response.status < 400) {
        const responseData = await response.json();
        setLoadObject((current) => ({ ...current, state: "ready" }));
        return responseData;
      } else {
        setLoadObject((current) => ({ ...current, state: "error" }));
        throw new Error("Failed to upload photo");
      }
    } catch (error) {
      setLoadObject((current) => ({ ...current, state: "error" }));
      console.error("Error uploading file:", error.message);
    }
  }
  
  

  const value = {
    state: loadObject.state,
    loggedUser: loggedUser,
    //userGroups: userGroups,
    handlerMapForLogin: { logout, userIsLoggingIn, findUserInDatabase },
    handlerMapForRegistration: { userRegistration, handleFileUpload },
    handlerMapForUserUpdate: { handleInkrementUserStreak },
    handlerMapForUserGroups: { getUserGroups }
  }

  return (
    <LoggedUserContext.Provider value={value}>
      {children}
    </LoggedUserContext.Provider>
  )
}

export default LoggedUserProvider
