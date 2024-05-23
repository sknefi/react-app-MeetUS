const path = require('path')
const fs = require('fs')
const crypto = require('crypto')

const pathToUsers = path.join(__dirname, 'storage', 'users')
// console.log(pathToUsers)

// HELPERS
function update(user) {
    try {
      const readUserData = get(user.id);
  
      if (!readUserData) return null;
  
      const updatedUser = { ...readUserData, ...user };
  
      const pathToUser = path.join(
        pathToUsers,
        `${user.id}.json`
      );
      const dataToFile = JSON.stringify(updatedUser);
      fs.writeFileSync(pathToUser, dataToFile, "utf-8");
  
      return updatedUser;
    } catch (error) {
      throw { code: "failedToUpdateUser", message: error.message };
    }
  }


// MAIN FUNCTIONS

// used - Navbar
function get(userID) {
    try {
        const pathToUser = path.join(pathToUsers, `${userID}.json`)
        const userData = JSON.parse(fs.readFileSync(pathToUser, 'utf-8'))

        return userData;
    } catch (error) {
        // user doesnt exist (there is no file {user.id}.json)
        if (error.code === 'ENOENT') return null;

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

    return findUser ? get(findUser.id) : {}
}

// used - Navbar
function inkrementUserStreak(userID) {
    try {
        const pathToUser = path.join(pathToUsers, `${userID}.json`)
        const user = get(userID)

        if (!user) { return null }

        user.streak += 1
        const userData = JSON.stringify(user)

        fs.writeFileSync(pathToUser, userData)
        return user
    }
    catch (error) {
        throw { code: "failedtoInkrementUserStreak", message: error.message };
    }
}

function addPhotoNameToUser(userId, fileName) {
    try {
      const user = get(userId)
      user.photo = fileName
    
      update(user)
      
      return user
    } catch (error) {
        throw { code: "failedToAddPhotoNameToUser", message: error.message };
    }
  }

module.exports = {
    get,
    create,
    list,
    isUserInDatabase,
    inkrementUserStreak,
    addPhotoNameToUser,
}