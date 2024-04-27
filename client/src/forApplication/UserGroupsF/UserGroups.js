import React from 'react'    

import UserGroupDiv from './UserGroupDiv'



const UserGroups = () => {
    // getUserGroups

    const userevoSkupinyVKtorychJe = [
        {
            "id": "0b7e7cc7ecb42848f7cc809514cb541b",
            "name": "Elephants",
            "members": [
                "6e12f8e646a0c46fb92dde7494d8cdff",
                "3ba13bee38a82e4fb6904f178b24c746",
                "6dc5a59a0588ed624a7992a2c37f8bbb",
                "034b8f67ceb463dd032731ead323b5b9"
            ],
            "maxMembers": 8,
            "info": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi ea a, aliquam ratione quo voluptate.",
            "groupCreator": "034b8f67ceb463dd032731ead323b5b9"
        },
        {
            "name": "Tigers",
            "maxMembers": 9,
            "info": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at libero nisi. Cras mattis nec felis id efficitur.",
            "id": "0c30a6f1239e8c2bd8dd97957238caac",
            "groupCreator": "6e12f8e646a0c46fb92dde7494d8cdff",
            "members": [
                "6e12f8e646a0c46fb92dde7494d8cdff"
            ]
        },
        {
            "name": "Pandas",
            "maxMembers": 4,
            "info": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ea a, aliquam ratione quo voluptate.",
            "id": "cb9bb1a4ccc7291970cc329c2bbe3031",
            "groupCreator": "3ba13bee38a82e4fb6904f178b24c746",
            "members": [
                "6e12f8e646a0c46fb92dde7494d8cdff",
                "034b8f67ceb463dd032731ead323b5b9",
                "8b2b893648d34fcc16a46abaf5ed3639"
            ]
        }
    ]


    // // následne potrebujeme zmapovať userGroupsAllInfo a pomocou userGroupsAllInfo.id a group-dao/getGroupUsers si
    // // vytiahnem userov z danej skupiny

    // const clenoviaSkupin = userevoSkupinyVKtorychJe.map( (skupina) => {
    //     return group-dao/getGroupUsers(skupina.members)
    // })


  return (
    <div>
        
        {
            userevoSkupinyVKtorychJe.map( (skupina) => {
                return <UserGroupDiv group={skupina}  />
            })
        }

    </div>
  )
}

export default UserGroups