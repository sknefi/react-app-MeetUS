const Ajv = require("ajv")
const groupDao = require('../../Dao/group-dao')
const ajv = new Ajv()

const schema = {
  type: "object",
  properties: {
      members: {
          type: "array",
          items: {
              type: "string"
          }
      }
  },
  required: ["members"],
  additionalProperties: false
}

async function gGetGroupUsers(req, res) {
  try {
    const reqParams = req.body
    //console.log(reqParams)
    
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      })

      return
    }

    const allGroups = groupDao.getGroupUsers(reqParams.members)
    
    res.status(200).json(allGroups)
  }
  catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      code: 'internalServerError',
      message: 'An internal server error occurred',
    })
  }
}

module.exports = gGetGroupUsers
