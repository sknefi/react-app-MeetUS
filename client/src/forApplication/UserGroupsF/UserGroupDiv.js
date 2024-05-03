import React, { useContext, useEffect, useState } from "react"
import ReactCardSlider from "react-card-slider-component"

import "./UserGroupDiv.css"

import { GroupContext } from "../../Technician/Contexts/GroupContext"

import david from "../images/userPhotos/david.jpg"
import filip from "../images/userPhotos/filip.jpg"
import klausik from "../images/userPhotos/klausik.jpg"
import vlada from "../images/userPhotos/vlada.jpg"

const UserGroupDiv = (props) => {
  // group {...}
  const { group } = props
  const { handlerMapForGroup } = useContext(GroupContext)
  const [groupUsers, setGroupUsers] = useState([])

  useEffect(() => {
    handlerMapForGroup
      .getGroupUsers(group.members)
      .then((users) => {
        setGroupUsers(users)
      })
      .catch((error) => {
        console.error("Error fetching event data:", error)
      })
  }, [])

  console.log(groupUsers)

  // toto tu musí byť, lebo react slider očakáva nejakú funkciu po kliknutí na cartu
  const sliderClick = () => {}

  // getGroupUsers
  const groupUserss = [
    {
      id: "034b8f67ceb463dd032731ead323b5b9",
      name: "Emily",
      surname: "Williams",
      rola: "2",
      email: "emily@example.com",
      password: "emily789",
      streak: 5,
      rating: 9,
      igName: "emily_williams",
      photo: david,
    },
    {
      id: "3ba13bee38a82e4fb6904f178b24c746",
      name: "Alice",
      surname: "Smith",
      rola: "1",
      email: "alice@example.com",
      password: "alice123",
      streak: 123,
      rating: 64,
      igName: "alice_smith",
      photo: vlada,
    },
    {
      id: "33313bee38a82e4fb6904f178b24c746",
      name: "Bob",
      surname: "Lolek",
      rola: "1",
      email: "lolda@example.com",
      password: "12345123",
      streak: 30,
      rating: 12,
      igName: "loldae",
      photo: klausik,
    },
    {
      id: "fff13bee38a82e4fb6904f178b24c746",
      name: "Guci",
      surname: "Nabijek",
      rola: "1",
      email: "nabijacka@example.com",
      password: "asdwa",
      streak: 32,
      rating: 9,
      igName: "najbaw",
      photo: filip,
    },
    {
      id: "fff13bee38a82e4fb6904f178b24c746",
      name: "Guci",
      surname: "Nabijek",
      rola: "1",
      email: "nabijacka@example.com",
      password: "asdwa",
      streak: 32,
      rating: 9,
      igName: "najbaw",
      photo: filip,
    },
  ]

  const createSlides = groupUsers.map((user) => {
    return {
      image: user.photo,
      title: user.name,
      description: user.igName,
      clickEvent: sliderClick,
    }
  })

  return (
    <div className="group-slider">
      <p className="group-slider-name">{group.name}</p>

      <p className="group-slider-capacity">
        {" "}
        {group.members.length} / {group.maxMembers}
      </p>

      <ReactCardSlider slides={createSlides} />
    </div>
  )
}

export default UserGroupDiv
