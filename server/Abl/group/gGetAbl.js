const Ajv = require("ajv")
const groupDao = require('../../Dao/group-dao')
const ajv = new Ajv()

const schema = {
  type: "object",
  properties: {
    id: {type: "string"}
  },
  required: ["id"],
  additionalProperties: false
}

async function gGetAbl(req, res) {
  try {
    // http://localhost:3000/group/list
    const reqParams = req.query?.id ? req.query : req.body
    //console.log(reqParams);

    const valid = ajv.validate(schema, reqParams)
    if (!valid) {
      res.status(400).json({
        code: 'dtoInIsNotValid',
        message: 'dto in is not valid',
        validationError: ajv.errors
      })
      
      return
    }
  
    const group = await groupDao.get(reqParams.id)
    if (!group) {
      res.status(404).json({
        code: 'group NotFound',
        message: `group ${reqParams.id} not found`
      })

      return
    }
  
    res.json(group)
  }
  catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      code: 'internalServerError',
      message: 'An internal server error occurred',
    })
  }
}

module.exports = gGetAbl;
