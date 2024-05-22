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

async function UploadPhotoAbl(req, res) {
    try {
        const valid = ajv.validate(schema, req.query?.id ? req.query : req.body);
        if (!valid) {
            return res.status(400).json({
                code: 'dtoInIsNotValid',
                message: 'dto in is not valid',
                validationError: ajv.errors
            });
        }

        // Upload photo logic
        // Example: Save photo to user's profile

        // Send response
        res.json({ message: 'Photo uploaded successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            code: 'internalServerError',
            message: 'An internal server error occurred'
        });
    }
}

module.exports = UploadPhotoAbl;
