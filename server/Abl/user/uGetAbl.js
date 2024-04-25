const Ajv = require("ajv")
const userDao = require('../../Dao/user-dao')
const ajv = new Ajv()

const schema = {
  type: "object",
  properties: {
    id: {type: "string"}
  },
  required: ["id"],
  additionalProperties: false
}

async function uGetAbl(req, res) {
  try {
    // http://localhost:3000/user/get?id=8b2b893648d34fcc16a46abaf5ed3639
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
  
    const user = await userDao.get(reqParams.id)
    if (!user) {
      res.status(404).json({
        code: 'user NotFound',
        message: `user ${reqParams.id} not found`
      })

      return
    }
  
    res.json(user)
  }
  catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      code: 'internalServerError',
      message: 'An internal server error occurred',
    })
  }
}

module.exports = uGetAbl;
