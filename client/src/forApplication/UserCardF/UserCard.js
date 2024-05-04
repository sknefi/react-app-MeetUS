import React from 'react';
import './UserCard.css'
import Card from 'react-bootstrap/Card';
import ohnik from '../images/ohnik.png';
import top from '../images/top.png'

import { FaFire } from "react-icons/fa";
import { RiStarSFill } from "react-icons/ri";

function UserCard(props) {
    const { streak, rating, photo, igName } = props

    return (
        <Card style={{ width: '18rem' }} className='user-card'>
            <Card.Img variant="top" src={photo} className='user-photo'/>
            <Card.Body>
                <div className="user-card-body">

                    <div className="me-3">
                        <FaFire className='user-icon'/>
                        <span className="ms-2">{streak}</span>
                    </div>
                    <div>
                        <RiStarSFill className='user-icon'/>
                        <span className="ms-2">{rating}</span>
                    </div>

                </div>
                <p className='user-ig-name'>@{ props.igName }</p>

            </Card.Body>
        </Card>
    );
}

export default UserCard;
