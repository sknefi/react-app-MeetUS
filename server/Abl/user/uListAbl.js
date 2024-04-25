const userDao = require('../../Dao/user-dao')

async function uListAbl(req, res) {
    try {
        // http://localhost:3000/user/list
        const userList = userDao.list()

        res.json(userList)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({
            code: 'internalServerError',
            message: 'An internal server error occurred',
    })
    }
}

module.exports = uListAbl;
