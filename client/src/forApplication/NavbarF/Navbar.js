import React, { useContext } from 'react'

import './Navbar.css'
import { useAllInfoContext } from '../../Technician/Contexts/AllContext'
import { useNavigate } from 'react-router-dom'
 
import profilPhoto from '../images/profilPhoto.png'
import ohnik from '../images/ohnik.png'
import top from '../images/top.png'
import group from '../images/group.png'
import logo from '../images/logo.png'
import { FaUser } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";



const Navbar = () => {
    // const data = useAllInfoContext()
    // const loggedInUser = data.LoggedUser
    
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

    const loggedInUser = {
        id: '034b8f67ceb463dd032731ead323b5b9',
        streak: 10,
        rating: 33
    }

    /* Nastaviť user.photo namiesto ikonky profilPhoto */
    /* pridať Log out funkcionalitu (presmerovanie na prihlasovací formulár) */
    /* pridať, že keď klikneme na logo tak nás to presmeruje na dashboard */
    return (
    <div className='navbar'>
        
        {/* {test2()} */}
        <img className='left-navbar' src={logo} alt="Logo" onClick={redirectToMain} />
        <div className="mid-navbar">
            <FaUser className='profilPhoto'/>

            <div className='icon-and-text'>
                <FaFire className='ohnik-icon'/>
                <p className='ohnik-text'> {loggedInUser.streak}</p>
            </div>
            <div className="icon-and-text">
                <img className='top-icon' src={top} alt="top" />
                <p className="top-text">{loggedInUser.rating}</p>
            </div>
            <FaUserGroup className='group-icon' onClick={() => redirectToUserGroups(loggedInUser.id)}/>
        </div>
        
        { loggedInUser && 
            <h3 className='right-navbar' onClick={redirectToLogin}>Log out</h3>
        }
        { loggedInUser && 
            <h3 className='right-navbar' onClick={redirectToLogin}>Login</h3>
        }

        <h3 className='right-navbar' onClick={redirectToRegistration}>Registration</h3>



    </div>
  )
}

export default Navbar