const Ajv = require("ajv");
const userDao = require('../../Dao/user-dao');
const ajv = new Ajv();

const schema = {
    type: "object",
    properties: {
        id: { type: "string" }
    },
    required: ["id"],
    additionalProperties: false
};

const validate = ajv.compile(schema);

async function uUploadPhotoAbl(req, res) {
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
    
        const userId = req.body.id;
        await userDao.addPhotoNameToUser(userId, req.file.filename);
    
        res.status(200).send({
          message: "File uploaded successfully.",
          file: req.file,
          userId: userId,
        })
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error.message });
      }
}

module.exports = uUploadPhotoAbl;
