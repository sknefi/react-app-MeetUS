const express = require('express')
const app = express()
const cors = require("cors")
const port = 3001

app.get('/', (req, res) => {
    res.send('Hello WORLD!')
})


app.use(express.json()) // podpora pro application/json
app.use(express.urlencoded({ extended: true })) // podpora pro application/x-www-form-urlencoded

app.use(cors())



const userController = require('./Controllers/user.js')
const eventController = require('./Controllers/event.js')
const groupController = require('./Controllers/group.js')

app.use('/group', groupController)
app.use('/user', userController)
app.use('/event', eventController)

app.listen(port, () => { console.log(`Listening on port ${port}`) })

// pri dao-metódach nemusíme overovať či existuje user (napr. group-dao.js - adduserToGroup(), pretože
// iba user, ktorý je prihlasený môže využívať funkcie aplikácie)
// pridať exceptiony do Dao/ metód

// prerobiť v uuBusiness Modeli
//     - nebudem použivať 2 atributy pre event (event.date a event.time), ale použijem iba jeden(event.dateTime)

// pridať UPDATE user dao

/*

done
--NAVBAR--
    LOAD
get()       user    -> navbar info about logged user (user.photo, user.streak, user.rating) 



done
--DASHBOARD--
    LOAD
list()      event   -> lists of events in dashboard and load data from event.listOfGroups
getEventGroups()      event   -> {ABL} filter groups by event.listOfGroups (load group.memeber.len and group.maxMembers)



done
--CREATE EVENT (admin)--
    LOAD
create()    event   -> form, when submitted event will be created and added to Dao/storage/events/{event.id}.json



done
--EVENT WEBPAGE--
    LOAD
get()       event   -> load event.photo, event.info
getEventGroups()     event   -> {event.listOfGroups} show all groups that are stored in event.listOfGroups
getGroupUsers()      group    -> {group.members} filter all users that are in group.members



done
--CREATE GROUP--
    LOAD
NONE
    SUBMIT
create()    group   -> user creates group in event (user.id from user that created group is automaticly added to group.members)
                    -> group.members = [user1.id]
                    -> event.listOfGroups.push(group)
                    -> group.groupCreator = user.id
update()    user    -> increment user.streak

addGroupToEvent()    event      -> add ID of group to event.listOfGroups
                                -> event.listOfGroups.push(groupID)



done
--JOIN GROUP--
    LOAD
get()       group   -> we need to load data of group (group.listOfMembers, group.name)
getGroupUsers()      user    -> {ABL} based on group.listOfMemebers we need to get every user.photo, user.rating, user.streak, user.igName by user.id
update()    user    -> increment user.streak

    SUBMIT
adduserToGroup()    group   -> add user.id to group.members



done
--MY GROUPS--
    LOAD
get()       user    -> get user so we can access user.listGroupIDs and user.rating
getUserGroups()      group   -> {ABL} from this list we will filter group that are in user.listGroupIDs
    RATE OTHERS (DONT HAVE TO DO THIS)
update()    user    -> after user rated userX, user.ratedUsers.append(userX.id)
update()    userX   -> userX.rating += 1 (if he was rating positively, if negativly then we will decrement userX.rating)




done
--LOGIN--
    LOAD
NONE
    SUBMIT
isUserInDatabase()       user    -> only in front-end, there will be varriable const loggedUser = {...}



done
--REGISTRAION--
    LOAD
NONE
    SUBMIT
create()        user    -> user will be created with all attributes from form

*/

