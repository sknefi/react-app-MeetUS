const path = require('path')
const fs = require('fs')
const crypto = require('crypto')

const pathToUsers = path.join(__dirname, 'storage', 'users')
// console.log(pathToUsers)


// MAIN FUNCTIONS

// used - Navbar
function get(userID) {
    try {
        const pathToUser = path.join(pathToUsers, `${userID}.json`)
        const userData = JSON.parse(fs.readFileSync(pathToUser, 'utf-8'))
        
        return userData
    }
    catch (error) {
        // user doesnt exist (there is no file {user.id}.json)
        if (error.code === 'ENOENT') return null

        throw { code: "failedToGetUser", message: error.message };
    }

}

// used - Registration
function create(user) {
    try{
        const userID = crypto.randomBytes(16).toString('hex')
        user.id = userID
        user.streak = 0
        user.rating = 0
        user.rola = 1
    
        const userPath = path.join(pathToUsers, `${user.id}.json`)
        const userData = JSON.stringify(user)
        fs.writeFileSync(userPath, userData)

        return user
    }
    catch (error) {
        throw { code: 'failedToCreateUser', message: error.message }
    }
    
}

// used
function list() {
    try {
        const allFiles = fs.readdirSync(pathToUsers)
        const allUsers = allFiles.map( (fileName) => {
            const pathToUser = path.join(pathToUsers, fileName)
            const userData = fs.readFileSync(pathToUser, 'utf-8')
            const user = JSON.parse(userData)

            return user
        })

        //console.log(allUsers);
        return allUsers
    }
    catch (error) {
        throw { code: 'failedToListUsers', message: error.message };
    }
    
}

// used - Login
function isUserInDatabase(email, password) {
    const allUsers = list()
    
    const findUser = allUsers.find( (user) => {
            if (user.email.toLowerCase() === email.toLowerCase() && user.password === password) {
                return user
            }
        })

    return findUser
}


// create({
//     id: '2',
//     name: 'Alice',
//     surname: 'Smith',
//     rola: '3',
//     email: 'alice@example.com',
//     password: 'alice123',
//     streak: 3,
//     rating: 6,
//     ratedUsers: ['1', '3', '4'],
//     igName: 'alice_smith',
//     photo: 'alice.jpg'
// })

// create({
//     id: '3',
//     name: 'Bob',
//     surname: 'Johnson',
//     rola: '1',
//     email: 'bob@example.com',
//     password: 'bob456',
//     streak: 8,
//     rating: 7,
//     ratedUsers: ['1', '4'],
//     igName: 'bob_johnson',
//     photo: 'bob.jpg'
// })

// create({
//     id: '4',
//     name: 'Emily',
//     surname: 'Williams',
//     rola: '2',
//     email: 'emily@example.com',
//     password: 'emily789',
//     streak: 5,
//     rating: 9,
//     ratedUsers: ['1', '2', '3'],
//     igName: 'emily_williams',
//     photo: 'emily.jpg'
// })

// create({
//     id: '5',
//     name: 'David',
//     surname: 'Brown',
//     rola: '1',
//     email: 'david@example.com',
//     password: 'david123',
//     streak: 2,
//     rating: 5,
//     ratedUsers: ['1', '2'],
//     igName: 'david_brown',
//     photo: 'david.jpg'
// })


module.exports = {
    get,
    create,
    list,
    isUserInDatabase,
}