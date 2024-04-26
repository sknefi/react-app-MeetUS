import React, { useState, useContext } from "react"

const AllInfoContext = React.createContext()
const UpdateUserAllInfoContext = React.createContext()
const PrintUserContext = React.createContext()

const MyColorContext = React.createContext()
const ChangeColorContext = React.createContext()

export function useAllInfoContext () {

    return useContext(AllInfoContext)
}

export function useUpdateUserAllInfoContext() {

    return useContext(UpdateUserAllInfoContext)
}

export function usePrintUserContext() {

    return useContext(PrintUserContext)
}

export function useMycolorContext() {

    return useContext(MyColorContext)
}
export function useChangeColorContext() {

    return useContext(ChangeColorContext)
}


export function AllInfoProvider( { children }) {
     const allInfo = {
    Roles: [
                {
                  id:   1,
                  name: 'admin',
                },
                {
                  id:   2,
                  name: 'user',
                },
                {
                  id:   3,
                  name: 'public',
                },
              ],
    Users: [
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
            ],
      LoggedUser: {
                  id: '2',
                  name: 'Jane',
                  surname: 'Doe',
                  email: 'jane@example.com',
                  password: 'password123',
                  streak: 10,
                  rating: 35,
                  ratedUsers: [1, 3],
                  igName: 'jane_doe',
                  photo: null,
              },
      Groups: [
                {
                    id: 1,
                    name: 'Crocodiles',
                    members: [1, 3, 4],
                    maxMembers: 5,
                    info: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi ea a, aliquam ratione quo voluptate.',
                    groupCreator: 1
                },
                {
                    id: 2,
                    name: 'Tigers',
                    members: [2, 4],
                    maxMembers: 6,
                    info: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi ea a, aliquam ratione quo voluptate.',
                    groupCreator: 2
                },
                {
                    id: 3,
                    name: 'Lions',
                    members: [1, 2, 3],
                    maxMembers: 4,
                    info: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi ea a, aliquam ratione quo voluptate.',
                    groupCreator: 3
                }
            ],
      Events: [
                {
                    id:                     1,
                    name:                   'Lucerna oldies',
                    listOfGroups:           [1, 2, 3],
                    date:                   new Date('2024-07-13').toLocaleDateString(),
                    time:                   new Date('2024-07-13').toLocaleTimeString(),
                    location:               "Praha 2",
                    price:                  '200 KČ',
                    info:                   'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reprehenderit ipsum aperiam sapiente voluptates dolores!',
                    expectedCountOfMembers: 300,
                    photo:                  null,

                },

                {
                    id:                     2,
                    name:                   'Epic techno',
                    listOfGroups:           [3, 4],
                    date:                   new Date('2024-12-23').toLocaleDateString(),
                    time:                   new Date('2024-12-23').toLocaleTimeString(),
                    location:               "Praha 1",
                    price:                  '250 KČ',
                    info:                   'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reprehenderit ipsum aperiam sapiente voluptates dolores!',
                    expectedCountOfMembers: 500,
                    photo:                  null,

                },

                {
                    id:                     3,
                    name:                   'Šumavský ples',
                    listOfGroups:           [1, 2, 3, 4],
                    date:                   new Date('2024-8-8').toLocaleDateString(),
                    time:                   new Date('2024-8-8').toLocaleTimeString(),
                    location:               "Šumava",
                    price:                  'FREE',
                    info:                   'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reprehenderit ipsum aperiam sapiente voluptates dolores!',
                    expectedCountOfMembers: 1000,
                    photo:                  null,
                },

            ]
      
  }

    function updateUser(newUser) {
        console.log(allInfo.LoggedUser);
        allInfo.LoggedUser.streak = -99
        console.log('ADDED NEW USER');
    }

    function printUser() {
        console.log(allInfo.LoggedUser);
    }

    const [myColor, setMyColor] = useState('red')

    function changeColor(x) {
        setMyColor(x)
    }

    return(
        <>
            <AllInfoContext.Provider value={allInfo}>
            <UpdateUserAllInfoContext.Provider value={updateUser}>
            <PrintUserContext.Provider value={printUser}>
            <MyColorContext.Provider value={myColor}>
            <ChangeColorContext.Provider value={(x) => setMyColor(x)}>
                {children}
            </ChangeColorContext.Provider>
            </MyColorContext.Provider>
            </PrintUserContext.Provider>
            </UpdateUserAllInfoContext.Provider>
            </AllInfoContext.Provider>
        </>
    )
}