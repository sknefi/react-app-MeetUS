const eventDao = require('../../Dao/event-dao')

async function eListAbl(req, res) {
    try {
        // http://localhost:3000/event/list
        const eventList = eventDao.list()

        res.json(eventList)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({
            code: 'internalServerError',
            message: 'An internal server error occurred',
    })
    }
}

module.exports = eListAbl
