const path = require('path')
const fs = require('fs')

function userExistance(userID) {
    const pathTousers = path.join(__dirname, '..', 'Dao', 'storage', 'users')
    const allusers = fs.readdirSync(pathTousers)

    return allusers.includes(`${userID}.json`)
}

module.exports = userExistance