import React from 'react'
import './EventWebDiv.css'

const EventWebDiv = (props) => {
    /* Users potrebujeme na user.photo
    dostaneme user.id, najdeme jeho object v poli Users
    a podla toho pridame user.photo
     */
    const Users = [
        {
            id: '1',
            name: 'Alfred',
            surname: 'Topkof',
            role: 1,
            email: 'at@gmail.com',
            password: 'asdw123',
            streak: 21,
            rating: 40,
            ratedUsers: [2, 3, 4],
            igName: 'a_topkof',
            photo: null,
        },
        {
            id: '2',
            name: 'Jane',
            surname: 'Doe',
            role: 2,
            email: 'jane@example.com',
            password: 'password123',
            streak: 15,
            rating: 35,
            ratedUsers: [1, 3],
            igName: 'jane_doe',
            photo: null,
        },
        {
            id: '3',
            name: 'John',
            surname: 'Smith',
            role: 2,
            email: 'john@example.com',
            password: 'password456',
            streak: 10,
            rating: 25,
            ratedUsers: [1],
            igName: 'john_smith',
            photo: null,
        },
        {
            id: '4',
            name: 'Alice',
            surname: 'Johnson',
            role: 2,
            email: 'alice@example.com',
            password: 'password789',
            streak: 5,
            rating: 20,
            ratedUsers: [],
            igName: 'alice_johnson',
            photo: null,
        }
      ]

  return (
    <div className='all-event-web-div'>
        <div className="left-event-name">
            {props.groupName}
        </div>
        <div className="mid-event-count-members">
            {props.groupLenMembers} / {props.groupMaxMembers}
        </div>

        <div className="right-event-members">
            {/*potrebujeme zmapovat array a pridat user.photo pre hodnotu (user.id) */}
            {props.groupMembers}
        </div>
    </div>
  )
}

export default EventWebDiv