/*
1. show all / show not full
2. userContext, useConext
3. userProvider 
zobral všetky data (userList z tohto .js filu) a dal ich do userProvideru
pridal navbar
do navbaru dal dropdown kde bral data z UserProvideru (tam sa zobrazili vsetci uzivatelia)
*/

import './EventList.css'
import EventCard from "./EventCard"

const EventList = () => {
    const userList = [
        {
            id: 1,
            name: 'Aragorn69'
        },
        {
            id: 2,
            name: 'Bilbo123'
        },
        {
            id: 3,
            name: 'LegoVlas'
        },
        {
            id: 'kokot',
            name: 'kokotniakovic'
        }
    ]

    const allEvents = [
        {
            id: 1,
            date: '2021-09-01',
            name: 'Volejbal',
            willAttend: ['aragorn', 'biblo'],
            willNotAttend: []
        },
        {
            id: 2,
            date: '2021-09-08',
            name: 'Futbal',
            willAttend: [],
            willNotAttend: []
        },
        {
            id: 3,
            date: '2021-09-15',
            name: 'Lezenie',
            willAttend: ['legolas'],
            willNotAttend: ['aragorn', 'biblo']
        },
        {
            id: 4,
            date: '2022-09-15',
            name: 'Volejbal',
            willAttend: [],
            willNotAttend: ['aragorn', 'biblo', 'legolas']
        }
    ]

    return (
        <div>
            <div className="all-events">
                {
                    allEvents.map((x) => {
                        return <EventCard   key={x.id}
                                            nameOfSport={x.name} 
                                            date={x.date} 
                                            lstAttend={x.willAttend}  
                                            lstNotAttend={x.willNotAttend}
                                            allPlayers={userList}/>;
                    })
                }
            </div>
            

        </div>
    )
}

export default EventList