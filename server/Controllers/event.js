const express = require('express');
const router = express.Router();
const path = require('path');

const multer = require('multer');
const eventExistance = require('../Helpers/eventExistance');

const eGetAbl = require('../Abl/event/eGetAbl');
const eListAbl = require('../Abl/event/eListAbl');
const eGetEventGroupsAbl = require('../Abl/event/eGetEventGroupsAbl');
const eCreateAbl = require('../Abl/event/eCreateAbl');
const eUploadPhotoAbl = require('../Abl/event/eUploadPhotoAbl.js');

const destinationForEventPhotos = path.resolve(__dirname, '../Public/EventPhotos/');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, destinationForEventPhotos);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

// problem - keď chcem uploadnuť fotku a event neexistuje (neplatne ID) tak fotka sa aj tak nahrá na server
// const fileFilter = async (req, file, cb) => {
//     const eventId = req.body.id;
//     console.log(eventId)

//     try {
//         const eventExists = await eventExistance(eventId);
//         if (eventExists) {
//             cb(null, true);
//         } else {
//             cb(new Error("Event doesn't exist, can't upload event photo"), false);
//         }
//     } catch (error) {
//         cb(new Error("Error checking event existence"), false);
//     }
// };

const upload = multer({ storage: storage});

/* /event */

router.post('/uploadPhoto', upload.single('photo'), (req, res) => {
    eUploadPhotoAbl(req, res);
});

router.post('/create', (req, res) => {
    eCreateAbl(req, res);
});

// DONE
router.get('/get', (req, res) => {
    eGetAbl(req, res);
});

// DONE
router.get('/list', (req, res) => {
    eListAbl(req, res);
});

// DONE
router.post('/getEventGroups', (req, res) => {
    eGetEventGroupsAbl(req, res);
});

module.exports = router;
