const Ajv = require("ajv")
const groupDao = require('../../Dao/group-dao')
const groupExistance = require('../../Helpers/groupExistance')
const ajv = new Ajv()

const schema = {
  type: "object",
  properties: {
    userID: {type: "string"},
    groupID: {type: "string"}

  },
  required: ["userID", "groupID"],
  additionalProperties: false
}

async function gAddUserToGroup(req, res) {
  try {
    // http://localhost:3000/group/addUserToGroup
    const reqParams = req.body

    const valid = ajv.validate(schema, reqParams)
    if (!valid) {
      res.status(400).json({
        code: 'dtoInIsNotValid',
        message: 'dto in is not valid',
        validationError: ajv.errors
      })
      
      return
    }

    const isGroup = groupExistance(reqParams.groupID)
    if (!isGroup) {
      res.status(400).json({
        code: 'groupIdDoesnt exist',
        message: 'dto in is not valid',
        validationError: ajv.errors
      })
      
      return
    }

    groupDao.adduserToGroup(reqParams.userID, reqParams.groupID)
  
    res.json(groupDao.get(reqParams.groupID))

  }
  catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      code: 'internalServerError',
      message: 'An internal server error occurred',
    })
  }
}

module.exports = gAddUserToGroup
