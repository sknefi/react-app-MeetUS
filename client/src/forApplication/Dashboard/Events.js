import './Events.css'

const Event = () => {
    const allEvents = [
        {
            id:                     1,
            name:                   'Lucerna oldies',
            listOfGroups:           [1, 2, 3],
            dateTime:               new Date("2024-04-18T12:30:00Z"),
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
            dateTime:               new Date("2026-04-18T12:30:00Z"),
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
            dateTime:               new Date("2025-04-18T12:30:00Z"),
            location:               "Šumava",
            price:                  'FREE',
            info:                   'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reprehenderit ipsum aperiam sapiente voluptates dolores!',
            expectedCountOfMembers: 1000,
            photo:                  null,
        },

    ]
    
    const Groups = [
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
        },
        {
            id: 4,
            name: 'Elephants',
            members: [4, 5, 6],
            maxMembers: 6,
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac sagittis urna. Fusce euismod magna non dolor aliquet, nec hendrerit augue aliquet.',
            groupCreator: 5
        }
    ]


    function eventGroups(event) {
        return event.listOfGroups.map( eGroupId => 
            Groups.map( group => {
                if (group.id === eGroupId) {

                    return <div key={group.id} className='group-counts'>
                        {group.members.length} / {group.maxMembers}
                    </div>
                }
                
                return null
            }))
    }

    function convertIsoToDate(isoStr){
        const year = isoStr.getFullYear();
        const month = isoStr.getMonth() + 1; // Adjusting to get 1-based month
        const day = isoStr.getDate();

        return `${year} ${month} ${day}`
    }

    function convertIsoToTime(isoStr){
        const hours = isoStr.getHours();
        const minutes = isoStr.getMinutes();

        return `${hours} ${minutes}`
    }

    function leftSide(event) {
        return <div className="left-side">
            <div className="left-up">
                <h2 className='event-name'>{event.name}</h2>
                <div className='left-up-right'>
                    <p className='date-time'>{convertIsoToDate(event.dateTime)}</p>
                    <p className='date-time'>{convertIsoToTime(event.dateTime)}</p>
                </div>
            </div>

            <div className="left-down">

            {eventGroups(event)}

            </div>
        </div>
    }

    function rightSide(event) {
        return <div className="right-side">
            <div className="right-up">
                <p>Počet ľudí</p>
                <p>{event.expectedCountOfMembers}</p>
            </div>
            <p>{event.price}</p>
        </div>
    }

  return (
    <div className='all-event-dashboard'>
        {allEvents.map(event =>
            <div className='event' key={event.id}>
                {leftSide(event)}

                {rightSide(event)}
            </div>
        
            )}
        
    
    </div>
  )
}

export default Event