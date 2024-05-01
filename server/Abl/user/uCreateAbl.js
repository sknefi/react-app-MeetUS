const Ajv = require('ajv')
const userDao = require('../../Dao/user-dao')
const ajv = new Ajv()

const schema = {
    type: "object",
    properties: {
        name: {type: 'string'},
        surname: {type: 'string'},
        email: {type: 'string'},
        password: {type: 'string'},
        igName: {type: 'string'},
    },
    required: ["name", 'surname', 'email', 'password', 'igName'],
    additionalProperties: false
}

async function uCreateAbl(req, res) {
    try {
        // http://localhost:3000/user/create?name=%22Kek%22,&surname=%22DingDong%22,&email=%22kek%40gmail.com%22,&password=%22asdw123%22,&igName=%22kek81%22,&photo=%22.%2Fkeko.jpeg%22
        // console.log('beforequrery')
        let user = req.query?.name ? req.query : req.body
        // console.log(user)

        const valid = ajv.validate(schema, user)
        if (!valid) {
    //   console.log('not valid')

            res.status(400).json({
              code: "dtoInIsNotValid",
              message: "dto in is not valid",
              validationError: ajv.errors,
            })
            return
        }
        // console.log('validationSuccess')

        const userList = userDao.list()

        // user musí zadať unikátny email (žiadny iný user nemá taký)
        const emailExists = userList.some((u) => u.email === user.email)
        if (emailExists) {
            console.log('email already exists')
            res.status(400).json({
                code: "emailAlreadyExists",
                message: `User with email ${user.email} already exists`,
            })
            return 'emailAlreadyExists'
        }

        user = userDao.create(user);
        res.json(user)
    } 
    catch (error) {
        console.error('Error:', error)
        res.status(500).json({ message: error.message })
    }
}

module.exports = uCreateAbl
