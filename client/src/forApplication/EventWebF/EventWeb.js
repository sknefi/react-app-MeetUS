import './EventWeb.css'
import party from '../images/party.jpeg'
import EventWebDiv from './EventWebDiv'
import { useContext } from 'react'
import { EventContext } from '../../Technician/Contexts/EventContext'

const EventWeb = () => {
    const { event }  = useContext(EventContext);
    console.log(event)

    if (!event) {
        return <div>Loading...</div>;
    }

    const { name, info, listOfGroups } = event;
    console.log(name)

    const Event = {
        id:                     2,
        name:                   'Epic techno',
        listOfGroups:           [3, 1, 2],
        date:                   new Date('2024-12-23').toLocaleDateString(),
        time:                   new Date('2024-12-23').toLocaleTimeString(),
        location:               "Praha 1",
        price:                  '250 KČ',
        info:                   'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam eum accusamus ipsa excepturi tempora veniam quod. Quia, mollitia illum iste vitae architecto, dolorum aperiam, asperiores quam quisquam iure vel pariatur voluptatem accusantium esse nisi magni nemo? Harum dolores possimus magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reprehenderit ipsum aperiam sapiente voluptates dolores!',
        expectedCountOfMembers: 500,
        photo:                  null,
    }

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
            id: 'cb9bb1a4ccc7291970cc329c2bbe3031',
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
    ]
        
    // const a = useParams()
    // console.log(a.id)

    // const location = useLocation();
    // console.log(location.pathname); // Current path
    // console.log(location.search); // Query parameters

  return (
    <div className='all-event-web'>

        <h2 className='event-name'>{event.name}</h2>
        <img className='event-image' src={party} alt={event.name} />
        <p className="event-info">{event.info}</p>

        { Event.listOfGroups.map( eGroupId => 
            Groups.map( group => {
                if (group.id === eGroupId) {
                    return <EventWebDiv 
                            key={group.id}
                            groupName={group.name}        
                            groupLenMembers={group.members.length}
                            groupMaxMembers={group.maxMembers}
                            groupMembers={group.members}/>
                }
            })
            )}
        
        
    </div>
  )
}


export default EventWeb