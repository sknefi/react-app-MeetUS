const Ajv = require("ajv");
const eventDao = require("../../Dao/event-dao");
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

async function eUploadPhotoAbl(req, res) {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded." });
    }

    const valid = validate(req.body);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dto in is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const eventId = req.body.id;

    // const event = eventDao.get(eventId)
    // if (!event) {
    //     return res.status(400).send({
    //         message: "event doesnt exists, cant upload photo",
    //     });
    // }

    await eventDao.addPhotoNameToEvent(eventId, req.file.filename);

    res.status(200).send({
      message: "File uploaded successfully.",
      file: req.file,
      eventId: eventId,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = eUploadPhotoAbl;
