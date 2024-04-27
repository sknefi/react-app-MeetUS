const Ajv = require('ajv')
const groupDao = require('../../Dao/group-dao')
const ajv = new Ajv()
const eventExistance = require('./../../Helpers/eventExistance')
const userExistance  = require('./../../Helpers/userExistance')

const schema = {
    type: "object",
    properties: {
        eventID: {type: 'string'},
        userID: {type: 'string'},
        group: {
            type: 'object',
            properties: {
                name: {type: 'string' },
                maxMembers: { oneOf: [{ type: 'integer' }, { type: 'string', const: 'Infinity' }] },
                info: { type: 'string' }
            },
            required: ['name', 'maxMembers', 'info'],
            additionalProperties: false
        }
    },
    required: ['eventID', 'userID', 'group'],
    additionalProperties: false
}

async function eCreateAbl(req, res) {
    try {
        let reqParams = req.body
        //console.log(reqParams)

        const valid = ajv.validate(schema, reqParams)
        if (!valid) {
            res.status(400).json({
              code: "dtoInIsNotValid",
              message: "dto in is not valid",
              validationError: ajv.errors,
            });
            return;
        }

        const isUser = userExistance(reqParams.userID)
        if (!isUser) {
            res.status(400).json({
                code: "userDoesNotExist",
                message: "User does not exist",
            })
            return
        }

        const isEvent = eventExistance(reqParams.eventID)
        if (!isEvent) {
            res.status(400).json({
                code: "eventDoesNotExist",
                message: "Event does not exist",
            })
            return
        }

        const newGroup = groupDao.create(reqParams.group, reqParams.eventID, reqParams.userID)

        res.json(newGroup)
    } 
    catch (error) {
        console.error('Error:', error)
        res.status(500).json({ message: error.message })
    }
}

module.exports = eCreateAbl
