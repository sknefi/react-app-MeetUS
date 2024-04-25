import "./AddUser.css"
import { useState } from 'react'

const AddUser = () => {

    const [newName, setNewName] = useState('')

    return(
        <div className="form-add-user">
            <input type="text" />
            <button type="submit" 
                    className="btn1" 
                    onChange={() => setNewName()}      >ADD</button>
        </div>
    )
}

export default AddUser