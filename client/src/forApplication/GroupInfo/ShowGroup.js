import UserCard from './UserCard'
import david from '../images/userPhotos/david.jpg'
import filip from '../images/userPhotos/filip.jpg'
import klausik from '../images/userPhotos/klausik.jpg'
import vlada from '../images/userPhotos/vlada.jpg'



function ShowGroup( props ) {
    const { groupMembers } = props
    // group/getGroupUsers

    // console.log(groupMembers)

    const temp = [
        {
            "id": "034b8f67ceb463dd032731ead323b5b9",
            "name": "Emily",
            "surname": "Williams",
            "rola": "2",
            "email": "emily@example.com",
            "password": "emily789",
            "streak": 5,
            "rating": 9,
            "ratedUsers": [
                "1",
                "2",
                "3"
            ],
            "igName": "emily_williams",
            "photo": "emily.jpg"
        },
        {
            "id": "3ba13bee38a82e4fb6904f178b24c746",
            "name": "Alice",
            "surname": "Smith",
            "rola": "3",
            "email": "alice@example.com",
            "password": "alice123",
            "streak": 3,
            "rating": 6,
            "ratedUsers": [
                "1",
                "3",
                "4"
            ],
            "igName": "alice_smith",
            "photo": "alice.jpg"
        },
        {
            "name": "\"John\",",
            "surname": "\"Doe\",",
            "email": "\"johndoe@example.com\",",
            "password": "\"password123\",",
            "igName": "\"johndoe_ig\",",
            "photo": "\"https://example.com/johndoe.jpg\"",
            "id": "6dc5a59a0588ed624a7992a2c37f8bbb"
        },
        {
            "id": "6e12f8e646a0c46fb92dde7494d8cdff",
            "name": "Bob",
            "surname": "Johnson",
            "rola": "1",
            "email": "bob@example.com",
            "password": "bob456",
            "streak": 8,
            "rating": 7,
            "igName": "bob_johnson",
            "photo": "bob.jpg"
        }
    ]

  return (
    <div className="d-flex justify-content-around zes">

    {/* { 
        temp.map( (user) => {
            <UserCard photo={user.photo} streak={user.streak} rating={user.rating}/>
        })
    } */}


      <UserCard photo={david} streak={1} rating={5}/>
      <UserCard photo={filip} streak={69} rating={420}/>
      <UserCard photo={klausik} streak={100} rating={223}/>
      <UserCard photo={vlada} streak={123} rating={321}/>

    </div>
  )
}

export default ShowGroup