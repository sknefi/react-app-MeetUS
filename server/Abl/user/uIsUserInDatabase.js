const Ajv = require("ajv")
const userDao = require('../../Dao/user-dao')
const ajv = new Ajv()

const schema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" }
  },
  required: ["email", "password"],
  additionalProperties: false
}

async function uIsUserInDatabase(req, res) {
    try {
      // http://localhost:3000/user/exists?email=emily%40example.com&password=emily789
      
      // FUNGUJE
      //const reqParams = req.body; // nefunguje (ani keď použijem POST)
      const reqParams = req.query?.email ? req.query : req.body // funguje ale iba keď použijem parameter

      // console.log(reqParams) // vždy mi to vypisuje undefined

      //FUNGUJE

      const valid = ajv.validate(schema, reqParams);
      if (!valid) {
        return res.status(400).json({
          code: 'dtoInIsNotValid',
          message: 'dto in is not valid',
          validationError: ajv.errors
        })
      }
  
      const loggedUser = userDao.isUserInDatabase(reqParams.email, reqParams.password);
  
      res.status(200).json(loggedUser)
    }
    catch (error) {
      console.error('Error:', error)
      res.status(500).json({
        code: 'internalServerError',
        message: 'An internal server error occurred',
      })
    }
  }
  

module.exports = uIsUserInDatabase;
