import React, { useContext, useEffect, useState } from "react"
import ReactCardSlider from "react-card-slider-component"

import "./UserGroupDiv.css"
import ColorPallet from "../../ColorPallet"

import { GroupContext } from "../../Technician/Contexts/GroupContext"

import david from "../images/userPhotos/david.jpg"
import filip from "../images/userPhotos/filip.jpg"
import klausik from "../images/userPhotos/klausik.jpg"
import vlada from "../images/userPhotos/vlada.jpg"

const UserGroupDiv = (props) => {
  // group {...}

  console.log(ColorPallet)
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

  // console.log(groupUsers)

  // toto tu musí byť, lebo react slider očakáva nejakú funkciu po kliknutí na cartu
  const sliderClick = () => {}

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
      <div className="group-basic-info">
        <p className="group-slider-name" style={{backgroundColor: `${ColorPallet.maincolor}`}}>{group.name}</p>

        <p className="group-slider-capacity" style={{color: `${ColorPallet.maincolor}`}}>
          {group.members.length} / {group.maxMembers === 'Infinity' ? '∞' : group.maxMembers}
        </p>

      </div>

      <ReactCardSlider slides={createSlides} />
    </div>
  )
}

export default UserGroupDiv
