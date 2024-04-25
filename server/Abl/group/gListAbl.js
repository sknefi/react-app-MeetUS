const groupDao = require('../../Dao/group-dao')

async function gListAbl(req, res) {
    try {
        // http://localhost:3000/group/list

        const groupList = groupDao.list()

        res.json(groupList)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({
            code: 'internalServerError',
            message: 'An internal server error occurred',
    })
    }
}

module.exports = gListAbl;
