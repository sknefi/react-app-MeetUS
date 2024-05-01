const path = require('path')
const fs = require('fs')
const crypto = require('crypto')
const eventDao = require('./event-dao.js');

const pathToGroups = path.join(__dirname, 'storage', 'groups')
//console.log(pathToGroups)

// HELPERS

// used in adduserToGroup(...)
function update(group) {
    try {
        const readGroupData = get(group.id)
    
        // group doesnt exist, we cant update anything
        if (!readGroupData) return null
    
        const mergedGroups = { ...readGroupData, ...group }
    
        const pathToGroup = path.join(pathToGroups, `${group.id}.json`)
        const mergedGroupsData = JSON.stringify(mergedGroups)
        fs.writeFileSync(pathToGroup, mergedGroupsData)
    
        return mergedGroups
    }
    catch (error) {
        throw { code: 'failedToUpdateGroup', message: error.message }
    }
}


function addGroupToEvent(eventID, groupID) {
    try {
        //console.log('first')
        const event = eventDao.get(eventID)
        //console.log(event)

        if (!event) {
            throw { code: 'eventNotFound', message: 'Event not found.' };
        }
        
        event.listOfGroups.push(groupID)
    
        eventDao.update(event)
    
        return event
    }
    catch (error) { 
        throw { code: "failedToAddGroupToEvent", message: error.message }
    }
}

// MAIN FUNCTIONS

// used - Event website
function get(groupID) {
    try {
        const pathToGroup = path.join(pathToGroups, `${groupID}.json`)
        const groupData = fs.readFileSync(pathToGroup, 'utf-8')
        const group = JSON.parse(groupData)

        return group
    }
    catch (error){
        if (error.code === 'ENOENT') {
            return null
        } 
        else {
            throw { code: 'failedToGetGroup', message: error.message}
        }
    }
    

}

// used - User creates group in modal
function create(group, eventID, userID) {
    try {
        const groupID = crypto.randomBytes(16).toString('hex')

        // vygeneruj ID skupiny
        group.id = groupID

        // nastav tvorcu skupiny = userID
        group.groupCreator = userID

        // pridaj usera, ktorý vytvoril skupinu do skupiny
        group.members = [userID]

        // vytvor názov file-u
        const pathToGroup = path.join(pathToGroups, `${group.id}.json`)

        // zapíš data do toho file-u v string JSONe
        const groupData = JSON.stringify(group)
        fs.writeFileSync(pathToGroup, groupData, 'utf-8')
    
        // pridaj skupinu do zoznamu skupín v danom evente
        addGroupToEvent(eventID, groupID)
    
        
        //console.log(group);
        return group
    }
    catch (error) {
        throw { code: 'failedToCreateGroup', message: error.message }
    }
    
}

// used
function list() {
    try {
        const allFiles = fs.readdirSync(pathToGroups)
        const allGroups = allFiles.map( (groupFile) => {
            const pathToGroup = path.join(pathToGroups, groupFile)
            const groupData = fs.readFileSync(pathToGroup, 'utf-8')
            const group = JSON.parse(groupData)
    
            return group
        })
    
        //console.log(allGroups);
        return allGroups
    }
    catch (error) {
        throw { code: 'failedToListGroups', message: error.message}
    }
}


// used - Join group modal
function getGroupUsers(listUsersIDs) {
    const userDao = require('./user-dao.js')

    // group.members
    // [id1, id2, id3, id4, ...]
    
    const allUsers = userDao.list()
    const filteredUsers = allUsers.filter(user => listUsersIDs.includes(user.id))
    

    //console.log(filteredUsers);
    return filteredUsers
}

// used - My groups website
function getUserGroups(userID) {
    // toto nie je algoritmicky vhodný spôsob výberu skupín, v ktorých je user,
    // ale pri práci s databázou sa požíva tento spôsob, preto ho implementujeme aj v tejto aplikácii

    // vráti všetky skupiny, v ktorých sa nachádza user

    const allGroups = list()
    let userGroups = []

    allGroups.forEach(group => {
      if (group.members && group.members.includes(userID)) {
        userGroups.push(group)
      }  
    })

    //console.log(userGroups);
    return userGroups
}

// used - Join group modal
function adduserToGroup(userID, groupID) {
    try {
        const group = get(groupID)

        // pridaj userID do zoznamu v danej skupine
        group.members.push(userID)

        update(group)
    
        return group
    }
    catch (error) {
        throw { code: 'failedToAddUserToGroup', message: error.message }
    }
}


// create({
//      name: "Jednorozci",
//      maxMembers: 5, 
//      info: "LOREM?asklndlksandjk nasjknd jknsaj k;dn;asn dasjkn ;djkans jkdnajk;s ndnqwio nqiodnasjknd jasnkld nqwin dlkajsnd nwqipn asnkln"
//     }, "a3cd3dbfab81719a8cdb9f783384ff86", "3ba13bee38a82e4fb6904f178b24c746")

// create({
//     name: "Delfiniky",
//     maxMembers: Infinity, 
//     info: "SUII! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at libero nisi. Cras mattis nec felis id efficitur.",
// }, 'ae1ef4c26eb92dab14fd127781f52330', '8b2b893648d34fcc16a46abaf5ed3639')

// adduserToGroup('8b2b893648d34fcc16a46abaf5ed3639', 'cb9bb1a4ccc7291970cc329c2bbe3031')

// update({
//     name: 'Pandas',
//     maxMembers: 4,
//     info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ea a, aliquam ratione quo voluptate.',
//     id: 'cb9bb1a4ccc7291970cc329c2bbe3031',
//     groupCreator: '3ba13bee38a82e4fb6904f178b24c746',
//     members: [
//       '6e12f8e646a0c46fb92dde7494d8cdff',
//       '034b8f67ceb463dd032731ead323b5b9'
//     ]
//   })

// getEventGroups(["cb9bb1a4ccc7291970cc329c2bbe3031","0b7e7cc7ecb42848f7cc809514cb541b"])
// getGroupUsers(['6e12f8e646a0c46fb92dde7494d8cdff', '3ba13bee38a82e4fb6904f178b24c746'])
// getUserGroups('6e12f8e646a0c46fb92dde7494d8cdff')

// create({
//     name: 'Pandas',
//     maxMembers: 6,
//     info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ea a, aliquam ratione quo voluptate.'
// }, 'a3cd3dbfab81719a8cdb9f783384ff86', '3ba13bee38a82e4fb6904f178b24c746')

// create({
//     name: 'Eagles',
//     maxMembers: 8,
//     info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ea a, aliquam ratione quo voluptate.',
// }, '2c79c9606af884b00098b18fa889308c', '3ba13bee38a82e4fb6904f178b24c746')

// create({
//     id: '4',
//     name: 'Elephants',
//     members: ['e3d18561892988c303913d13a3dd0a0b', '27c3f693d0e2b9b3466bd5b2feeb0d22'],
//     maxMembers: 8,
//     info: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi ea a, aliquam ratione quo voluptate.',
//     groupCreator: '4'
// }, 'a3cd3dbfab81719a8cdb9f783384ff86', '034b8f67ceb463dd032731ead323b5b9')


module.exports = {
    get,
    create,
    update,
    //remove,
    list,
    getGroupUsers,
    getUserGroups,
    adduserToGroup,
}

