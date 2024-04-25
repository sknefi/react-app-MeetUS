const Ajv = require("ajv")
const eventDao = require('../../Dao/event-dao')
const ajv = new Ajv()

const schema = {
  type: "object",
  properties: {
      listOfGroups: {
          type: "array",
          items: {
              type: "string"
          }
      }
  },
  required: ["listOfGroups"],
  additionalProperties: false
}

async function gGetEventGroups(req, res) {
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

    const allGroups = eventDao.getEventGroups(reqParams.listOfGroups)
    
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

module.exports = gGetEventGroups
