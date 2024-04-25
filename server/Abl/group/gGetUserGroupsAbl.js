const Ajv = require("ajv")
const ajv = new Ajv()
const groupDao = require('../../Dao/group-dao');

const schema = {
  type: "object",
  properties: {
    id: { type: "string" }
  },
  required: ["id"],
  additionalProperties: false
}

async function gGetUserGroups(req, res) {
  try {
    // http://localhost:3000/event/get?id=ae1ef4c26eb92dab14fd127781f52330
    const reqParams = req.query?.id ? req.query : req.body
    //console.log(req);

    const valid = ajv.validate(schema, reqParams)
    if (!valid) {
      res.status(400).json({
        code: 'dtoInIsNotValid',
        message: 'dto in is not valid',
        validationError: ajv.errors
      })
      
      return
    }

    // user musí byť prihlasený, takže existuje
    const allUserGroups = groupDao.getUserGroups(reqParams.id)
    //console.log(allUserGroups);

    res.json(allUserGroups)
  }
  catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      code: 'internalServerError',
      message: 'An internal server error occurred',
    })
  }
}

module.exports = gGetUserGroups
