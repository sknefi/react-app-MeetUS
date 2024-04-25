const path = require('path')
const fs = require('fs')

function groupExistance(groupID) {
    const pathTogroups = path.join(__dirname, '..', 'Dao', 'storage', 'groups')
    const allgroups = fs.readdirSync(pathTogroups)

    return allgroups.includes(`${groupID}.json`)
}

module.exports = groupExistance