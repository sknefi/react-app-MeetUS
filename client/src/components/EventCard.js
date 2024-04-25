import './EventCard.css'
import Counter from './Counter'

import { useContext } from 'react'; // umožní používanei userContextu
import { UserContext } from './../UserContext';


const EventCard = ({ nameOfSport, date, lstAttend, lstNotAttend, allPlayers }) => {
    const userList = useContext(UserContext);

    return(
        <div className='card'>
            <h1>{nameOfSport}</h1>
            <h2>{date}</h2>
            <Counter    lstAttend={lstAttend} 
                        lstNotAttend={lstNotAttend}
                        allPlayers={allPlayers}/>
        </div>
    )
}

export default EventCard