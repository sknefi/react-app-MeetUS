const path = require('path')
const fs = require('fs')

function eventExistance(eventID) {
    const pathToEvents = path.join(__dirname, '..', 'Dao', 'storage', 'events')
    const allEvents = fs.readdirSync(pathToEvents)

    return allEvents.includes(`${eventID}.json`)
}

module.exports = eventExistance