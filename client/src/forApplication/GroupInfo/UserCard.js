import React from 'react';
import './UserCard.css'
import Card from 'react-bootstrap/Card';
import ohnik from '../images/ohnik.png';
import top from '../images/top.png'

function UserCard(props) {
    const { streak, rating, photo} = props

    return (
        <Card style={{ width: '18rem' }} className='user-card'>
            <Card.Img variant="top" src={photo} className='user-photo'/>
            <Card.Body>
                <div className="user-card-body">

                    {/* Streak */}
                    <div className="me-3">
                        <img src={ohnik} alt="Streak Icon" style={{ width: '32px', height: '32px' }} />
                        <span className="ms-2">{streak}</span>
                    </div>
                    {/* Rating */}
                    <div>
                        <img src={top} alt="Rating Icon" style={{ width: '32px', height: '32px' }} />
                        <span className="ms-2">{rating}</span>
                    </div>
                </div>
                {/* Additional card content here */}
            </Card.Body>
        </Card>
    );
}

export default UserCard;
