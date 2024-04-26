import React, { useContext } from 'react'

import './Navbar.css'
import { useMycolorContext, useChangeColorContext, useAllInfoContext, useUpdateUserAllInfoContext, usePrintUserContext,  } from '../../Technician/Contexts/AllContext'
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
    const data = useAllInfoContext()
    const loggedInUser = data.LoggedUser
    
    const navigate = useNavigate()

    const redirectToMain = () => {
        navigate('/')
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
            <FaUserGroup className='group-icon'/>
        </div>
        
        <h3 className='right-navbar'>Log out</h3>


    </div>
  )
}

export default Navbar