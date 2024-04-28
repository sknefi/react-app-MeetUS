import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Navbar.css'
import LogoutModal from '../RegistrationAndLogin/LogoutModal' 

import profilPhoto from '../images/profilPhoto.png'
import ohnik from '../images/ohnik.png'
import top from '../images/top.png'
import group from '../images/group.png'
import logo from '../images/logo.png'
import { FaUser } from "react-icons/fa"
import { FaFire } from "react-icons/fa"
import { FaUserGroup } from "react-icons/fa6"

import { LoggedUserContext } from '../../Technician/Contexts/LoggedUserContext'


const Navbar = () => {
    const { loggedUser, logout } = useContext(LoggedUserContext)
    const isUserLoggedIn = Object.keys(loggedUser).length > 0
    const [showLogoutModal, setShowLogoutModal] = useState(false)

    //console.log(loggedUser)
    //console.log(isUserLoggedIn)

    const navigate = useNavigate()

    const redirectToMain = () => {
        navigate('/')
    }

    const redirectToUserGroups = (userId) => {
        navigate(`/user-groups/${userId}`)
    }

    const redirectToLogin = () => {
        navigate('/login')
    }

    const redirectToRegistration = () => {
        navigate('/registration')
    }

    const handleLogout = () => {
        setShowLogoutModal(false)
        logout()
        redirectToMain()
    }

    const handleShow = () => {
        setShowLogoutModal(true)
    }

    const handleClose = () => {
        setShowLogoutModal(false)
    }


    return (
    <div className='navbar'>
        
        <img className='left-navbar' src={logo} alt="Logo" onClick={redirectToMain} />
        <div className="mid-navbar">
            <img src={isUserLoggedIn ? loggedUser.photo : profilPhoto} alt="" className={ isUserLoggedIn ? 'user-profile-photo': 'profilPhoto' }/>

            <div className='icon-and-text'>
                <FaFire className='ohnik-icon'/>
                <p className='ohnik-text'> {isUserLoggedIn ? loggedUser.streak : 'x'}</p>
            </div>
            <div className="icon-and-text">
                <img className='top-icon' src={top} alt="top" />
                <p className="top-text">{isUserLoggedIn ? loggedUser.rating : 'x'}</p>
            </div>
            <FaUserGroup className='group-icon' onClick={() => redirectToUserGroups(loggedUser.id)}/>
        </div>
        
        { isUserLoggedIn && 
                <h3 className='right-navbar' onClick={handleShow}>Log out</h3> // Modified
        }

        {! isUserLoggedIn && <div className='login-or-registration'>
            <h3 className='right-navbar login-btn' onClick={redirectToLogin}>Login</h3>
            <h3>/</h3>
            <h3 className='right-navbar registration-btn' onClick={redirectToRegistration}>Registration</h3>
 
        </div>
        
        }

        <LogoutModal show={showLogoutModal} handleClose={handleClose} handleLogout={handleLogout} />




    </div>
  )
}

export default Navbar