const Ajv = require('ajv')
const eventDao = require('../../Dao/event-dao')
const ajv = new Ajv()

const schema = {
    type: "object",
    properties: {
        name: { type: 'string' },
        location: { type: 'string' },
        expectedCountOfMembers: { type: 'number' },
        price: { type: 'number' },
        info: { type: 'string' },
        dateTime: { type: "string" },
        photo: { type: "string" }
    },
    required: ["name", "location", "expectedCountOfMembers", "price", "info", "dateTime"],
    additionalProperties: false
}

async function eCreateAbl(req, res) {
    try {
        // http://localhost:3000/event/create?name=Jazz%20Night&location=Blue%20Note%20Jazz%20Club,%20New%20York&expectedCountOfMembers=500&price=301&info=Experience%20an%20enchanting%20evening%20of%20jazz%20music%20at%20the%20iconic%20Blue%20Note%20Jazz%20Club.%20Join%20us%20for%20a%20night%20filled%20with%20soulful%20melodies%20and%20captivating%20performances!&photo=jazz-night.jpg&dateTime=2024-04-12T13%3A45%3A30.000Z
        let event = req.body

        // musíme premeniť hodnoty na integere
        event.expectedCountOfMembers = parseInt(event.expectedCountOfMembers)
        event.price = parseInt(event.price)
        event.photo = ''

        //console.log(event);

        const valid = ajv.validate(schema, event)
        if (!valid) {
            res.status(400).json({
              code: "dtoInIsNotValid",
              message: "dto in is not valid",
              validationError: ajv.errors,
            });
            return;
        }


        event = await eventDao.create(event)
        res.json(event)
    } 
    catch (error) {
        console.error('Error:', error)
        res.status(500).json({ message: error.message })
    }
}

module.exports = eCreateAbl
