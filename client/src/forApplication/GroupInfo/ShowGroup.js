import UserCard from './UserCard'
import david from '../images/userPhotos/david.jpg'
import filip from '../images/userPhotos/filip.jpg'
import klausik from '../images/userPhotos/klausik.jpg'
import vlada from '../images/userPhotos/vlada.jpg'



function ShowGroup( ) {

  return (
    <div className="d-flex justify-content-around zes">
      <UserCard photo={david} streak={1} rating={5}/>
      <UserCard photo={filip} streak={69} rating={420}/>
      <UserCard photo={klausik} streak={100} rating={223}/>
      <UserCard photo={vlada} streak={123} rating={321}/>

    </div>
  )
}

export default ShowGroup