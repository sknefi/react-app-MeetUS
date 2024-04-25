const Ajv = require("ajv")
const eventDao = require('../../Dao/event-dao')
const ajv = new Ajv()

const schema = {
  type: "object",
  properties: {
    id: {type: "string"}
  },
  required: ["id"],
  additionalProperties: false
}

async function eGetAbl(req, res) {
  try {
    // http://localhost:3000/event/get?id=ae1ef4c26eb92dab14fd127781f52330
    const reqParams = req.query?.id ? req.query : req.body

    const valid = ajv.validate(schema, reqParams)
    if (!valid) {
      res.status(400).json({
        code: 'dtoInIsNotValid',
        message: 'dto in is not valid',
        validationError: ajv.errors
      })
      
      return
    }
  
    const event = await eventDao.get(reqParams.id)
    if (!event) {
      res.status(404).json({
        code: 'eventNotFound',
        message: `event ${reqParams.id} not found`
      })

      return
    }
  
    res.json(event)
  }
  catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      code: 'internalServerError',
      message: 'An internal server error occurred',
    })
  }
}

module.exports = eGetAbl
