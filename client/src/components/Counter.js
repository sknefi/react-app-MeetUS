import "./Counter.css"
import { FaThumbsUp } from "react-icons/fa"
import { FaThumbsDown } from "react-icons/fa"
import { FaQuestion } from "react-icons/fa"


const Counter = ({ lstAttend, lstNotAttend, allPlayers }) => {

    return(
        <div className="counter">
            <div className="info">
                <h2>{lstAttend.length}</h2>  
                <FaThumbsUp className="mi-thumb-up" />
                
            </div>

            <div className="info">
                <h2>{lstNotAttend.length}</h2>
                <FaThumbsDown className="mi-thumb-down"/>

            </div>

            <div className="info">
                <h2>{(allPlayers.length) - (lstAttend.length + lstNotAttend.length)}</h2>
                <FaQuestion className="mi-idk"/>

            </div>
            
        </div>
    )
}

export default Counter