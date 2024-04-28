import { LoggedUserContext } from "../Contexts/LoggedUserContext"
import filip from '../../forApplication/images/userPhotos/filip.jpg'

import React, { useState } from 'react'

const LoggedUserProvider = ( { children } ) => {
    const [loggedUser, setLoggedUser] = useState({
        name: 'John',
        surname: 'Doe',
        email: 'johndoe@example.com',
        password: 'password123',
        igName: 'johndoe_ig',
        photo: filip,
        id: 'c13b6c6e17b749735950c09e41bd8449',
        streak: 10,
        rating: 19,
        rola: 1
    })

    const logout = () => {
        setLoggedUser({})
    }


  return (
    <LoggedUserContext.Provider value={{ loggedUser, logout }} >
        { children }
    </LoggedUserContext.Provider>
  )
}

export default LoggedUserProvider